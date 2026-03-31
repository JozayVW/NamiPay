import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Testing Advanced Reporting System...')
    
    const reportTests = []
    
    // Test 1: Payroll Summary Report
    console.log('📊 Testing payroll summary report...')
    const payrollResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reports?type=payroll-summary&period=2026-03`)
    const payrollData = await payrollResponse.json()
    reportTests.push({
      name: 'Payroll Summary',
      status: payrollData.success ? '✅ PASSED' : '❌ FAILED',
      data: payrollData.success ? {
        totalEmployees: payrollData.data.totalEmployees,
        totalGrossPay: payrollData.data.totalGrossPay,
        departments: payrollData.data.departments?.length || 0
      } : payrollData.error
    })
    
    // Test 2: Anomaly Detection Report
    console.log('🔍 Testing anomaly detection report...')
    const anomalyResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reports?type=anomalies&period=2026-03`)
    const anomalyData = await anomalyResponse.json()
    reportTests.push({
      name: 'Anomaly Detection',
      status: anomalyData.success ? '✅ PASSED' : '❌ FAILED',
      data: anomalyData.success ? {
        totalAnomalies: anomalyData.data.totalAnomalies,
        highSeverityCount: anomalyData.data.highSeverityCount,
        averageConfidence: anomalyData.data.summary?.averageConfidence || 0
      } : anomalyData.error
    })
    
    // Test 3: Forecast Report
    console.log('📈 Testing forecast report...')
    const forecastResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reports?type=forecast`)
    const forecastData = await forecastResponse.json()
    reportTests.push({
      name: 'Payroll Forecast',
      status: forecastData.success ? '✅ PASSED' : '❌ FAILED',
      data: forecastData.success ? {
        projectedGrossPay: forecastData.data.projections?.grossPay?.projected,
        changePercent: forecastData.data.projections?.grossPay?.changePercent,
        nextPeriod: forecastData.data.nextPeriod
      } : forecastData.error
    })
    
    // Test 4: Leave Analysis Report
    console.log('🏖️ Testing leave analysis report...')
    const leaveResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reports?type=leave-analysis`)
    const leaveData = await leaveResponse.json()
    reportTests.push({
      name: 'Leave Analysis',
      status: leaveData.success ? '✅ PASSED' : '❌ FAILED',
      data: leaveData.success ? {
        totalEmployees: leaveData.data.totalEmployees,
        annualLeaveUsage: leaveData.data.leaveBalances?.annual?.usageRate,
        highRiskEmployees: leaveData.data.riskAnalysis?.highRiskEmployees
      } : leaveData.error
    })
    
    // Test 5: NAMRA Compliance Report
    console.log('✅ Testing NAMRA compliance report...')
    const complianceResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reports?type=namera-compliance&period=2026-03`)
    const complianceData = await complianceResponse.json()
    reportTests.push({
      name: 'NAMRA Compliance',
      status: complianceData.success ? '✅ PASSED' : '❌ FAILED',
      data: complianceData.success ? {
        overallStatus: complianceData.data.overallStatus,
        complianceScore: complianceData.data.complianceScore,
        passedChecks: complianceData.data.summary?.passedChecks,
        requiredActions: complianceData.data.requiredActions?.length || 0
      } : complianceData.error
    })
    
    // Test 6: Invalid Report Type
    console.log('❌ Testing invalid report type...')
    const invalidResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reports?type=invalid-report`)
    const invalidData = await invalidResponse.json()
    reportTests.push({
      name: 'Invalid Report Type',
      status: !invalidData.success && invalidResponse.status === 400 ? '✅ PASSED' : '❌ FAILED',
      data: {
        error: invalidData.error,
        statusCode: invalidResponse.status
      }
    })
    
    const passedTests = reportTests.filter(test => test.status.includes('PASSED')).length
    const totalTests = reportTests.length
    
    return NextResponse.json({
      success: true,
      testSummary: {
        totalTests,
        passedTests,
        failedTests: totalTests - passedTests,
        successRate: Math.round((passedTests / totalTests) * 100)
      },
      tests: reportTests,
      message: `Advanced Reporting tests completed! ${passedTests}/${totalTests} tests passed.`
    })
    
  } catch (error) {
    console.error('Reports test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Advanced Reporting test failed'
    }, { status: 500 })
  }
}
