import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserRole } from '@prisma/client'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  tenantId: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  tenantId: string
}

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
  private static readonly JWT_EXPIRES_IN = '7d'

  /**
   * Hash password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  /**
   * Verify password against hash
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  /**
   * Generate JWT token
   */
  static generateToken(user: AuthUser): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId
    }

    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN })
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any
      return {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role,
        tenantId: decoded.tenantId
      }
    } catch (error) {
      return null
    }
  }

  /**
   * Check if user has required role
   */
  static hasRequiredRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
    return requiredRoles.includes(userRole)
  }

  /**
   * Check if user can access tenant data
   */
  static canAccessTenant(userTenantId: string, resourceTenantId: string): boolean {
    return userTenantId === resourceTenantId
  }

  /**
   * Get role hierarchy level (higher number = higher privilege)
   */
  static getRoleLevel(role: UserRole): number {
    const roleHierarchy = {
      [UserRole.EMPLOYEE]: 1,
      [UserRole.MANAGER]: 2,
      [UserRole.HR_MANAGER]: 3,
      [UserRole.PAYROLL_ADMIN]: 4,
      [UserRole.ADMIN]: 5,
      [UserRole.SUPER_ADMIN]: 6
    }
    return roleHierarchy[role] || 0
  }

  /**
   * Check if user has higher or equal privilege than target role
   */
  static hasSufficientPrivilege(userRole: UserRole, targetRole: UserRole): boolean {
    return this.getRoleLevel(userRole) >= this.getRoleLevel(targetRole)
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    return authHeader.substring(7)
  }

  /**
   * Validate password strength
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean
    errors: string[]
  } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Generate secure random password
   */
  static generateSecurePassword(length: number = 12): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let password = ''
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    return password
  }
}
