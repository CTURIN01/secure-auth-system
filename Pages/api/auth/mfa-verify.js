import speakeasy from 'speakeasy'
import jwt from 'jsonwebtoken'
import prisma from '../../../lib/prisma'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { tempToken, mfaToken } = req.body

  try {
    const decoded = verifyToken(tempToken)
    if (!decoded.mfaRequired) {
      return res.status(400).json({ message: 'Invalid token' })
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    if (!user || !user.mfaSecret) {
      return res.status(404).json({ message: 'User not found or MFA not set up' })
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: mfaToken,
    })

    if (!verified) {
      return res.status(400).json({ message: 'Invalid MFA token' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}