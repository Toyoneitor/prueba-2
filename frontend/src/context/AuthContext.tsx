import { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

interface User {
  id: string
  email: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      })
      const userData = response.data
      setUser(userData.user)
      localStorage.setItem('token', userData.token)
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password
      })
      const userData = response.data
      setUser(userData.user)
      localStorage.setItem('token', userData.token)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
