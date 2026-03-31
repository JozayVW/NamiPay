import { NextRequest, NextResponse } from 'next/server'
import { WhatsAppService } from '@/lib/whatsapp'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Testing WhatsApp Integration...')
    
    // Test 1: Send a test text message
    const testPhoneNumber = '+264811234567' // Test number
    const testMessage = '🤖 *NamiPay AI Test*\n\nThis is a test message from your NamiPay AI system.\n\nFeatures working:\n✅ Text messaging\n✅ Formatting\n✅ Emoji support\n\nReply "MENU" to see interactive options!'
    
    const sendResult = await WhatsAppService.sendTextMessage(testPhoneNumber, testMessage)
    
    // Test 2: Test payslip message
    const payslipResult = await WhatsAppService.sendPayslipMessage(
      testPhoneNumber,
      'John Doe',
      'March 2026',
      '12,450.00',
      'https://namipay.ai/self-service/payslip/view?token=abc123'
    )
    
    // Test 3: Test interactive menu
    const menuResult = await WhatsAppService.sendInteractiveMenu(testPhoneNumber, 'John Doe')
    
    // Test 4: Test webhook processing
    const mockWebhook = {
      object: 'whatsapp_business_account',
      entry: [{
        id: '123456',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '+264811234567',
              phone_number_id: '123456'
            },
            contacts: [{
              profile: { name: 'John Doe' },
              wa_id: '264811234567'
            }],
            messages: [{
              from: '264811234567',
              id: 'msg_123',
              timestamp: '1648567890',
              text: { body: 'payslip' }
            }]
          },
          field: 'messages'
        }]
      }]
    }
    
    const processedMessage = WhatsAppService.processIncomingMessage(mockWebhook)
    
    return NextResponse.json({
      success: true,
      tests: {
        textMessage: sendResult ? '✅ PASSED' : '❌ FAILED',
        payslipMessage: payslipResult ? '✅ PASSED' : '❌ FAILED',
        interactiveMenu: menuResult ? '✅ PASSED' : '❌ FAILED',
        webhookProcessing: processedMessage ? '✅ PASSED' : '❌ FAILED'
      },
      details: {
        sendResult,
        payslipResult,
        menuResult,
        processedMessage
      },
      message: 'WhatsApp integration tests completed!'
    })
    
  } catch (error) {
    console.error('WhatsApp test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'WhatsApp integration test failed'
    }, { status: 500 })
  }
}
