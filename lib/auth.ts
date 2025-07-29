import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export interface JWTPayload {
  userId: string
  email: string
  iat: number
  exp: number
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

export function authenticateRequest(request: NextRequest): { user: JWTPayload | null; token: string | null } {
  const token = getTokenFromRequest(request)
  if (!token) {
    return { user: null, token: null }
  }

  const user = verifyToken(token)
  return { user, token }
}

export function requireAuth(request: NextRequest): NextResponse | null {
  const { user } = authenticateRequest(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  return null
}