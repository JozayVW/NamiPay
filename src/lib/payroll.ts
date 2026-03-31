import { NAMIRACalculator } from './namira'
import { PayrollCalculationResult } from './types'

export interface PayrollInput {
  employeeId: string
  basicSalary: number
  overtimeHours?: number
  overtimeRate?: number // multiplier of basic hourly rate
  allowances?: Array<{
    code: string
    amount: number
    taxable: boolean
  }>
  deductions?: Array<{
    code: string
    amount: number
    preTax: boolean
  }>
  payeTaxable: boolean
  sscApplicable: boolean
  nheApplicable: boolean
  age: number
}

export interface PayrollResult extends PayrollCalculationResult {
  breakdown: {
    basicSalary: number
    overtimeEarnings: number
    allowanceEarnings: number
    grossEarnings: number
    taxableEarnings: number
    payeTax: number
    sscEmployee: number
    sscEmployer: number
    nheEmployee: number
    nheEmployer: number
    preTaxDeductions: number
    postTaxDeductions: number
    netPay: number
    employerCost: number
  }
}

export class PayrollCalculator {
  /**
   * Calculate complete payroll for an employee
   */
  static calculatePayroll(input: PayrollInput): PayrollResult {
    // Calculate basic components
    const basicSalary = input.basicSalary
    const overtimeEarnings = this.calculateOvertime(input.basicSalary, input.overtimeHours || 0, input.overtimeRate || 1.5)
    const allowanceEarnings = this.calculateAllowances(input.allowances || [])
    
    // Calculate gross earnings
    const grossEarnings = basicSalary + overtimeEarnings + allowanceEarnings
    
    // Calculate pre-tax deductions
    const preTaxDeductions = this.calculatePreTaxDeductions(input.deductions || [])
    
    // Calculate taxable earnings
    const taxableEarnings = input.payeTaxable ? grossEarnings - preTaxDeductions : 0
    
    // Calculate annual taxable income for PAYE
    const annualTaxableIncome = taxableEarnings * 12
    
    // Calculate statutory deductions
    const statutoryDeductions = NAMIRACalculator.calculateStatutoryDeductions(
      grossEarnings,
      annualTaxableIncome,
      input.age
    )
    
    // Apply SSC and NHE only if applicable
    const sscEmployee = input.sscApplicable ? statutoryDeductions.sscEmployee : 0
    const sscEmployer = input.sscApplicable ? statutoryDeductions.sscEmployer : 0
    const nheEmployee = input.nheApplicable ? statutoryDeductions.nheEmployee : 0
    const nheEmployer = input.nheApplicable ? statutoryDeductions.nheEmployer : 0
    
    // Calculate PAYE
    const payeTax = input.payeTaxable ? statutoryDeductions.paye : 0
    
    // Calculate post-tax deductions
    const postTaxDeductions = this.calculatePostTaxDeductions(input.deductions || [])
    
    // Calculate total deductions and net pay
    const totalDeductions = preTaxDeductions + payeTax + sscEmployee + nheEmployee + postTaxDeductions
    const netPay = grossEarnings - totalDeductions
    
    // Calculate employer cost
    const employerCost = grossEarnings + sscEmployer + nheEmployer

    return {
      grossPay: grossEarnings,
      payeTax,
      sscEmployee,
      sscEmployer,
      nheEmployee,
      nheEmployer,
      otherDeductions: preTaxDeductions + postTaxDeductions,
      netPay,
      breakdown: {
        basicSalary,
        overtimeEarnings,
        allowanceEarnings,
        grossEarnings,
        taxableEarnings,
        payeTax,
        sscEmployee,
        sscEmployer,
        nheEmployee,
        nheEmployer,
        preTaxDeductions,
        postTaxDeductions,
        netPay,
        employerCost
      }
    }
  }

  /**
   * Calculate overtime earnings
   */
  private static calculateOvertime(basicSalary: number, overtimeHours: number, overtimeRate: number): number {
    // Assume 160 working hours per month for calculation
    const hourlyRate = basicSalary / 160
    return Math.round(overtimeHours * hourlyRate * overtimeRate * 100) / 100
  }

  /**
   * Calculate total allowance earnings
   */
  private static calculateAllowances(allowances: Array<{ code: string; amount: number; taxable: boolean }>): number {
    return allowances.reduce((total, allowance) => total + allowance.amount, 0)
  }

  /**
   * Calculate pre-tax deductions
   */
  private static calculatePreTaxDeductions(deductions: Array<{ code: string; amount: number; preTax: boolean }>): number {
    return deductions
      .filter(deduction => deduction.preTax)
      .reduce((total, deduction) => total + deduction.amount, 0)
  }

  /**
   * Calculate post-tax deductions
   */
  private static calculatePostTaxDeductions(deductions: Array<{ code: string; amount: number; preTax: boolean }>): number {
    return deductions
      .filter(deduction => !deduction.preTax)
      .reduce((total, deduction) => total + deduction.amount, 0)
  }

  /**
   * Calculate pro-rata salary for partial period
   */
  static calculateProRata(
    basicSalary: number, 
    startDate: Date, 
    endDate: Date, 
    periodStartDate: Date, 
    periodEndDate: Date
  ): number {
    const periodDays = Math.ceil((periodEndDate.getTime() - periodStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const workedDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    
    const dailyRate = basicSalary / periodDays
    return Math.round(dailyRate * workedDays * 100) / 100
  }

  /**
   * Calculate leave payout
   */
  static calculateLeavePayout(
    basicSalary: number, 
    leaveDays: number, 
    dailyRate?: number
  ): number {
    const rate = dailyRate || basicSalary / 22 // Assume 22 working days per month
    return Math.round(rate * leaveDays * 100) / 100
  }

  /**
   * Calculate notice pay (typically 1 week per year of service, minimum 1 week)
   */
  static calculateNoticePay(
    basicSalary: number, 
    yearsOfService: number, 
    noticeWeeks?: number
  ): number {
    const weeks = noticeWeeks || Math.max(1, Math.ceil(yearsOfService))
    const weeklyRate = basicSalary / 4.33 // Average weeks per month
    return Math.round(weeklyRate * weeks * 100) / 100
  }

  /**
   * Generate payroll variance explanation
   */
  static explainVariance(
    currentPayroll: PayrollResult, 
    previousPayroll: PayrollResult
  ): string {
    const netPayVariance = currentPayroll.netPay - previousPayroll.netPay
    const grossPayVariance = currentPayroll.grossPay - previousPayroll.grossPay
    const taxVariance = currentPayroll.payeTax - previousPayroll.payeTax

    let explanation = `Net pay variance: N$${netPayVariance.toFixed(2)}\n`
    
    if (grossPayVariance !== 0) {
      explanation += `- Gross pay changed by N$${grossPayVariance.toFixed(2)}\n`
    }
    
    if (taxVariance !== 0) {
      explanation += `- PAYE tax changed by N$${taxVariance.toFixed(2)}\n`
    }

    if (currentPayroll.breakdown.overtimeEarnings !== previousPayroll.breakdown.overtimeEarnings) {
      const overtimeVariance = currentPayroll.breakdown.overtimeEarnings - previousPayroll.breakdown.overtimeEarnings
      explanation += `- Overtime earnings changed by N$${overtimeVariance.toFixed(2)}\n`
    }

    return explanation
  }
}
