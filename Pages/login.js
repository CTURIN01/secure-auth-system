import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mfaToken, setMfaToken] = useState('')
  const [error, setError] = useState('')
  const [mfaRequired, setMfaRequired] = useState(false)
  const [tempToken, setTempToken] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        if (data.message === 'MFA required') {
          setMfaRequired(true)
          setTempToken(data.tempToken)
        } else {
          localStorage.setItem('token', data.token)
          router.push('/dashboard')
        }
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Something went wrong')
    }
  }

  const handleMfaSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/mfa-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, mfaToken }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        router.push('/dashboard')
      } else {
        setError(data.message)
      }
    } catch (error) {
      set

Error('Something went wrong')
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {mfaRequired ? 'Enter MFA Token' : 'Login'}
            </h2>
          </div>
          {!mfaRequired ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleMfaSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="mfa-token" className="sr-only">
                    MFA Token
                  </label>
                  <input
                    id="mfa-token"
                    name="mfaToken"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter MFA Token"
                    value={mfaToken}
                    onChange={(e) => setMfaToken(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verify MFA Token
                </button>
              </div>
            </form>
          )}
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </Layout>
  )
}