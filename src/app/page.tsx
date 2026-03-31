export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            NamiPay <span className="text-namibia-blue">AI</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Namibia AI Payroll System
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Transforming payroll from calculation engine to intelligence system. 
            AI-native, NAMRA-compliant, Namibia-first.
          </p>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-namibia-blue text-4xl mb-4">🇳🇦</div>
              <h3 className="text-xl font-semibold mb-2">Namibia-First</h3>
              <p className="text-gray-600">Built specifically for Namibian businesses with NAMRA-native compliance</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-namibia-green text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Native</h3>
              <p className="text-gray-600">Intelligent payroll processing with predictive analytics and automation</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-namibia-yellow text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
              <p className="text-gray-600">Payslip delivery and employee self-service via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
