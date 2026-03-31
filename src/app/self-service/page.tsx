'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function SelfServiceDashboard() {
  const { t, formatCurrency } = useLanguage()

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t('dashboard.welcome')}, John! 👋
            </h2>
            <p className="text-gray-600 mt-1">
              {t('selfservice.welcome')} - March 2026
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{t('selfservice.employeeId')}</p>
            <p className="font-semibold">EMP-00156</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">{t('dashboard.monthlyPayroll')}</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(12450)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🏖️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">{t('leave.balance')}</p>
              <p className="text-xl font-bold text-gray-900">18 {t('leave.days')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">{t('selfservice.payslip')}</p>
              <p className="text-xl font-bold text-gray-900">Mar 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.quickActions')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <span className="text-2xl mb-2">📄</span>
            <span className="text-sm font-medium text-blue-700">{t('selfservice.viewPayslip')}</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <span className="text-2xl mb-2">🏖️</span>
            <span className="text-sm font-medium text-green-700">{t('leave.apply')}</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm font-medium text-purple-700">{t('namira.taxCertificate')}</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <span className="text-2xl mb-2">💬</span>
            <span className="text-sm font-medium text-yellow-700">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Recent Payslips */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Payslips</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">{t('common.view')}</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span>📄</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">March 2026</p>
                <p className="text-sm text-gray-500">{t('payroll.netPay')}: {formatCurrency(12450)}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {t('common.view')}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span>📄</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">February 2026</p>
                <p className="text-sm text-gray-500">{t('payroll.netPay')}: {formatCurrency(12380)}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {t('common.view')}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span>📄</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">January 2026</p>
                <p className="text-sm text-gray-500">{t('payroll.netPay')}: {formatCurrency(12380)}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {t('common.view')}
            </button>
          </div>
        </div>
      </div>

      {/* Leave Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('nav.leave')}</h3>
          <button className="text-sm text-green-600 hover:text-green-800">{t('leave.apply')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">18</p>
            <p className="text-sm text-green-600">{t('leave.annualLeave')}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">12</p>
            <p className="text-sm text-blue-600">{t('leave.sickLeave')}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">0</p>
            <p className="text-sm text-purple-600">{t('leave.pending')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
