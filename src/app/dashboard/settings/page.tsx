'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [company, setCompany] = useState({
    name: 'Gendev Fishing Group',
    tradingName: '',
    registrationNo: '',
    taxNo: '',
    sscNo: '',
    nheNo: '',
    phone: '+264 61 000 000',
    email: 'info@gendev.com.na',
    address: 'Windhoek, Namibia',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your company configuration</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">✅ Settings saved successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">

        {/* Company Info */}
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration No.</label>
              <input
                type="text"
                value={company.registrationNo}
                onChange={(e) => setCompany({ ...company, registrationNo: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="CC/2023/1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NAMRA Tax No.</label>
              <input
                type="text"
                value={company.taxNo}
                onChange={(e) => setCompany({ ...company, taxNo: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tax number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SSC Number</label>
              <input
                type="text"
                value={company.sscNo}
                onChange={(e) => setCompany({ ...company, sscNo: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SSC number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NHE Number</label>
              <input
                type="text"
                value={company.nheNo}
                onChange={(e) => setCompany({ ...company, nheNo: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="NHE number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* NAMRA Compliance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">NAMRA Compliance</h2>
            <div className="space-y-3">
              {[
                { label: 'PAYE Tax Tables', value: '2026', status: true },
                { label: 'SSC Rate', value: '0.9%', status: true },
                { label: 'NHE Rate', value: '1.0%', status: true },
                { label: 'ITA34 Generation', value: 'Enabled', status: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    <span className="text-green-500">✅</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Info</h2>
            <div className="space-y-3">
              {[
                { label: 'Version', value: 'v1.0.0' },
                { label: 'Environment', value: 'Production' },
                { label: 'Database', value: 'PostgreSQL' },
                { label: 'AI Engine', value: 'Active' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Danger Zone</h2>
            <p className="text-sm text-red-600 mb-4">These actions cannot be undone.</p>
            <button className="w-full px-4 py-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium">
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
