# NamiPay AI - Namibia AI Payroll System

Transforming payroll from calculation engine to intelligence system. AI-native, NAMRA-compliant, Namibia-first.

## Features

### 🇳🇦 Namibia-First
- NAMRA-native compliance built from the ground up
- Namibian tax calculations (PAYE, SSC, NHE)
- Support for all major Namibian banks
- Local business practices and regulations

### 🤖 AI-Native
- Intelligent anomaly detection
- Predictive analytics for payroll forecasting
- Natural language explanations of payroll calculations
- Automated compliance checking

### 💬 WhatsApp Integration
- Payslip delivery via WhatsApp
- Employee self-service through conversational interface
- Leave balance inquiries and applications
- Secure authentication with PIN verification

### 🌍 Multilingual Support
- English, Afrikaans, Oshiwambo, Otjiherero, Damara/Nama, Lozi, Rukwangali, Setswana
- Full interface localization
- Payslips in employee's preferred language

### 🏢 Multi-Tenant Cloud Architecture
- Scalable cloud-native design
- Row-level security for data isolation
- Real-time calculations and reporting
- Comprehensive audit trails

## Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Backend**: Next.js API routes with Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT-based with bcrypt
- **Styling**: Tailwind CSS
- **AI**: OpenAI API integration
- **Communication**: WhatsApp Business API

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- WhatsApp Business API account (for WhatsApp features)
- OpenAI API key (for AI features)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Configure your database URL and other settings in `.env.local`

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── employees/         # Employee management
│   ├── payroll/           # Payroll processing
│   └── self-service/      # Employee self-service
├── components/            # Reusable React components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication logic
│   ├── db.ts             # Database client
│   ├── namira.ts         # NAMRA compliance calculations
│   ├── payroll.ts        # Payroll calculation engine
│   └── types.ts          # TypeScript type definitions
└── prisma/                # Database schema and migrations
```

## Core Modules

### Employee Management
- Complete employee profiles with job information
- Organizational structure (departments, branches, cost centers)
- Custom fields and forms
- Document management

### Payroll Processing
- Flexible earnings and deductions configuration
- NAMRA-compliant statutory calculations
- Staff loan management
- Partial period and termination calculations

### Leave Management
- Configurable leave types and accrual rules
- Leave balance tracking and forecasting
- Approval workflows
- Analytics and reporting

### Compliance & Reporting
- Automatic NAMRA report generation
- ITA34 tax certificates
- SSC and NHE contribution schedules
- Comprehensive audit trails

## API Documentation

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/login
POST /api/auth/register
GET /api/auth/me
```

### Employees
```
GET /api/employees
POST /api/employees
GET /api/employees/[id]
PUT /api/employees/[id]
```

### Payroll
```
GET /api/payroll/runs
POST /api/payroll/calculate
GET /api/payroll/[runId]/entries
```

## Development Phases

### Phase 1: Foundation (Months 1-4)
- Multi-tenant architecture
- Employee management
- Basic payroll engine
- NAMRA compliance modules
- Authentication system

### Phase 2: Core Features (Months 5-8)
- Leave management
- EFT payment integration
- Standard reporting
- Employee self-service portal
- Staff loan management

### Phase 3: Differentiation (Months 9-12)
- WhatsApp integration
- Multilingual support
- Workflow engine
- Custom fields functionality

### Phase 4: Intelligence (Months 13-18)
- AI-powered anomaly detection
- Predictive analytics
- Natural language processing
- Advanced workflows

### Phase 5: Expansion (Months 19-24)
- Additional languages
- REST API suite
- Third-party integrations
- Mobile applications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary to NamiPay AI. All rights reserved.

## Support

For support and inquiries, contact:
- Email: support@namipay.ai
- Phone: +264 61 123 456
- Website: www.namipay.ai

---

**NamiPay AI** - Transforming Payroll, Empowering Namibian Businesses
