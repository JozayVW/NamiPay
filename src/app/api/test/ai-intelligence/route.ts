import { NextRequest, NextResponse } from 'next/server'
import { AIIntelligenceService } from '@/lib/ai-intelligence'
import { PayrollCalculator } from '@/lib/payroll'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Testing AI Intelligence Features...')
    
    // Create mock payroll data for testing
    const mockCurrentPayroll = [
      {
        employeeId: 'EMP-001',
        grossPay: 15000,
        payeTax: 2150,
        sscEmployee: 75,
        sscEmployer: 75,
        nheEmployee: 75,
        nheEmployer: 75,
        otherDeductions: 1375,
        netPay: 12450,
        breakdown: {
          basicSalary: 15000,
          overtimeEarnings: 1125, // Increased overtime
          allowanceEarnings: 800,
          grossEarnings: 16925,
          taxableEarnings: 16925,
          payeTax: 2150,
          sscEmployee: 75,
          sscEmployer: 75,
          nheEmployee: 75,
          nheEmployer: 75,
          preTaxDeductions: 0,
          postTaxDeductions: 1375,
          netPay: 12450,
          employerCost: 17075
        }
      },
      {
        employeeId: 'EMP-002',
        grossPay: 12000,
        payeTax: 1500,
        sscEmployee: 60,
        sscEmployer: 60,
        nheEmployee: 60,
        nheEmployer: 60,
        otherDeductions: 930,
        netPay: 9800,
        breakdown: {
          basicSalary: 12000,
          overtimeEarnings: 450,
          allowanceEarnings: 600,
          grossEarnings: 13050,
          taxableEarnings: 13050,
          payeTax: 1500,
          sscEmployee: 60,
          sscEmployer: 60,
          nheEmployee: 60,
          nheEmployer: 60,
          preTaxDeductions: 0,
          postTaxDeductions: 930,
          netPay: 9800,
          employerCost: 12120
        }
      }
    ]
    
    const mockHistoricalPayroll = [
      {
        employeeId: 'EMP-001',
        grossPay: 15000,
        payeTax: 1800,
        sscEmployee: 75,
        sscEmployer: 75,
        nheEmployee: 75,
        nheEmployer: 75,
        otherDeductions: 1375,
        netPay: 12750,
        breakdown: {
          basicSalary: 15000,
          overtimeEarnings: 450, // Lower overtime - anomaly detected
          allowanceEarnings: 800,
          grossEarnings: 16250,
          taxableEarnings: 16250,
          payeTax: 1800,
          sscEmployee: 75,
          sscEmployer: 75,
          nheEmployee: 75,
          nheEmployer: 75,
          preTaxDeductions: 0,
          postTaxDeductions: 1375,
          netPay: 12750,
          employerCost: 16400
        }
      },
      {
        employeeId: 'EMP-002',
        grossPay: 12000,
        payeTax: 1500,
        sscEmployee: 60,
        sscEmployer: 60,
        nheEmployee: 60,
        nheEmployer: 60,
        otherDeductions: 930,
        netPay: 9800,
        breakdown: {
          basicSalary: 12000,
          overtimeEarnings: 450,
          allowanceEarnings: 600,
          grossEarnings: 13050,
          taxableEarnings: 13050,
          payeTax: 1500,
          sscEmployee: 60,
          sscEmployer: 60,
          nheEmployee: 60,
          nheEmployer: 60,
          preTaxDeductions: 0,
          postTaxDeductions: 930,
          netPay: 9800,
          employerCost: 12120
        }
      }
    ]
    
    // Test 1: Anomaly Detection
    console.log('🔍 Testing anomaly detection...')
    const anomalies = AIIntelligenceService.detectAnomalies(mockCurrentPayroll, mockHistoricalPayroll)
    
    // Test 2: Payroll Forecasting
    console.log('📈 Testing payroll forecasting...')
    const forecast = AIIntelligenceService.forecastPayroll(mockCurrentPayroll, 160, 0.06)
    
    // Test 3: Leave Risk Prediction
    console.log('🏖️ Testing leave risk prediction...')
    const mockEmployees = [
      {
        id: 'EMP-001',
        name: 'John Smith',
        leaveBalances: { annual: 18, sick: 12, family: 5 },
        leaveHistory: [
          { type: 'annual', date: '2026-01-15', days: 2 },
          { type: 'annual', date: '2026-02-10', days: 1 }
        ]
      },
      {
        id: 'EMP-002',
        name: 'Sarah Johnson',
        leaveBalances: { annual: 2, sick: 10, family: 4 },
        leaveHistory: [
          { type: 'annual', date: '2026-01-20', days: 3 },
          { type: 'annual', date: '2026-02-15', days: 2 },
          { type: 'annual', date: '2026-03-05', days: 2 }
        ]
      }
    ]
    const leavePredictions = AIIntelligenceService.predictLeaveRisks(mockEmployees)
    
    // Test 4: Natural Language Explanations
    console.log('💬 Testing natural language explanations...')
    const explanation = AIIntelligenceService.explainPayrollVariance(
      mockCurrentPayroll[0],
      mockHistoricalPayroll[0]
    )
    
    // Test 5: Optimization Suggestions
    console.log('💡 Testing optimization suggestions...')
    const suggestions = AIIntelligenceService.suggestOptimizations(mockCurrentPayroll)
    
    return NextResponse.json({
      success: true,
      tests: {
        anomalyDetection: anomalies.length > 0 ? '✅ PASSED' : '❌ FAILED',
        payrollForecasting: forecast ? '✅ PASSED' : '❌ FAILED',
        leavePrediction: leavePredictions.length > 0 ? '✅ PASSED' : '❌ FAILED',
        naturalLanguageExplanation: explanation ? '✅ PASSED' : '❌ FAILED',
        optimizationSuggestions: suggestions.length > 0 ? '✅ PASSED' : '❌ FAILED'
      },
      results: {
        anomalies: {
          detected: anomalies.length,
          highSeverity: anomalies.filter(a => a.severity === 'high').length,
          mediumSeverity: anomalies.filter(a => a.severity === 'medium').length,
          averageConfidence: anomalies.length > 0 ? 
            Math.round(anomalies.reduce((sum, a) => sum + a.confidence, 0) / anomalies.length) : 0
        },
        forecast: {
          projectedGrossPay: forecast.projectedGrossPay,
          projectedNetPay: forecast.projectedNetPay,
          confidenceInterval: forecast.confidenceInterval
        },
        leaveRisks: {
          totalEmployees: mockEmployees.length,
          highRiskEmployees: leavePredictions.filter(p => p.riskLevel === 'high').length,
          mediumRiskEmployees: leavePredictions.filter(p => p.riskLevel === 'medium').length
        },
        suggestions: {
          totalSuggestions: suggestions.length,
          potentialSavings: suggestions.reduce((sum, s) => sum + (s.potentialSavings || 0), 0)
        }
      },
      sampleData: {
        explanation: explanation.substring(0, 200) + '...',
        topAnomaly: anomalies[0] || null,
        topSuggestion: suggestions[0] || null
      },
      message: 'AI Intelligence tests completed successfully!'
    })
    
  } catch (error) {
    console.error('AI Intelligence test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'AI Intelligence test failed'
    }, { status: 500 })
  }
}
