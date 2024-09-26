import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    if (user.mfaEnabled) {
      // Return a temporary token for MFA verification
      const tempToken = jwt.sign({ userId: user.id, mfaRequired: true }, process.env.JWT_SECRET, { expiresIn: '5m' })
      return res.status(200).json({ message: 'MFA required', tempToken })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}