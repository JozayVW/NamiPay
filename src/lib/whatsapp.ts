import { WhatsAppMessage } from './types'

export interface WhatsAppTemplate {
  name: string
  language: {
    code: string
  }
  components: Array<{
    type: 'header' | 'body' | 'footer'
    parameters?: Array<{
      type: 'text' | 'currency' | 'date_time' | 'image'
      text?: string
      currency?: {
        fallback_value: string
        code: string
        amount_1000: number
      }
      date_time?: {
        fallback_value: string
      }
      image?: {
        link: string
      }
    }>
  }>
}

export interface WhatsAppWebhookPayload {
  object: string
  entry: Array<{
    id: string
    changes: Array<{
      value: {
        messaging_product: string
        metadata: {
          display_phone_number: string
          phone_number_id: string
        }
        contacts?: Array<{
          profile: {
            name: string
          }
          wa_id: string
        }>
        messages: Array<{
          from: string
          id: string
          timestamp: string
          text?: {
            body: string
          }
          interactive?: {
            type: string
            button_reply?: {
              id: string
              title: string
            }
          }
        }>
      }
      field: string
    }>
  }>
}

export class WhatsAppService {
  private static readonly API_TOKEN = process.env.WHATSAPP_API_TOKEN
  private static readonly PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
  private static readonly BASE_URL = 'https://graph.facebook.com/v18.0'

  /**
   * Send a text message via WhatsApp
   */
  static async sendTextMessage(to: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace('+', ''), // Remove + if present
          text: {
            body: message
          }
        })
      })

      const data = await response.json()
      return response.ok && data.messages?.[0]?.id
    } catch (error) {
      console.error('WhatsApp send error:', error)
      return false
    }
  }

  /**
   * Send a template message
   */
  static async sendTemplateMessage(
    to: string, 
    templateName: string, 
    parameters: Record<string, any> = {}
  ): Promise<boolean> {
    try {
      const template: WhatsAppTemplate = {
        name: templateName,
        language: { code: 'en' },
        components: []
      }

      // Add parameters to body component
      if (Object.keys(parameters).length > 0) {
        template.components.push({
          type: 'body',
          parameters: Object.values(parameters).map(value => ({
            type: 'text',
            text: String(value)
          }))
        })
      }

      const response = await fetch(`${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace('+', ''),
          type: 'template',
          template: template
        })
      })

      const data = await response.json()
      return response.ok && data.messages?.[0]?.id
    } catch (error) {
      console.error('WhatsApp template send error:', error)
      return false
    }
  }

  /**
   * Send payslip as interactive message
   */
  static async sendPayslipMessage(
    to: string, 
    employeeName: string, 
    period: string, 
    netPay: string,
    payslipUrl: string
  ): Promise<boolean> {
    const message = `💰 *Payslip Available*\n\nHello ${employeeName},\n\nYour payslip for ${period} is ready.\n\n📊 *Summary:*\n• Net Pay: N$ ${netPay}\n• Period: ${period}\n\n📄 *View Full Payslip:* ${payslipUrl}\n\n🔒 *Secure Access:* Use your employee PIN to view detailed information.\n\n💬 *Reply with:*\n• "DETAILS" - View full payslip\n• "BALANCE" - Leave balance\n• "HELP" - More options`

    return this.sendTextMessage(to, message)
  }

  /**
   * Send leave balance information
   */
  static async sendLeaveBalanceMessage(
    to: string,
    employeeName: string,
    annualLeave: number,
    sickLeave: number,
    familyLeave: number
  ): Promise<boolean> {
    const message = `🏖️ *Leave Balance*\n\nHello ${employeeName},\n\nYour current leave balances:\n\n📊 *Annual Leave:* ${annualLeave} days\n🏥 *Sick Leave:* ${sickLeave} days\n👨‍👩‍👧‍👦 *Family Responsibility:* ${familyLeave} days\n\n💬 *Reply with:*\n• "APPLY LEAVE" - Request leave\n• "HISTORY" - Leave history\n• "BACK" - Main menu`

    return this.sendTextMessage(to, message)
  }

  /**
   * Send interactive menu
   */
  static async sendInteractiveMenu(to: string, employeeName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace('+', ''),
          type: 'interactive',
          interactive: {
            type: 'button',
            body: {
              text: `🤖 *NamiPay AI Assistant*\n\nHello ${employeeName},\n\nHow can I help you today?`
            },
            action: {
              buttons: [
                {
                  type: 'reply',
                  reply: {
                    id: 'payslip',
                    title: '📄 Latest Payslip'
                  }
                },
                {
                  type: 'reply',
                  reply: {
                    id: 'balance',
                    title: '🏖️ Leave Balance'
                  }
                },
                {
                  type: 'reply',
                  reply: {
                    id: 'tax',
                    title: '📊 Tax Certificate'
                  }
                }
              ]
            }
          }
        })
      })

      const data = await response.json()
      return response.ok && data.messages?.[0]?.id
    } catch (error) {
      console.error('WhatsApp interactive menu error:', error)
      return false
    }
  }

  /**
   * Verify webhook signature
   */
  static verifyWebhookSignature(
    body: string, 
    signature: string, 
    appSecret: string
  ): boolean {
    if (!signature) return false
    
    const expectedSignature = 'sha256=' + 
      require('crypto')
        .createHmac('sha256', appSecret)
        .update(body)
        .digest('hex')
    
    return signature === expectedSignature
  }

  /**
   * Process incoming message
   */
  static processIncomingMessage(payload: WhatsAppWebhookPayload): {
    from: string
    message: string
    type: 'text' | 'interactive'
    messageId: string
  } | null {
    try {
      const message = payload.entry[0]?.changes[0]?.value?.messages?.[0]
      
      if (!message) return null

      return {
        from: message.from,
        message: message.text?.body || 
                message.interactive?.button_reply?.title || '',
        type: message.text ? 'text' : 'interactive',
        messageId: message.id
      }
    } catch (error) {
      console.error('Error processing webhook:', error)
      return null
    }
  }

  /**
   * Generate secure payslip URL
   */
  static generateSecurePayslipUrl(employeeId: string, period: string): string {
    const token = Buffer.from(`${employeeId}:${period}:${Date.now()}`).toString('base64')
    return `${process.env.NEXTAUTH_URL}/self-service/payslip/view?token=${token}`
  }

  /**
   * Handle common commands
   */
  static async handleCommand(
    from: string, 
    command: string, 
    employeeData: any
  ): Promise<boolean> {
    const normalizedCommand = command.toLowerCase().trim()

    switch (normalizedCommand) {
      case 'menu':
      case 'help':
        return this.sendInteractiveMenu(from, employeeData.firstName)
      
      case 'payslip':
      case 'latest payslip':
      case 'details':
        return this.sendPayslipMessage(
          from,
          employeeData.firstName,
          'March 2026',
          '12,450.00',
          this.generateSecurePayslipUrl(employeeData.id, '2026-03')
        )
      
      case 'balance':
      case 'leave balance':
        return this.sendLeaveBalanceMessage(
          from,
          employeeData.firstName,
          employeeData.leaveBalances.annual,
          employeeData.leaveBalances.sick,
          employeeData.leaveBalances.family
        )
      
      default:
        return this.sendTextMessage(
          from,
          '🤖 I didn\'t understand that. Reply "MENU" to see available options.'
        )
    }
  }
}
