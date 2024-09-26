import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LockIcon, UserPlusIcon } from 'lucide-react'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Secure Auth System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              A robust authentication system with multi-factor authentication
            </p>
            <div className="space-y-4">
              <Link href="/login" passHref>
                <Button className="w-full" variant="default">
                  <LockIcon className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button className="w-full" variant="outline">
                  <UserPlusIcon className="mr-2 h-4 w-4" /> Register
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}