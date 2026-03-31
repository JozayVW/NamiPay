import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-namibia-blue">
                NamiPay <span className="text-namibia-green">AI</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Dashboard</span>
              <div className="w-8 h-8 bg-namibia-blue rounded-full flex items-center justify-center text-white text-sm">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
                  📊 Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/employees" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  👥 Employees
                </a>
              </li>
              <li>
                <a href="/dashboard/payroll" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  💰 Payroll
                </a>
              </li>
              <li>
                <a href="/dashboard/leave" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  🏖️ Leave Management
                </a>
              </li>
              <li>
                <a href="/dashboard/reports" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  📈 Reports
                </a>
              </li>
              <li>
                <a href="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  ⚙️ Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
