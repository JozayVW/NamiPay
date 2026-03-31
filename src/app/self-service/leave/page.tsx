'use client'

import { useState } from 'react'

export default function LeavePage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
            <p className="text-gray-600 mt-1">Manage your leave requests and balances</p>
          </div>
          <button 
            onClick={() => setShowApplicationForm(!showApplicationForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            ➕ Apply for Leave
          </button>
        </div>
      </div>

      {/* Leave Application Form */}
      {showApplicationForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for Leave</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Family Responsibility Leave</option>
                  <option>Study Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Full Day</option>
                  <option>Half Day - Morning</option>
                  <option>Half Day - Afternoon</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason (Optional)
              </label>
              <textarea 
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide a reason for your leave request..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => setShowApplicationForm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave Balances */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Balances (2026)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🏖️</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-2xl font-bold text-green-700">18</p>
            <p className="text-sm text-green-600">Annual Leave Days</p>
            <div className="mt-2 text-xs text-green-500">
              <div className="flex justify-between">
                <span>Accrued:</span>
                <span>20 days</span>
              </div>
              <div className="flex justify-between">
                <span>Used:</span>
                <span>2 days</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🏥</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">12</p>
            <p className="text-sm text-blue-600">Sick Leave Days</p>
            <div className="mt-2 text-xs text-blue-500">
              <div className="flex justify-between">
                <span>Accrued:</span>
                <span>12 days</span>
              </div>
              <div className="flex justify-between">
                <span>Used:</span>
                <span>0 days</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">5</p>
            <p className="text-sm text-purple-600">Family Responsibility</p>
            <div className="mt-2 text-xs text-purple-500">
              <div className="flex justify-between">
                <span>Accrued:</span>
                <span>5 days</span>
              </div>
              <div className="flex justify-between">
                <span>Used:</span>
                <span>0 days</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📚</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Request</span>
            </div>
            <p className="text-2xl font-bold text-yellow-700">3</p>
            <p className="text-sm text-yellow-600">Study Leave Days</p>
            <div className="mt-2 text-xs text-yellow-500">
              <div className="flex justify-between">
                <span>Available:</span>
                <span>On approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span>✅</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Annual Leave</p>
                <p className="text-sm text-gray-500">15 Feb 2026 - 16 Feb 2026 (2 days)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Approved</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span>⏳</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Study Leave</p>
                <p className="text-sm text-gray-500">01 Apr 2026 - 03 Apr 2026 (3 days)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Pending</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span>❌</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Annual Leave</p>
                <p className="text-sm text-gray-500">20 Dec 2025 - 24 Dec 2025 (5 days)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Rejected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
