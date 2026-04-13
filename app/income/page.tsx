'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Income, MonthYear } from '@/types'
import { getIncomeByMonth, deleteIncome } from '@/lib/queries'
import { getIncomeCategoryLabel } from '@/lib/incomeCategories'
import MonthPicker from '@/components/ui/MonthPicker'
import AuthGuard from '@/components/auth/AuthGuard'

export default function IncomePage() {
  const now = new Date()
  const [month, setMonth] = useState<MonthYear>({ year: now.getFullYear(), month: now.getMonth() + 1 })
  const [income, setIncome] = useState<Income[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIncome = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setIncome(await getIncomeByMonth(month.year, month.month))
    } catch {
      setError('Failed to load income.')
    } finally {
      setLoading(false)
    }
  }, [month])

  useEffect(() => { fetchIncome() }, [fetchIncome])

  async function handleDelete(id: string) {
    try {
      await deleteIncome(id)
      setIncome(prev => prev.filter(i => i.id !== id))
    } catch {
      setError('Failed to delete.')
    }
  }

  const total = income.reduce((sum, i) => sum + i.amount, 0)

  return (
    <AuthGuard>
      <div className="p-5 pb-24">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Income</h1>
          <Link
            href="/income/add"
            className="bg-yellow-400 text-black rounded-xl px-4 py-2 text-sm font-bold hover:bg-yellow-300"
          >
            + Add
          </Link>
        </div>

        <div className="flex flex-col items-center mb-5">
          <MonthPicker value={month} onChange={setMonth} />
          {!loading && (
            <p className="mt-2 text-sm text-gray-500">
              Total: <span className="font-semibold text-green-400">R$ {total.toFixed(2)}</span>
            </p>
          )}
        </div>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {loading ? (
          <p className="text-center text-gray-600 py-12">Loading...</p>
        ) : income.length === 0 ? (
          <p className="text-center text-gray-600 py-12">No income this month.</p>
        ) : (
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-4 flex flex-col">
            {income.map(item => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{getIncomeCategoryLabel(item.category)}</span>
                  {item.note && <span className="text-xs text-gray-500">{item.note}</span>}
                  <span className="text-xs text-gray-600">
                    {new Date(item.date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-green-400">R$ {item.amount.toFixed(2)}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-700 hover:text-red-400 text-lg leading-none"
                  >×</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
