'use client'

import { useState } from 'react'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>('payroll-summary')
  const [isLoading, setIsLoading] = useState(false)

  const reports = [
    { id: 'payroll-summary', name: 'Payroll Summary', icon: '📊', description: 'Complete payroll overview with department breakdowns' },
    { id: 'anomalies', name: 'Anomaly Detection', icon: '🔍', description: 'AI-powered anomaly detection and alerts' },
    { id: 'forecast', name: 'Payroll Forecast', icon: '📈', description: 'Predictive analytics for future payroll costs' },
    { id: 'leave-analysis', name: 'Leave Analysis', icon: '🏖️', description: 'Comprehensive leave balance and usage analysis' },
    { id: 'namera-compliance', name: 'NAMRA Compliance', icon: '✅', description: 'Regulatory compliance status and reporting' }
  ]

  const handleGenerateReport = async (reportType: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/reports?type=${reportType}&period=2026-03`)
      const data = await response.json()
      console.log('Report data:', data)
      // In a real app, you would process and display this data
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Advanced Reports</h2>
            <p className="text-gray-600 mt-1">AI-powered insights and comprehensive analytics</p>
          </div>
          <div className="flex space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>March 2026</option>
              <option>February 2026</option>
              <option>January 2026</option>
              <option>Custom Range</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              📥 Export All
            </button>
          </div>
        </div>
      </div>

      {/* Report Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
              selectedReport === report.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{report.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGenerateReport(report.id)
              }}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        ))}
      </div>

      {/* Report Display Area */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {reports.find(r => r.id === selectedReport)?.name}
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              🔄 Refresh
            </button>
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
              📥 Download
            </button>
          </div>
        </div>

        {/* Dynamic Report Content Based on Selection */}
        {selectedReport === 'payroll-summary' && <PayrollSummaryReport />}
        {selectedReport === 'anomalies' && <AnomalyReport />}
        {selectedReport === 'forecast' && <ForecastReport />}
        {selectedReport === 'leave-analysis' && <LeaveAnalysisReport />}
        {selectedReport === 'namera-compliance' && <NAMRAComplianceReport />}
      </div>
    </div>
  )
}

// Payroll Summary Report Component
function PayrollSummaryReport() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Total Employees</p>
          <p className="text-2xl font-bold text-blue-700">156</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Total Gross Pay</p>
          <p className="text-2xl font-bold text-green-700">N$ 2.6M</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600">Total Net Pay</p>
          <p className="text-2xl font-bold text-purple-700">N$ 1.9M</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-600">Average Salary</p>
          <p className="text-2xl font-bold text-yellow-700">N$ 16,955</p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Department Breakdown</h4>
        <div className="space-y-2">
          {[
            { name: 'Operations', employees: 45, pay: 720000 },
            { name: 'Sales', employees: 30, pay: 480000 },
            { name: 'Administration', employees: 33, pay: 495000 },
            { name: 'Information Technology', employees: 25, pay: 450000 },
            { name: 'Finance', employees: 15, pay: 320000 },
            { name: 'Human Resources', employees: 8, pay: 180000 }
          ].map((dept) => (
            <div key={dept.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="font-medium">{dept.name}</span>
                <span className="text-sm text-gray-500 ml-2">({dept.employees} employees)</span>
              </div>
              <span className="font-semibold">N$ {dept.pay.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings & Deductions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Earnings Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Basic Salary</span>
              <span className="font-semibold">N$ 2.34M</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Overtime</span>
              <span className="font-semibold">N$ 180K</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Allowances</span>
              <span className="font-semibold">N$ 125K</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Deductions Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-red-50 rounded">
              <span>PAYE Tax</span>
              <span className="font-semibold">N$ 450K</span>
            </div>
            <div className="flex justify-between p-2 bg-red-50 rounded">
              <span>Medical Aid</span>
              <span className="font-semibold">N$ 180K</span>
            </div>
            <div className="flex justify-between p-2 bg-red-50 rounded">
              <span>Pension Fund</span>
              <span className="font-semibold">N$ 175K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Anomaly Report Component
function AnomalyReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">High Severity</p>
          <p className="text-2xl font-bold text-red-700">1</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-600">Medium Severity</p>
          <p className="text-2xl font-bold text-yellow-700">2</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Average Confidence</p>
          <p className="text-2xl font-bold text-blue-700">85%</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="border-l-4 border-red-500 p-4 bg-red-50 rounded">
          <div className="flex justify-between items-start">
            <div>
              <h5 className="font-semibold text-red-800">High Overtime Usage</h5>
              <p className="text-sm text-red-600 mt-1">John Smith - Overtime increased by 150%</p>
              <p className="text-sm text-gray-600 mt-2">Recommendation: Review workload and consider hiring additional staff</p>
            </div>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">92% Confidence</span>
          </div>
        </div>

        <div className="border-l-4 border-yellow-500 p-4 bg-yellow-50 rounded">
          <div className="flex justify-between items-start">
            <div>
              <h5 className="font-semibold text-yellow-800">PAYE Tax Variance</h5>
              <p className="text-sm text-yellow-600 mt-1">Sarah Johnson - Tax increased by 25%</p>
              <p className="text-sm text-gray-600 mt-2">Recommendation: Verify tax configuration and employee details</p>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">78% Confidence</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Forecast Report Component
function ForecastReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">April 2026 Projection</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Gross Pay:</span>
              <span className="font-semibold">N$ 2.78M (+5.1%)</span>
            </div>
            <div className="flex justify-between">
              <span>Net Pay:</span>
              <span className="font-semibold">N$ 2.03M (+5.2%)</span>
            </div>
            <div className="flex justify-between">
              <span>Headcount:</span>
              <span className="font-semibold">160 (+4)</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h5 className="font-semibold text-green-800 mb-2">Key Factors</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Inflation Rate:</span>
              <span className="font-semibold">6.0%</span>
            </div>
            <div className="flex justify-between">
              <span>Overtime Trend:</span>
              <span className="font-semibold">6.8%</span>
            </div>
            <div className="flex justify-between">
              <span>Market Adjustments:</span>
              <span className="font-semibold">3.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h5 className="font-semibold text-yellow-800 mb-2">AI Recommendations</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Budget for 5.1% increase in payroll costs</li>
          <li>• Plan for 4 new hires in April</li>
          <li>• Monitor overtime trends - currently 6.8% of payroll</li>
          <li>• Consider annual salary adjustments based on 6% inflation</li>
        </ul>
      </div>
    </div>
  )
}

// Leave Analysis Report Component
function LeaveAnalysisReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Annual Leave Usage</p>
          <p className="text-2xl font-bold text-green-700">20%</p>
          <p className="text-xs text-green-500">624 of 3,120 days</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Sick Leave Usage</p>
          <p className="text-2xl font-bold text-blue-700">12.5%</p>
          <p className="text-xs text-blue-500">234 of 1,872 days</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600">High Risk Employees</p>
          <p className="text-2xl font-bold text-purple-700">12</p>
          <p className="text-xs text-purple-500">May exceed leave limits</p>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h5 className="font-semibold text-yellow-800 mb-2">Risk Analysis & Recommendations</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 12 employees at high risk of exceeding annual leave - schedule meetings</li>
          <li>• Monitor sick leave trends in Q2 - showing slight increase</li>
          <li>• Family responsibility leave usage within normal parameters</li>
          <li>• Consider leave blackout periods for critical business periods</li>
        </ul>
      </div>
    </div>
  )
}

// NAMRA Compliance Report Component
function NAMRAComplianceReport() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
        <div className="flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <div>
            <h5 className="font-semibold text-green-800">Overall Compliance Status</h5>
            <p className="text-sm text-green-600">98.5% Compliance Score</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">COMPLIANT</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <span>PAYE Calculations</span>
          </div>
          <span className="text-sm text-green-700">99.2% Score</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-green-50 rounded">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <span>SSC Contributions</span>
          </div>
          <span className="text-sm text-green-700">100% Score</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
          <div className="flex items-center">
            <span className="text-yellow-600 mr-2">!</span>
            <span>Tax Certificates</span>
          </div>
          <span className="text-sm text-yellow-700">95% Score</span>
        </div>
      </div>

      <div className="p-4 bg-red-50 rounded-lg">
        <h5 className="font-semibold text-red-800 mb-2">Required Actions</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Update missing tax numbers for 3 employees</li>
          <li>• Verify ITA34 certificates for all taxable employees</li>
          <li>• Prepare annual reconciliation for tax year ending 28 Feb 2026</li>
        </ul>
      </div>
    </div>
  )
}
