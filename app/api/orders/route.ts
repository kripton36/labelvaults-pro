import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAuth, authenticateRequest } from '@/lib/auth'
import { orders, findOrdersByUserId } from '@/lib/data-store'

const createOrderSchema = z.object({
  type: z.string(),
  quantity: z.number().positive(),
  specifications: z.object({
    size: z.string().optional(),
    material: z.string().optional(),
    finish: z.string().optional(),
    colors: z.array(z.string()).optional(),
  }).optional(),
  files: z.array(z.string()).optional(), // File URLs
  rushOrder: z.boolean().optional(),
  specialInstructions: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = authenticateRequest(request)
    const body = await request.json()
    const orderData = createOrderSchema.parse(body)

    // Create order
    const order = {
      id: `ORD-${Date.now()}`,
      userId: user!.userId,
      ...orderData,
      status: 'Pending',
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    }

    orders.push(order)

    return NextResponse.json({
      order,
      message: 'Order created successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = authenticateRequest(request)

    // Get user's orders
    const userOrders = findOrdersByUserId(user!.userId)

    return NextResponse.json({
      orders: userOrders,
      total: userOrders.length
    })

  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}