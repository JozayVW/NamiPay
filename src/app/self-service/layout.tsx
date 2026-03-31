import { ReactNode } from 'react'
import LanguageSelector from '@/components/LanguageSelector'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function SelfServiceLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-namibia-blue">
                  NamiPay <span className="text-namibia-green">AI</span>
                </h1>
                <span className="ml-4 text-sm text-gray-500">Employee Portal</span>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <div className="w-8 h-8 bg-namibia-blue rounded-full flex items-center justify-center text-white text-sm">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-500">
              © 2026 NamiPay AI. Empowering Namibian Employees.
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  )
}
