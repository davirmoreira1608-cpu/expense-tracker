'use client'

import { useState } from 'react'
import { upsertBudgetLimit } from '@/lib/queries'

interface BudgetFormProps {
  category: string
  currentLimit: number | null
  onSaved: () => void
}

export default function BudgetForm({ category, currentLimit, onSaved }: BudgetFormProps) {
  const [value, setValue] = useState(currentLimit?.toString() ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = parseFloat(value)
    if (!parsed || parsed <= 0) {
      setError('Enter a valid amount')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await upsertBudgetLimit(category, parsed)
      onSaved()
    } catch {
      setError('Failed to save.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Set limit (R$)"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-700"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-black rounded-xl px-4 py-2 text-sm font-bold hover:bg-yellow-300 disabled:opacity-50"
      >
        {loading ? '...' : 'Save'}
      </button>
      {error && <p className="text-red-400 text-xs self-center">{error}</p>}
    </form>
  )
}
