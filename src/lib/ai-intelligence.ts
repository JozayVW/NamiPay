import { PayrollResult } from './payroll'
import { NAMIRACalculator } from './namira'

export interface AnomalyDetection {
  type: 'overtime' | 'paye_variance' | 'leave_pattern' | 'deduction_spike'
  severity: 'low' | 'medium' | 'high'
  employeeId: string
  employeeName: string
  description: string
  recommendation: string
  confidence: number // 0-100
}

export interface PayrollForecast {
  period: string
  projectedGrossPay: number
  projectedNetPay: number
  confidenceInterval: {
    min: number
    max: number
  }
  factors: {
    headcountChange: number
    inflationRate: number
    overtimeTrend: number
  }
}

export interface LeavePrediction {
  employeeId: string
  employeeName: string
  leaveType: string
  projectedUsage: number
  riskLevel: 'low' | 'medium' | 'high'
  recommendations: string[]
}

export class AIIntelligenceService {
  /**
   * Detect payroll anomalies
   */
  static detectAnomalies(
    currentPayroll: Array<{employeeId: string} & PayrollResult>, 
    historicalPayroll: Array<{employeeId: string} & PayrollResult>
  ): AnomalyDetection[] {
    const anomalies: AnomalyDetection[] = []

    for (const current of currentPayroll) {
      const historical = historicalPayroll.find(h => h.employeeId === current.employeeId)
      
      if (!historical) continue

      // Overtime anomaly detection
      const overtimeVariance = current.breakdown.overtimeEarnings - historical.breakdown.overtimeEarnings
      const overtimeIncrease = overtimeVariance / historical.breakdown.overtimeEarnings

      if (overtimeIncrease > 0.5) { // 50% increase
        anomalies.push({
          type: 'overtime',
          severity: overtimeIncrease > 1.0 ? 'high' : 'medium',
          employeeId: current.employeeId,
          employeeName: 'Employee ' + current.employeeId, // Would get from DB
          description: `Overtime increased by ${(overtimeIncrease * 100).toFixed(0)}% from N$${historical.breakdown.overtimeEarnings.toFixed(2)} to N$${current.breakdown.overtimeEarnings.toFixed(2)}`,
          recommendation: 'Review staffing levels and workload distribution. Consider hiring additional staff or redistributing tasks.',
          confidence: Math.min(95, 60 + (overtimeIncrease * 30))
        })
      }

      // PAYE variance detection
      const taxVariance = current.payeTax - historical.payeTax
      const taxIncrease = Math.abs(taxVariance) / historical.payeTax

      if (taxIncrease > 0.2) { // 20% variance
        anomalies.push({
          type: 'paye_variance',
          severity: taxIncrease > 0.5 ? 'high' : 'medium',
          employeeId: current.employeeId,
          employeeName: 'Employee ' + current.employeeId,
          description: `PAYE tax changed by N$${Math.abs(taxVariance).toFixed(2)} (${(taxIncrease * 100).toFixed(0)}%)`,
          recommendation: 'Verify tax configuration and employee tax details. Check for changes in tax brackets or employee exemptions.',
          confidence: Math.min(90, 70 + (taxIncrease * 20))
        })
      }
    }

    return anomalies.sort((a, b) => b.confidence - a.confidence)
  }

  /**
   * Forecast payroll costs for next period
   */
  static forecastPayroll(
    historicalData: PayrollResult[],
    headcountForecast: number,
    inflationRate: number = 0.06
  ): PayrollForecast {
    const latestPeriod = historicalData[historicalData.length - 1]
    const previousPeriod = historicalData[historicalData.length - 2] || latestPeriod

    // Calculate trends
    const grossPayGrowth = (latestPeriod.grossPay - previousPeriod.grossPay) / previousPeriod.grossPay
    const overtimeTrend = latestPeriod.breakdown.overtimeEarnings / latestPeriod.grossPay

    // Project based on trends and external factors
    const headcountChange = (headcountForecast - historicalData.length) / historicalData.length
    const projectedGrowth = grossPayGrowth + inflationRate + headcountChange

    const projectedGrossPay = latestPeriod.grossPay * (1 + projectedGrowth)
    const projectedNetPay = projectedGrossPay * 0.73 // Average net-to-gross ratio

    // Calculate confidence intervals
    const variance = this.calculateVariance(historicalData.map(p => p.grossPay))
    const standardError = Math.sqrt(variance / historicalData.length)
    const marginOfError = 1.96 * standardError // 95% confidence

    return {
      period: 'April 2026', // Next period
      projectedGrossPay: Math.round(projectedGrossPay),
      projectedNetPay: Math.round(projectedNetPay),
      confidenceInterval: {
        min: Math.round(projectedGrossPay - marginOfError),
        max: Math.round(projectedGrossPay + marginOfError)
      },
      factors: {
        headcountChange: Math.round(headcountChange * 100),
        inflationRate: Math.round(inflationRate * 100),
        overtimeTrend: Math.round(overtimeTrend * 100)
      }
    }
  }

