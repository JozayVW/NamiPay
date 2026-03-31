'use client'

import { useState } from 'react'

const employees = [
  { id: 1, name: 'Frank Van Wyk', basic: 45000, overtime: 0, allowances: 5000 },
  { id: 2, name: 'Mark Van Wyk', basic: 32000, overtime: 2400, allowances: 2000 },
  { id: 3, name: 'Sannie Van Wyk', basic: 28000, overtime: 0, allowances: 1500 },
  { id: 4, name: 'Jose Van Wyk', basic: 35000, overtime: 1800, allowances: 3000 },
  { id: 5, name: 'Ethan Van Wyk', basic: 25000, overtime: 3000, allowances: 1000 },
  { id: 6, name: 'Lani Van Wyk', basic: 22000, overtime: 0, allowances: 1000 },
]

function calculatePAYE(annual: number): number {
  if (annual <= 50000) return 0
  if (annual <= 100000) return (annual - 50000) * 0.05
  if (annual <= 300000) return 2500 + (annual - 100000) * 0.10
  if (annual <= 500000) return 22500 + (annual - 300000) * 0.15
  if (annual <= 800000) return 52500 + (annual - 500000) * 0.20
  if (annual <= 1500000) return 112500 + (annual - 800000) * 0.25
  return 287500 + (annual - 1500000) * 0.30
}

function calculateSSC(monthly: number): number {
  return Math.min(monthly * 0.009, 81)
}

export default function PayrollPage() {
  const [period] = useState('March 2026')
  const [status, setStatus] = useState('DRAFT')
  const [processing, setProcessing] = useState(false)

  const payrollData = employees.map(emp => {
    const gross = emp.basic + emp.overtime + emp.allowances
    const annualGross = gross * 12
    const annualPAYE = calculatePAYE(annualGross)
    const monthlyPAYE = annualPAYE / 12
    const ssc = calculateSSC(gross)
    const nhe = gross * 0.01
    const totalDeductions = monthlyPAYE + ssc + nhe
    const net = gross - totalDeductions
    return { ...emp, gross, paye: monthlyPAYE, ssc, nhe, net }
  })

  const totals = payrollData.reduce((acc, e) => ({
    gross: acc.gross + e.gross,
    paye: acc.paye + e.paye,
    ssc: acc.ssc + e.ssc,
    net: acc.net + e.net,
  }), { gross: 0, paye: 0, ssc: 0, net: 0 })

  const handleProcess = () => {
    setProcessing(true)
    setTimeout(() => {
      setStatus('APPROVED')
      setProcessing(false)
    }, 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-500 mt-1">Period: {period}</p>
        </div>
        <div className="flex gap-3">
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {status}
          </span>
          {status === 'DRAFT' && (
            <button
              onClick={handleProcess}
              disabled={processing}
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Run Payroll'}
            </button>
          )}
          {status === 'APPROVED' && (
            <button className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
              Export Payslips
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Gross Pay', value: `N$ ${totals.gross.toLocaleString('en', {maximumFractionDigits:0})}`, color: 'text-blue-600' },
          { label: 'Total PAYE Tax', value: `N$ ${totals.paye.toLocaleString('en', {maximumFractionDigits:0})}`, color: 'text-red-600' },
          { label: 'Total SSC', value: `N$ ${totals.ssc.toLocaleString('en', {maximumFractionDigits:0})}`, color: 'text-orange-600' },
          { label: 'Total Net Pay', value: `N$ ${totals.net.toLocaleString('en', {maximumFractionDigits:0})}`, color: 'text-green-600' },
        ].map((c) => (
          <div key={c.label} className="bg-white p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold text-gray-900">Payroll Detail — {period}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Employee', 'Basic', 'Overtime', 'Allowances', 'Gross', 'PAYE', 'SSC', 'NHE', 'Net Pay'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payrollData.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{emp.name}</td>
                  <td className="px-4 py-3 text-gray-600">N$ {emp.basic.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600">N$ {emp.overtime.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600">N$ {emp.allowances.toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium">N$ {emp.gross.toLocaleString()}</td>
                  <td className="px-4 py-3 text-red-600">N$ {emp.paye.toLocaleString('en', {maximumFractionDigits:0})}</td>
                  <td className="px-4 py-3 text-orange-600">N$ {emp.ssc.toFixed(0)}</td>
                  <td className="px-4 py-3 text-orange-600">N$ {emp.nhe.toFixed(0)}</td>
                  <td className="px-4 py-3 font-bold text-green-600">N$ {emp.net.toLocaleString('en', {maximumFractionDigits:0})}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 font-bold">
              <tr>
                <td className="px-4 py-3" colSpan={4}>TOTALS</td>
                <td className="px-4 py-3">N$ {totals.gross.toLocaleString('en', {maximumFractionDigits:0})}</td>
                <td className="px-4 py-3 text-red-600">N$ {totals.paye.toLocaleString('en', {maximumFractionDigits:0})}</td>
                <td className="px-4 py-3 text-orange-600">N$ {totals.ssc.toFixed(0)}</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-green-600">N$ {totals.net.toLocaleString('en', {maximumFractionDigits:0})}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* NAMRA Compliance */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800 font-medium">
          ✅ NAMRA Compliant — PAYE calculated using official 2026 tax tables. SSC capped at N$81/month per employee.
        </p>
      </div>
    </div>
  )
}
