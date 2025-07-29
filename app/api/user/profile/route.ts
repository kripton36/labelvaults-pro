import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAuth, authenticateRequest } from '@/lib/auth'
import { users, findUserById } from '@/lib/data-store'

const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
})

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = authenticateRequest(request)
    
    // Find user
    const userData = findUserById(user!.userId)
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = userData

    return NextResponse.json({ user: userWithoutPassword })

  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = authenticateRequest(request)
    const body = await request.json()
    const updateData = updateProfileSchema.parse(body)

    // Find user
    const userIndex = users.findIndex(u => u.id === user!.userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    // Return updated user data without password
    const { password, ...userWithoutPassword } = users[userIndex]

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Profile updated successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}