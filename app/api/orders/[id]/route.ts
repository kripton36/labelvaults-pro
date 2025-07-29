import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { orders, findOrdersByUserId } from '@/lib/data-store'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = requireAuth(request)!
    const { id } = params

    // Find order
    const userOrders = findOrdersByUserId(user.userId)
    const order = userOrders.find(o => o.id === id)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order })

  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = requireAuth(request)!
    const { id } = params
    const body = await request.json()

    // Find order
    const orderIndex = orders.findIndex(o => o.id === id && o.userId === user.userId)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Update order
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      order: orders[orderIndex],
      message: 'Order updated successfully'
    })

  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}