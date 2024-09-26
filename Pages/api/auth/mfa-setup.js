import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import prisma from '../../../lib/prisma'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = verifyToken(token)
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const secret = speakeasy.generateSecret({ name: 'SecureAuthSystem' })
    await prisma.user.update({
      where: { id: user.id },
      data: { mfaSecret: secret.base32 },
    })

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)
    res.status(200).json({ qrCodeUrl, secret: secret.base32 })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}