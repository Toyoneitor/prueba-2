import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = jwt.sign({ email }, 'tu_secreto_jwt')
    
    res.json({
      user: {
        id: '1',
        email
      },
      token
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = jwt.sign({ email }, 'tu_secreto_jwt')
    
    res.json({
      user: {
        id: '1',
        email
      },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
} 