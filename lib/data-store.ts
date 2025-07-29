// Shared data store for the application
// In a real app, you'd use a proper database like PostgreSQL, MongoDB, etc.

export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  walletBalance: number
  createdAt: string
  updatedAt?: string
}

export interface Order {
  id: string
  userId: string
  type: string
  quantity: number
  specifications?: {
    size?: string
    material?: string
    finish?: string
    colors?: string[]
  }
  files?: string[]
  rushOrder?: boolean
  specialInstructions?: string
  status: 'Pending' | 'In Production' | 'Completed' | 'Cancelled'
  progress: number
  createdAt: string
  updatedAt: string
  estimatedDelivery: string
}

export interface Transaction {
  id: string
  userId: string
  type: 'topup' | 'payment' | 'refund'
  amount: number
  paymentMethod?: 'credit_card' | 'bank_transfer' | 'crypto'
  paymentDetails?: {
    cardNumber?: string
    cryptoAddress?: string
    bankAccount?: string
  }
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
  userId: string
}

// In-memory data stores
export const users: User[] = []
export const orders: Order[] = []
export const transactions: Transaction[] = []
export const uploadedFiles: UploadedFile[] = []

// Helper functions
export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id)
}

export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email)
}

export function findOrdersByUserId(userId: string): Order[] {
  return orders.filter(order => order.userId === userId)
}

export function findTransactionsByUserId(userId: string): Transaction[] {
  return transactions.filter(transaction => transaction.userId === userId)
}

export function findFilesByUserId(userId: string): UploadedFile[] {
  return uploadedFiles.filter(file => file.userId === userId)
}