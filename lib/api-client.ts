// API client for making requests to the backend

const API_BASE_URL = '/api'

interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    const token = this.getToken()

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Request failed' }
      }

      return { data, message: data.message }
    } catch (error) {
      console.error('API request failed:', error)
      return { error: 'Network error' }
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    company?: string
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // User Profile
  async getProfile() {
    return this.request('/user/profile')
  }

  async updateProfile(profileData: {
    firstName?: string
    lastName?: string
    company?: string
    phone?: string
    address?: {
      street?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
    }
  }) {
    return this.request('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    })
  }

  // Orders
  async getOrders() {
    return this.request('/orders')
  }

  async createOrder(orderData: {
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
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`)
  }

  async updateOrder(id: string, orderData: any) {
    return this.request(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(orderData),
    })
  }

  // Wallet
  async getWallet() {
    return this.request('/wallet')
  }

  async topupWallet(data: {
    amount: number
    paymentMethod: 'credit_card' | 'bank_transfer' | 'crypto'
    paymentDetails?: {
      cardNumber?: string
      cryptoAddress?: string
      bankAccount?: string
    }
  }) {
    return this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // File Upload
  async uploadFiles(files: File[]) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    const token = this.getToken()
    const url = `${API_BASE_URL}/upload`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Upload failed' }
      }

      return { data, message: data.message }
    } catch (error) {
      console.error('File upload failed:', error)
      return { error: 'Upload failed' }
    }
  }
}

export const apiClient = new ApiClient()