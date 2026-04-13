'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/auth'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const inputClass = "bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-700"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signUp(email, password)
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not create account')
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6">
        <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
        <p className="text-gray-400">We sent a confirmation link to <span className="text-yellow-400">{email}</span>. Click it to activate your account, then sign in.</p>
        <Link href="/login" className="mt-6 text-center bg-yellow-400 text-black rounded-xl py-4 font-bold hover:bg-yellow-300">
          Go to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pb-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Create account</h1>
        <p className="text-gray-500 mt-1">Start tracking your money</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">Password</label>
          <input
            type="password"
            placeholder="min. 6 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black rounded-xl py-4 font-bold hover:bg-yellow-300 disabled:opacity-50 transition-colors mt-2"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-yellow-400 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
