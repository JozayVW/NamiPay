import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { AuthService } from '@/lib/auth'
import { UserRole } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const {
      companyName,
      tradingName,
      registrationNo,
      taxNo,
      phone,
      email,
      address,
      firstName,
      lastName,
      userEmail,
      password,
    } = await request.json()

    // Validate required fields
    if (!companyName || !email || !firstName || !lastName || !userEmail || !password) {
      return NextResponse.json({ error: 'All required fields must be filled in.' }, { status: 400 })
    }

    // Check if user email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail.toLowerCase().trim() },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    // Hash password
    const passwordHash = await AuthService.hashPassword(password)

    // Create tenant + admin user in a single transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the company (tenant)
      const tenant = await tx.tenant.create({
        data: {
          name: companyName.trim(),
          tradingName: tradingName?.trim() || null,
          registrationNo: registrationNo?.trim() || null,
          taxNo: taxNo?.trim() || null,
          phone: phone?.trim() || null,
          email: email.toLowerCase().trim(),
          address: address?.trim() || null,
          status: 'ACTIVE',
        },
      })

      // 2. Create the admin user
      const user = await tx.user.create({
        data: {
          tenantId: tenant.id,
          email: userEmail.toLowerCase().trim(),
          passwordHash,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          role: UserRole.ADMIN,
          status: 'ACTIVE',
        },
      })

      return { tenant, user }
    })

    // Generate JWT token
    const authUser = {
      id: result.user.id,
      email: result.user.email,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
      role: result.user.role,
      tenantId: result.tenant.id,
    }

    const token = AuthService.generateToken(authUser)

    return NextResponse.json({
      token,
      user: {
        ...authUser,
        tenantName: result.tenant.name,
      },
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
