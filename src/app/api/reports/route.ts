import { NextRequest, NextResponse } from 'next/server'
import { AIIntelligenceService } from '@/lib/ai-intelligence'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reportType = searchParams.get('type')
  const period = searchParams.get('period') || '2026-03'

  try {
    switch (reportType) {
      case 'payroll-summary':
        return generatePayrollSummary(period)
      case 'anomalies':
        return generateAnomalyReport(period)
      case 'forecast':
        return generateForecastReport()
      case 'leave-analysis':
        return generateLeaveAnalysisReport()
      case 'namera-compliance':
        return generateNAMRAComplianceReport(period)
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function generatePayrollSummary(period: string) {
  // Mock data - in production, this would query your database
  const payrollData = {
    period,
    totalEmployees: 156,
    totalGrossPay: 2645000,
    totalNetPay: 1930500,
    totalPAYE: 450000,
    totalSSC: 23400,
    totalNHE: 23400,
    totalOvertime: 180000,
    averageSalary: 16955,
    departments: [
      { name: 'Information Technology', employees: 25, totalPay: 450000 },
      { name: 'Finance', employees: 15, totalPay: 320000 },
      { name: 'Human Resources', employees: 8, totalPay: 180000 },
      { name: 'Operations', employees: 45, totalPay: 720000 },
      { name: 'Sales', employees: 30, totalPay: 480000 },
      { name: 'Administration', employees: 33, totalPay: 495000 }
    ],
    earningsBreakdown: {
      basicSalary: 2340000,
      overtime: 180000,
      allowances: 125000
    },
    deductionsBreakdown: {
      paye: 450000,
      sscEmployee: 23400,
      sscEmployer: 23400,
      nheEmployee: 23400,
      nheEmployer: 23400,
      medicalAid: 180000,
      pension: 175000,
      other: 50000
    }
  }

  return NextResponse.json({
    success: true,
    data: payrollData,
    generatedAt: new Date().toISOString()
  })
}

async function generateAnomalyReport(period: string) {
  // Mock anomalies data
  const anomalies = [
    {
      type: 'overtime',
      severity: 'high',
      employeeId: 'EMP-001',
      employeeName: 'John Smith',
      description: 'Overtime increased by 150% from N$1,200 to N$3,000',
      recommendation: 'Review workload and consider hiring additional staff',
      confidence: 92
    },
    {
      type: 'paye_variance',
      severity: 'medium',
      employeeId: 'EMP-042',
      employeeName: 'Sarah Johnson',
      description: 'PAYE tax changed by N$450 (25% increase)',
      recommendation: 'Verify tax configuration and employee tax details',
      confidence: 78
    },
    {
      type: 'overtime',
      severity: 'medium',
      employeeId: 'EMP-078',
      employeeName: 'Michael Brown',
      description: 'Overtime increased by 80% from N$800 to N$1,440',
      recommendation: 'Monitor scheduling patterns and efficiency',
      confidence: 85
    }
  ]

  return NextResponse.json({
    success: true,
    data: {
      period,
      totalAnomalies: anomalies.length,
      highSeverityCount: anomalies.filter(a => a.severity === 'high').length,
      mediumSeverityCount: anomalies.filter(a => a.severity === 'medium').length,
      lowSeverityCount: anomalies.filter(a => a.severity === 'low').length,
      anomalies,
      summary: {
        overtimeAnomalies: anomalies.filter(a => a.type === 'overtime').length,
        taxAnomalies: anomalies.filter(a => a.type === 'paye_variance').length,
        averageConfidence: anomalies.reduce((sum, a) => sum + a.confidence, 0) / anomalies.length
      }
    },
    generatedAt: new Date().toISOString()
  })
}

async function generateForecastReport() {
  // Mock forecast data
  const forecast = {
    nextPeriod: 'April 2026',
    currentPeriod: 'March 2026',
    projections: {
      grossPay: {
        current: 2645000,
        projected: 2780000,
        change: 135000,
        changePercent: 5.1,
        confidenceInterval: {
          min: 2650000,
          max: 2910000
        }
      },
      netPay: {
        current: 1930500,
        projected: 2030000,
        change: 99500,
        changePercent: 5.2
      },
      headcount: {
        current: 156,
        projected: 160,
        change: 4,
        changePercent: 2.6
      }
    },
    factors: {
      inflationRate: 6.0,
      headcountChange: 2.6,
      overtimeTrend: 6.8,
      marketAdjustments: 3.2
    },
    recommendations: [
      'Budget for 5.1% increase in payroll costs',
      'Plan for 4 new hires in April',
      'Monitor overtime trends - currently 6.8% of payroll',
      'Consider annual salary adjustments based on 6% inflation'
    ]
  }

  return NextResponse.json({
    success: true,
    data: forecast,
    generatedAt: new Date().toISOString()
  })
}

async function generateLeaveAnalysisReport() {
  // Mock leave data
  const leaveData = {
    period: '2026',
    totalEmployees: 156,
    leaveBalances: {
      annual: {
        totalAllocated: 3120,
        totalUsed: 624,
        totalRemaining: 2496,
        averagePerEmployee: 20,
        usageRate: 20.0
      },
      sick: {
        totalAllocated: 1872,
        totalUsed: 234,
        totalRemaining: 1638,
        averagePerEmployee: 12,
        usageRate: 12.5
      },
      family: {
        totalAllocated: 780,
        totalUsed: 78,
        totalRemaining: 702,
        averagePerEmployee: 5,
        usageRate: 10.0
      }
    },
    monthlyTrends: [
      { month: 'Jan', annual: 52, sick: 18, family: 6 },
      { month: 'Feb', annual: 48, sick: 22, family: 8 },
      { month: 'Mar', annual: 45, sick: 20, family: 4 }
    ],
    riskAnalysis: {
      highRiskEmployees: 12, // Employees at risk of exceeding leave
      mediumRiskEmployees: 28,
      lowRiskEmployees: 116,
      projectedYearEndUsage: {
        annual: 2496,
        sick: 468,
        family: 156
      }
    },
    recommendations: [
      '12 employees at high risk of exceeding annual leave - schedule meetings',
      'Monitor sick leave trends in Q2 - showing slight increase',
      'Family responsibility leave usage within normal parameters',
      'Consider leave blackout periods for critical business periods'
    ]
  }

  return NextResponse.json({
    success: true,
    data: leaveData,
    generatedAt: new Date().toISOString()
  })
}

async function generateNAMRAComplianceReport(period: string) {
  // Mock compliance data
  const complianceData = {
    period,
    overallStatus: 'COMPLIANT',
    complianceScore: 98.5,
    checks: [
      {
        category: 'PAYE Calculations',
        status: 'PASS',
        score: 99.2,
        details: 'All PAYE calculations match NAMRA tax tables',
        issues: []
      },
      {
        category: 'SSC Contributions',
        status: 'PASS',
        score: 100.0,
        details: 'SSC contributions correctly calculated at 0.5% with earnings ceiling',
        issues: []
      },
      {
        category: 'NHE Contributions',
        status: 'PASS',
        score: 100.0,
        details: 'NHE contributions correctly calculated at 0.5% with earnings ceiling',
        issues: []
      },
      {
        category: 'Tax Certificates',
        status: 'WARNING',
        score: 95.0,
        details: '3 employees missing tax numbers for ITA34 generation',
        issues: [
          'Employee EMP-089: Missing tax number',
          'Employee EMP-102: Missing tax number', 
          'Employee EMP-134: Missing tax number'
        ]
      },
      {
        category: 'Reporting Deadlines',
        status: 'PASS',
        score: 100.0,
        details: 'All monthly reports submitted on time',
        issues: []
      }
    ],
    summary: {
      totalChecks: 5,
      passedChecks: 4,
      warningChecks: 1,
      failedChecks: 0,
      requiredActions: 3
    },
    requiredActions: [
      'Update missing tax numbers for 3 employees',
      'Verify ITA34 certificates for all taxable employees',
      'Prepare annual reconciliation for tax year ending 28 Feb 2026'
    ],
    nextDeadlines: [
      {
        task: 'Monthly PAYE Return',
        deadline: '2026-04-14',
        status: 'PENDING'
      },
      {
        task: 'Monthly SSC Return',
        deadline: '2026-04-14',
        status: 'PENDING'
      },
      {
        task: 'Annual Tax Reconciliation',
        deadline: '2026-04-28',
        status: 'PENDING'
      }
    ]
  }

  return NextResponse.json({
    success: true,
    data: complianceData,
    generatedAt: new Date().toISOString()
  })
}
