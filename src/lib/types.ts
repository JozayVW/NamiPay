import { User, Employee, Tenant, PayrollRun, LeaveRequest, StaffLoan } from '@prisma/client'

export type {
  User,
  Employee,
  Tenant,
  PayrollRun,
  LeaveRequest,
  StaffLoan
}

export interface PayrollCalculationResult {
  grossPay: number
  payeTax: number
  sscEmployee: number
  sscEmployer: number
  nheEmployee: number
  nheEmployer: number
  otherDeductions: number
  netPay: number
}

export interface NAMIRATaxBrackets {
  min: number
  max: number | null
  rate: number
  fixedAmount: number
}

export interface PayrollPeriod {
  id: string
  period: string
  startDate: Date
  endDate: Date
  status: 'DRAFT' | 'CALCULATING' | 'REVIEW' | 'APPROVED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  tenantId: string
}

export interface WhatsAppMessage {
  to: string
  message: string
  type: 'text' | 'template' | 'document'
}

export interface LeaveBalance {
  leaveTypeId: string
  leaveTypeName: string
  balance: number
  pending: number
  year: number
}

export interface EmployeePayroll {
  employee: Employee
  basicSalary: number
  overtimeEarnings: number
  otherEarnings: number
  deductions: Array<{
    code: string
    amount: number
    description: string
  }>
  netPay: number
}
