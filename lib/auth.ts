import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

type JWTPayload = { id: number; name: string; date: Date }

const hasId = (decoded: any): decoded is JWTPayload => 'id' in decoded

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (!token) {
      res.status(401)
      res.json({ error: 'Not Authorized' })
      return
    }

    let user: User

    try {
      const decoded = jwt.verify(token, 'hello')
      if (!hasId(decoded)) {
        throw new Error('Not real user')
      }

      user = await prisma.user.findUnique({ where: { id: decoded.id } })

      if (!user) {
        throw new Error('Not real user')
      }
    } catch (e) {
      res.status(401)
      res.json({ error: 'Not Authorized' })
      return
    }

    return handler(req, res, user)
  }
}
