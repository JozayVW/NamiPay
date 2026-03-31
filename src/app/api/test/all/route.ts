import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Running Complete Phase 2 Test Suite...')
    
    const testResults = []
    
    // Test 1: WhatsApp Integration
    console.log('💬 Testing WhatsApp Integration...')
    try {
      const whatsappResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/test/whatsapp`, {
        method: 'POST'
      })
      const whatsappData = await whatsappResponse.json()
      testResults.push({
        feature: 'WhatsApp Integration',
        status: whatsappData.success ? '✅ PASSED' : '❌ FAILED',
        details: whatsappData.tests || whatsappData.error,
        score: whatsappData.success ? 100 : 0
      })
    } catch (error) {
      testResults.push({
        feature: 'WhatsApp Integration',
        status: '❌ FAILED',
        details: error instanceof Error ? error.message : 'Unknown error',
        score: 0
      })
    }
    
    // Test 2: AI Intelligence
    console.log('🤖 Testing AI Intelligence...')
    try {
      const aiResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/test/ai-intelligence`, {
        method: 'POST'
      })
      const aiData = await aiResponse.json()
      testResults.push({
        feature: 'AI Intelligence',
        status: aiData.success ? '✅ PASSED' : '❌ FAILED',
        details: aiData.tests || aiData.error,
        score: aiData.success ? 100 : 0
      })
    } catch (error) {
      testResults.push({
        feature: 'AI Intelligence',
        status: '❌ FAILED',
        details: error instanceof Error ? error.message : 'Unknown error',
        score: 0
      })
    }
    
    // Test 3: Advanced Reporting
    console.log('📊 Testing Advanced Reporting...')
    try {
      const reportsResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/test/reports`, {
        method: 'POST'
      })
      const reportsData = await reportsResponse.json()
      testResults.push({
        feature: 'Advanced Reporting',
        status: reportsData.success ? '✅ PASSED' : '❌ FAILED',
        details: reportsData.testSummary || reportsData.error,
        score: reportsData.success ? reportsData.testSummary?.successRate || 0 : 0
      })
    } catch (error) {
      testResults.push({
        feature: 'Advanced Reporting',
        status: '❌ FAILED',
        details: error instanceof Error ? error.message : 'Unknown error',
        score: 0
      })
    }
    
    // Test 4: Self-Service Portal (Basic check)
    console.log('🏖️ Testing Self-Service Portal...')
    try {
      const portalResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/self-service`)
      testResults.push({
        feature: 'Self-Service Portal',
        status: portalResponse.ok ? '✅ PASSED' : '❌ FAILED',
        details: portalResponse.ok ? 'Portal loads successfully' : `HTTP ${portalResponse.status}`,
        score: portalResponse.ok ? 100 : 0
      })
    } catch (error) {
      testResults.push({
        feature: 'Self-Service Portal',
        status: '❌ FAILED',
        details: error instanceof Error ? error.message : 'Unknown error',
        score: 0
      })
    }
    
    // Calculate overall results
    const totalScore = testResults.reduce((sum, result) => sum + result.score, 0)
    const averageScore = Math.round(totalScore / testResults.length)
    const passedFeatures = testResults.filter(result => result.status.includes('PASSED')).length
    
    const overallStatus = averageScore >= 80 ? '🎉 EXCELLENT' : 
                        averageScore >= 60 ? '✅ GOOD' : 
                        averageScore >= 40 ? '⚠️ NEEDS IMPROVEMENT' : '❌ CRITICAL ISSUES'
    
    return NextResponse.json({
      success: true,
      testSuite: 'Phase 2 Features',
      overallStatus,
      summary: {
        totalFeatures: testResults.length,
        passedFeatures,
        failedFeatures: testResults.length - passedFeatures,
        averageScore,
        timestamp: new Date().toISOString()
      },
      results: testResults,
      recommendations: generateRecommendations(testResults),
      message: `Phase 2 testing complete! Status: ${overallStatus} (${passedFeatures}/${testResults.length} features working)`
    })
    
  } catch (error) {
    console.error('Test suite error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Test suite execution failed'
    }, { status: 500 })
  }
}

function generateRecommendations(results: any[]): string[] {
  const recommendations = []
  
  results.forEach(result => {
    if (result.status.includes('FAILED')) {
      switch (result.feature) {
        case 'WhatsApp Integration':
          recommendations.push('Configure WhatsApp Business API tokens and phone number ID')
          break
        case 'AI Intelligence':
          recommendations.push('Check AI service dependencies and data structures')
          break
        case 'Advanced Reporting':
          recommendations.push('Verify report API endpoints and database connections')
          break
        case 'Self-Service Portal':
          recommendations.push('Check Next.js routing and component imports')
          break
      }
    }
  })
  
  if (recommendations.length === 0) {
    recommendations.push('All systems operational! Ready for Phase 3 development.')
  }
  
  return recommendations
}
