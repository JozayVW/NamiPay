'use client'

import { useState } from 'react'

const mockEmployees = [
  { id: 1, name: 'Frank Van Wyk', department: 'Management', position: 'Director', salary: 45000, status: 'Active' },
  { id: 2, name: 'Mark Van Wyk', department: 'Operations', position: 'Manager', salary: 32000, status: 'Active' },
  { id: 3, name: 'Sannie Van Wyk', department: 'Finance', position: 'Accountant', salary: 28000, status: 'Active' },
  { id: 4, name: 'Jose Van Wyk', department: 'IT', position: 'Developer', salary: 35000, status: 'Active' },
  { id: 5, name: 'Ethan Van Wyk', department: 'Operations', position: 'Supervisor', salary: 25000, status: 'Active' },
  { id: 6, name: 'Lani Van Wyk', department: 'HR', position: 'HR Officer', salary: 22000, status: 'Active' },
]

export default function EmployeesPage() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    department: '', position: '', salary: '', employmentType: 'PERMANENT'
  })

  const filtered = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500 mt-1">Manage your workforce</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Employees', value: '6', color: 'bg-blue-50 text-blue-700' },
          { label: 'Active', value: '6', color: 'bg-green-50 text-green-700' },
          { label: 'On Leave', value: '0', color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Departments', value: '5', color: 'bg-purple-50 text-purple-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color} px-2 py-0.5 rounded inline-block`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <input
          type="text"
          placeholder="Search employees by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Employee', 'Department', 'Position', 'Salary', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-gray-900">{emp.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{emp.department}</td>
                <td className="px-6 py-4 text-gray-600">{emp.position}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">N$ {emp.salary.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline text-sm mr-3">Edit</button>
                  <button className="text-red-500 hover:underline text-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Employee</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'First Name', key: 'firstName', type: 'text' },
                { label: 'Last Name', key: 'lastName', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone', type: 'text' },
                { label: 'Department', key: 'department', type: 'text' },
                { label: 'Position', key: 'position', type: 'text' },
                { label: 'Basic Salary (N$)', key: 'salary', type: 'number' },
              ].map((f) => (
                <div key={f.key} className={f.key === 'email' ? 'col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <select
                  value={form.employmentType}
                  onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PERMANENT">Permanent</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="TEMPORARY">Temporary</option>
                  <option value="PROBATION">Probation</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAdd(false)}
                className="w-1/3 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="w-2/3 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
