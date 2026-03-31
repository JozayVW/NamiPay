export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to NamiPay AI - Your Namibia Payroll Intelligence System</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Payroll</p>
              <p className="text-2xl font-semibold text-gray-900">N$ 2.4M</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Period</p>
              <p className="text-2xl font-semibold text-gray-900">Mar 2026</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliance</p>
              <p className="text-2xl font-semibold text-gray-900">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
              🚀 Run Payroll for March 2026
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors">
              ➕ Add New Employee
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors">
              📈 Generate NAMRA Reports
            </button>
            <button className="w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100 transition-colors">
              🏖️ Approve Leave Requests
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-sm text-blue-800">
                <strong>Overtime Alert:</strong> 3 employees show 20% increase in overtime hours this month.
              </p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500">
              <p className="text-sm text-green-800">
                <strong>Cost Forecast:</strong> Payroll costs expected to increase by 5% next month due to planned hires.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <p className="text-sm text-yellow-800">
                <strong>Leave Balance:</strong> 12 employees approaching leave carry-forward limits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payroll completed for February 2026</p>
                <p className="text-xs text-gray-500">156 employees processed</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New employee added: John Smith</p>
                <p className="text-xs text-gray-500">IT Department</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">5 hours ago</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Leave request approved: Sarah Johnson</p>
                <p className="text-xs text-gray-500">5 days annual leave</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">NAMRA reports generated and submitted</p>
                <p className="text-xs text-gray-500">PAYE, SSC, and NHE for February 2026</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
