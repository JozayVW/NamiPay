'use client'

import { useState } from 'react'

const leaveRequests = [
  { id: 1, employee: 'Mark Van Wyk', type: 'Annual Leave', from: '2026-04-07', to: '2026-04-11', days: 5, status: 'PENDING', reason: 'Family vacation' },
  { id: 2, employee: 'Sannie Van Wyk', type: 'Sick Leave', from: '2026-03-28', to: '2026-03-29', days: 2, status: 'APPROVED', reason: 'Medical appointment' },
  { id: 3, employee: 'Ethan Van Wyk', type: 'Annual Leave', from: '2026-04-14', to: '2026-04-18', days: 5, status: 'PENDING', reason: 'Personal travel' },
  { id: 4, employee: 'Lani Van Wyk', type: 'Study Leave', from: '2026-04-01', to: '2026-04-03', days: 3, status: 'APPROVED', reason: 'University exams' },
]

const leaveBalances = [
  { employee: 'Frank Van Wyk', annual: 20, sick: 30, study: 10 },
  { employee: 'Mark Van Wyk', annual: 15, sick: 28, study: 10 },
  { employee: 'Sannie Van Wyk', annual: 18, sick: 28, study: 10 },
  { employee: 'Jose Van Wyk', annual: 20, sick: 30, study: 10 },
  { employee: 'Ethan Van Wyk', annual: 15, sick: 30, study: 10 },
  { employee: 'Lani Van Wyk', annual: 17, sick: 27, study: 7 },
]

export default function LeaveManagementPage() {
  const [tab, setTab] = useState<'requests' | 'balances'>('requests')
  const [requests, setRequests] = useState(leaveRequests)

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r))
  }

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED' } : r))
  }

  const pending = requests.filter(r => r.status === 'PENDING').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-500 mt-1">Manage employee leave requests and balances</p>
        </div>
        {pending > 0 && (
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium text-sm">
            {pending} pending approval{pending > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pending', value: requests.filter(r => r.status === 'PENDING').length, color: 'text-yellow-600' },
          { label: 'Approved', value: requests.filter(r => r.status === 'APPROVED').length, color: 'text-green-600' },
          { label: 'Rejected', value: requests.filter(r => r.status === 'REJECTED').length, color: 'text-red-600' },
          { label: 'Total Requests', value: requests.length, color: 'text-blue-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('requests')}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors ${
            tab === 'requests' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
          }`}
        >
          Leave Requests
        </button>
        <button
          onClick={() => setTab('balances')}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors ${
            tab === 'balances' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
          }`}
        >
          Leave Balances
        </button>
      </div>

      {tab === 'requests' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Employee', 'Type', 'From', 'To', 'Days', 'Reason', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{req.employee}</td>
                  <td className="px-4 py-3 text-gray-600">{req.type}</td>
                  <td className="px-4 py-3 text-gray-600">{req.from}</td>
                  <td className="px-4 py-3 text-gray-600">{req.to}</td>
                  <td className="px-4 py-3 text-center font-medium">{req.days}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{req.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      req.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {req.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'balances' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Employee', 'Annual Leave', 'Sick Leave', 'Study Leave'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaveBalances.map((bal) => (
                <tr key={bal.employee} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{bal.employee}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(bal.annual / 20) * 100}%` }} />
                      </div>
                      <span className="text-gray-700 font-medium">{bal.annual} days</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(bal.sick / 30) * 100}%` }} />
                      </div>
                      <span className="text-gray-700 font-medium">{bal.sick} days</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(bal.study / 10) * 100}%` }} />
                      </div>
                      <span className="text-gray-700 font-medium">{bal.study} days</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
