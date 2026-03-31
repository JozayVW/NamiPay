import { NextRequest, NextResponse } from 'next/server'
import { WhatsAppService } from '@/lib/whatsapp'

// Verify webhook - for Meta WhatsApp setup
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Invalid verification token' }, { status: 403 })
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    // Verify webhook signature (optional but recommended)
    if (signature && !WhatsAppService.verifyWebhookSignature(
      body, 
      signature, 
      process.env.WHATSAPP_APP_SECRET || ''
    )) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    const payload = JSON.parse(body)
    const message = WhatsAppService.processIncomingMessage(payload)

    if (!message) {
      return NextResponse.json({ status: 'ok' })
    }

    // Get employee data based on phone number
    const employeeData = await getEmployeeByPhone(message.from)
    
    if (!employeeData) {
      await WhatsAppService.sendTextMessage(
        message.from,
        '🔒 *Access Denied*\n\nYour phone number is not registered in our system. Please contact your HR administrator.'
      )
      return NextResponse.json({ status: 'ok' })
    }

    // Handle the command
    await WhatsAppService.handleCommand(message.from, message.message, employeeData)

    return NextResponse.json({ status: 'ok' })

  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to get employee by phone number
async function getEmployeeByPhone(phone: string) {
  // Mock employee data - in real app, this would query your database
  const mockEmployee = {
    id: 'emp-00156',
    firstName: 'John',
    phone: phone.replace('+', ''),
    leaveBalances: {
      annual: 18,
      sick: 12,
      family: 5
    }
  }

  // In production, you would:
  // const employee = await prisma.employee.findUnique({
  //   where: { phone: phone.replace('+', '') }
  // })

  return mockEmployee
}