  /**
   * Predict leave usage and identify risks
   */
  static predictLeaveRisks(employees: Array<{
    id: string
    name: string
    leaveBalances: { annual: number; sick: number; family: number }
    leaveHistory: Array<{ type: string; date: string; days: number }>
  }>): LeavePrediction[] {
    const predictions: LeavePrediction[] = []

    for (const employee of employees) {
      // Analyze leave patterns
      const annualLeavePattern = this.analyzeLeavePattern(employee.leaveHistory, 'annual')
      const currentBalance = employee.leaveBalances.annual
      const monthsRemaining = 12 - new Date().getMonth()

      // Project usage based on historical patterns
      const projectedUsage = annualLeavePattern * monthsRemaining
      const projectedBalance = currentBalance - projectedUsage

      // Risk assessment
      let riskLevel: 'low' | 'medium' | 'high' = 'low'
      const recommendations: string[] = []

      if (projectedBalance < 0) {
        riskLevel = 'high'
        recommendations.push('Employee will exceed annual leave allocation')
        recommendations.push('Schedule meeting to discuss leave planning')
      } else if (projectedBalance < 2) {
        riskLevel = 'medium'
        recommendations.push('Monitor leave balance closely')
        recommendations.push('Encourage leave scheduling to avoid year-end rush')
      }

      // Check for patterns
      if (annualLeavePattern > 2) { // More than 2 days per month
        recommendations.push('High leave usage pattern - consider workload review')
      }

      predictions.push({
        employeeId: employee.id,
        employeeName: employee.name,
        leaveType: 'Annual Leave',
        projectedUsage: Math.round(projectedUsage),
        riskLevel,
        recommendations
      })
    }

    return predictions.sort((a, b) => {
      const riskOrder = { high: 3, medium: 2, low: 1 }
      return riskOrder[b.riskLevel] - riskOrder[a.riskLevel]
    })
  }

  /**
   * Generate natural language explanation for payroll variance
   */
  static explainPayrollVariance(
    currentPayroll: PayrollResult,
    previousPayroll: PayrollResult
  ): string {
    const netPayVariance = currentPayroll.netPay - previousPayroll.netPay
    const grossPayVariance = currentPayroll.grossPay - previousPayroll.grossPay
    const taxVariance = currentPayroll.payeTax - previousPayroll.payeTax

    let explanation = `Your net pay changed by N$${Math.abs(netPayVariance).toFixed(2)} this month.\n\n`

    if (grossPayVariance !== 0) {
      explanation += `💰 **Gross Pay:** ${grossPayVariance > 0 ? 'Increased' : 'Decreased'} by N$${Math.abs(grossPayVariance).toFixed(2)}\n`
      
      if (currentPayroll.breakdown.overtimeEarnings !== previousPayroll.breakdown.overtimeEarnings) {
        const overtimeDiff = currentPayroll.breakdown.overtimeEarnings - previousPayroll.breakdown.overtimeEarnings
        explanation += `  • Overtime: ${overtimeDiff > 0 ? '+' : ''}N$${overtimeDiff.toFixed(2)}\n`
      }
    }

    if (taxVariance !== 0) {
      explanation += `📊 **PAYE Tax:** ${taxVariance > 0 ? 'Increased' : 'Decreased'} by N$${Math.abs(taxVariance).toFixed(2)}\n`
      
      if (Math.abs(taxVariance) > 100) {
        explanation += `  • This change is mainly due to ${taxVariance > 0 ? 'higher' : 'lower'} taxable earnings.\n`
      }
    }

    if (currentPayroll.breakdown.preTaxDeductions !== previousPayroll.breakdown.preTaxDeductions) {
      const preTaxDiff = currentPayroll.breakdown.preTaxDeductions - previousPayroll.breakdown.preTaxDeductions
      explanation += `💸 **Pre-tax Deductions:** ${preTaxDiff > 0 ? 'Increased' : 'Decreased'} by N$${Math.abs(preTaxDiff).toFixed(2)}\n`
    }

    explanation += `\n💡 **Bottom Line:** ${netPayVariance > 0 ? 'You take home more' : 'You take home less'} money this month due to the factors above.`

    return explanation
  }

  /**
   * Suggest payroll optimizations
   */
  static suggestOptimizations(payrollData: PayrollResult[]): {
    category: 'cost' | 'efficiency' | 'compliance'
    suggestion: string
    potentialSavings?: number
    implementation: string
  }[] {
    const suggestions = []

    // Analyze overtime patterns
    const totalOvertime = payrollData.reduce((sum, p) => sum + p.breakdown.overtimeEarnings, 0)
    const totalGross = payrollData.reduce((sum, p) => sum + p.grossPay, 0)
    const overtimeRatio = totalOvertime / totalGross

    if (overtimeRatio > 0.1) { // More than 10% overtime
      suggestions.push({
        category: 'cost' as const,
        suggestion: 'High overtime costs detected (>10% of payroll)',
        potentialSavings: Math.round(totalOvertime * 0.3), // Potential 30% savings
        implementation: 'Review staffing levels, consider hiring additional staff, or implement better scheduling systems.'
      })
    }

    // Analyze tax efficiency
    const avgTaxRate = payrollData.reduce((sum, p) => sum + (p.payeTax / p.grossPay), 0) / payrollData.length
    if (avgTaxRate > 0.25) { // Average tax rate > 25%
      suggestions.push({
        category: 'efficiency' as const,
        suggestion: 'Consider implementing tax-efficient benefits',
        potentialSavings: Math.round(totalGross * 0.02), // Potential 2% savings
        implementation: 'Review benefit packages, consider retirement contributions, medical aid, and other tax-deductible benefits.'
      })
    }

    return suggestions
  }

  /**
   * Helper: Calculate variance
   */
  private static calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2))
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / values.length
  }

  /**
   * Helper: Analyze leave patterns
   */
  private static analyzeLeavePattern(history: Array<{ type: string; date: string; days: number }>, leaveType: string): number {
    const typeHistory = history.filter(h => h.type === leaveType)
    if (typeHistory.length === 0) return 0

    const monthsCovered = new Set(typeHistory.map(h => new Date(h.date).getMonth())).size
    const totalDays = typeHistory.reduce((sum, h) => sum + h.days, 0)
    
    return monthsCovered > 0 ? totalDays / monthsCovered : 0
  }
}
