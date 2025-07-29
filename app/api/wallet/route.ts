import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAuth, authenticateRequest } from '@/lib/auth'
import { users, transactions, findUserById, findTransactionsByUserId } from '@/lib/data-store'

const topupSchema = z.object({
  amount: z.number().positive(),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'crypto']),
  paymentDetails: z.object({
    cardNumber: z.string().optional(),
    cryptoAddress: z.string().optional(),
    bankAccount: z.string().optional(),
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

    // Get user's transactions
    const userTransactions = findTransactionsByUserId(user!.userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      balance: userData.walletBalance,
      transactions: userTransactions,
    })

  } catch (error) {
    console.error('Get wallet error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = authenticateRequest(request)
    const body = await request.json()
    const { amount, paymentMethod, paymentDetails } = topupSchema.parse(body)

    // Find user
    const userIndex = users.findIndex(u => u.id === user!.userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create transaction
    const transaction = {
      id: `TXN-${Date.now()}`,
      userId: user!.userId,
      type: 'topup',
      amount,
      paymentMethod,
      paymentDetails,
      status: 'completed',
      createdAt: new Date().toISOString(),
    }

    transactions.push(transaction)

    // Update user balance
    users[userIndex].walletBalance += amount

    return NextResponse.json({
      transaction,
      newBalance: users[userIndex].walletBalance,
      message: 'Top-up successful'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Top-up error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}