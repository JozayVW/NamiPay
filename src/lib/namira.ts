// NAMRA (Namibia Revenue Agency) Compliance Calculations
// Based on Namibian tax legislation as of 2026

export interface TaxBracket {
  min: number
  max: number | null
  rate: number
  fixedAmount: number
}

export interface SSCConfig {
  employeeRate: number // 0.5% (0.005)
  employerRate: number // 0.5% (0.005)
  earningsCeiling: number // N$ 1,500 per month
}

export interface NHEConfig {
  employeeRate: number // 0.5% (0.005)
  employerRate: number // 0.5% (0.005)
  earningsCeiling: number // N$ 1,500 per month
}

// Current tax brackets for Namibia (2026)
export const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 50000, rate: 0, fixedAmount: 0 },
  { min: 50001, max: 100000, rate: 0.18, fixedAmount: 0 },
  { min: 100001, max: 300000, rate: 0.25, fixedAmount: 9000 },
  { min: 300001, max: 500000, rate: 0.28, fixedAmount: 59000 },
  { min: 500001, max: 800000, rate: 0.30, fixedAmount: 115000 },
  { min: 800001, max: 1500000, rate: 0.32, fixedAmount: 325000 },
  { min: 1500001, max: null, rate: 0.37, fixedAmount: 545000 }
]

// Social Security Commission configuration
export const SSC_CONFIG: SSCConfig = {
  employeeRate: 0.005, // 0.5%
  employerRate: 0.005, // 0.5%
  earningsCeiling: 1500 // N$ 1,500 per month
}

// National Housing Enterprise configuration
export const NHE_CONFIG: NHEConfig = {
  employeeRate: 0.005, // 0.5%
  employerRate: 0.005, // 0.5%
  earningsCeiling: 1500 // N$ 1,500 per month
}

// Tax rebates
export const TAX_REBATES = {
  primary: 14000, // N$ 14,000 per year
  additional: {
    age65: 5500, // N$ 5,500 for taxpayers 65 and older
    age75: 3000  // N$ 3,000 additional for taxpayers 75 and older
  }
}

export class NAMIRACalculator {
  /**
   * Calculate PAYE (Pay As You Earn) tax based on annual taxable income
   */
  static calculatePAYE(annualTaxableIncome: number, age: number = 30): number {
    let tax = 0

    // Find applicable tax bracket
    for (const bracket of TAX_BRACKETS) {
      if (annualTaxableIncome > bracket.min) {
        const taxableInBracket = bracket.max 
          ? Math.min(annualTaxableIncome - bracket.min, bracket.max - bracket.min)
          : annualTaxableIncome - bracket.min
        
        tax += taxableInBracket * bracket.rate + bracket.fixedAmount
      } else {
        break
      }
    }

    // Apply primary rebate
    tax -= TAX_REBATES.primary

    // Apply additional rebates based on age
    if (age >= 75) {
      tax -= TAX_REBATES.additional.age65 + TAX_REBATES.additional.age75
    } else if (age >= 65) {
      tax -= TAX_REBATES.additional.age65
    }

    // Tax cannot be negative
    return Math.max(0, tax)
  }

  /**
   * Calculate monthly PAYE from annual taxable income
   */
  static calculateMonthlyPAYE(annualTaxableIncome: number, age: number = 30): number {
    const annualTax = this.calculatePAYE(annualTaxableIncome, age)
    return Math.round(annualTax / 12)
  }

  /**
   * Calculate SSC contributions
   */
  static calculateSSC(monthlyEarnings: number): { employee: number; employer: number; total: number } {
    const taxableEarnings = Math.min(monthlyEarnings, SSC_CONFIG.earningsCeiling)
    
    const employee = taxableEarnings * SSC_CONFIG.employeeRate
    const employer = taxableEarnings * SSC_CONFIG.employerRate
    const total = employee + employer

    return {
      employee: Math.round(employee * 100) / 100,
      employer: Math.round(employer * 100) / 100,
      total: Math.round(total * 100) / 100
    }
  }

  /**
   * Calculate NHE contributions
   */
  static calculateNHE(monthlyEarnings: number): { employee: number; employer: number; total: number } {
    const taxableEarnings = Math.min(monthlyEarnings, NHE_CONFIG.earningsCeiling)
    
    const employee = taxableEarnings * NHE_CONFIG.employeeRate
    const employer = taxableEarnings * NHE_CONFIG.employerRate
    const total = employee + employer

    return {
      employee: Math.round(employee * 100) / 100,
      employer: Math.round(employer * 100) / 100,
      total: Math.round(total * 100) / 100
    }
  }

  /**
   * Check if PAYE deduction is required based on annual income
   */
  static isPAYERequired(annualIncome: number): boolean {
    return annualIncome > (TAX_BRACKETS[0].max || 0)
  }

  /**
   * Calculate total statutory deductions
   */
  static calculateStatutoryDeductions(
    monthlyEarnings: number, 
    annualTaxableIncome: number, 
    age: number = 30
  ): {
    paye: number
    sscEmployee: number
    sscEmployer: number
    nheEmployee: number
    nheEmployer: number
    totalEmployee: number
    totalEmployer: number
  } {
    const paye = this.calculateMonthlyPAYE(annualTaxableIncome, age)
    const ssc = this.calculateSSC(monthlyEarnings)
    const nhe = this.calculateNHE(monthlyEarnings)

    return {
      paye,
      sscEmployee: ssc.employee,
      sscEmployer: ssc.employer,
      nheEmployee: nhe.employee,
      nheEmployer: nhe.employer,
      totalEmployee: paye + ssc.employee + nhe.employee,
      totalEmployer: ssc.employer + nhe.employer
    }
  }

  /**
   * Generate ITA34 certificate data
   */
  static generateITA34Data(
    employee: {
      taxNo: string
      firstName: string
      lastName: string
      annualTaxableIncome: number
      annualPAYE: number
      age: number
    },
    taxYear: number
  ) {
    const annualTax = this.calculatePAYE(employee.annualTaxableIncome, employee.age)
    
    return {
      employee: {
        taxNo: employee.taxNo,
        firstName: employee.firstName,
        lastName: employee.lastName
      },
      taxYear,
      annualTaxableIncome: employee.annualTaxableIncome,
      annualPAYEDeducted: employee.annualPAYE,
      annualTaxLiability: annualTax,
      taxRefund: Math.max(0, employee.annualPAYE - annualTax),
      taxOwing: Math.max(0, annualTax - employee.annualPAYE)
    }
  }
}
