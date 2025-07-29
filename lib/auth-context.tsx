'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from './api-client'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  walletBalance: number
  createdAt: string
  updatedAt?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    company?: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = apiClient.getToken()
    if (token) {
      // Verify token and get user data
      apiClient.getProfile().then((response) => {
        if (response.data?.user) {
          setUser(response.data.user)
        } else {
          // Token is invalid, clear it
          apiClient.clearToken()
        }
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password)
      
      if (response.error) {
        return { success: false, error: response.error }
      }

      if (response.data?.token && response.data?.user) {
        apiClient.setToken(response.data.token)
        setUser(response.data.user)
        return { success: true }
      }

      return { success: false, error: 'Login failed' }
    } catch (error) {
      return { success: false, error: 'Network error' }
    }
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    company?: string
  }) => {
    try {
      const response = await apiClient.register(userData)
      
      if (response.error) {
        return { success: false, error: response.error }
      }

      if (response.data?.token && response.data?.user) {
        apiClient.setToken(response.data.token)
        setUser(response.data.user)
        return { success: true }
      }

      return { success: false, error: 'Registration failed' }
    } catch (error) {
      return { success: false, error: 'Network error' }
    }
  }

  const logout = () => {
    apiClient.clearToken()
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}