export default function PayslipPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payslip Details</h2>
            <p className="text-gray-600 mt-1">March 2026</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              📄 Download PDF
            </button>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
              💬 Send via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">John Doe</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Employee ID</p>
            <p className="font-medium">EMP-00156</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium">Information Technology</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Job Title</p>
            <p className="font-medium">Senior Developer</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tax Number</p>
            <p className="font-medium">1234567890</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Bank Account</p>
            <p className="font-medium">****1234 (Bank Windhoek)</p>
          </div>
        </div>
      </div>

      {/* Earnings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Basic Salary</p>
              <p className="text-sm text-gray-500">Monthly basic salary</p>
            </div>
            <p className="font-semibold">N$ 15,000.00</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Overtime</p>
              <p className="text-sm text-gray-500">8 hours @ 1.5x rate</p>
            </div>
            <p className="font-semibold">N$ 1,125.00</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Transport Allowance</p>
              <p className="text-sm text-gray-500">Monthly transport allowance</p>
            </div>
            <p className="font-semibold">N$ 800.00</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="font-semibold text-gray-900">Gross Earnings</p>
            <p className="font-bold text-lg text-gray-900">N$ 16,925.00</p>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deductions</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">PAYE (Tax)</p>
              <p className="text-sm text-gray-500">Pay As You Earn</p>
            </div>
            <p className="font-semibold">N$ 2,150.00</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">SSC Employee</p>
              <p className="text-sm text-gray-500">Social Security Commission (0.5%)</p>
            </div>
            <p className="font-semibold">N$ 75.00</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">NHE Employee</p>
              <p className="text-sm text-gray-500">National Housing Enterprise (0.5%)</p>
            </div>
            <p className="font-semibold">N$ 75.00</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Medical Aid</p>
              <p className="text-sm text-gray-500">Employee contribution</p>
            </div>
            <p className="font-semibold">N$ 1,200.00</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Pension Fund</p>
              <p className="text-sm text-gray-500">Employee contribution (7.5%)</p>
            </div>
            <p className="font-semibold">N$ 1,125.00</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="font-semibold text-gray-900">Total Deductions</p>
            <p className="font-bold text-lg text-gray-900">N$ 4,625.00</p>
          </div>
        </div>
      </div>

      {/* Net Pay Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-sm p-6 mb-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-100">Net Pay for March 2026</p>
            <p className="text-3xl font-bold">N$ 12,300.00</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100">Payment Date</p>
            <p className="text-xl font-semibold">28 March 2026</p>
          </div>
        </div>
      </div>

      {/* YTD Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-to-Date Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">N$ 50,775.00</p>
            <p className="text-sm text-gray-600">YTD Gross Pay</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">N$ 13,875.00</p>
            <p className="text-sm text-gray-600">YTD PAYE Tax</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">N$ 36,900.00</p>
            <p className="text-sm text-gray-600">YTD Net Pay</p>
          </div>
        </div>
      </div>
    </div>
  )
}
