'use client'

import { useState, useEffect, useCallback } from 'react'
import { Expense, MonthYear } from '@/types'
import { getExpensesByMonth } from '@/lib/queries'
import { CATEGORIES } from '@/lib/categories'
import MonthPicker from '@/components/ui/MonthPicker'
import CategoryCard from '@/components/reports/CategoryCard'
import AuthGuard from '@/components/auth/AuthGuard'

export default function ReportsPage() {
  const now = new Date()
  const [month, setMonth] = useState<MonthYear>({ year: now.getFullYear(), month: now.getMonth() + 1 })
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setExpenses(await getExpensesByMonth(month.year, month.month))
    } catch {
      setError('Failed to load data.')
    } finally {
      setLoading(false)
    }
  }, [month])

  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  const categoriesWithData = Object.keys(CATEGORIES).filter(cat =>
    expenses.some(e => e.category === cat)
  )

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <AuthGuard>
    <div className="p-5 pb-24">
      <h1 className="text-2xl font-bold text-white mb-4">Reports</h1>

      <div className="flex flex-col items-center mb-5">
        <MonthPicker value={month} onChange={setMonth} />
        {!loading && expenses.length > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Total spent: <span className="font-semibold text-green-400">R$ {total.toFixed(2)}</span>
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-400 py-12">Loading...</p>
      ) : categoriesWithData.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No expenses this month.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {categoriesWithData.map(cat => (
            <CategoryCard
              key={cat}
              category={cat}
              expenses={expenses.filter(e => e.category === cat)}
            />
          ))}
        </div>
      )}
    </div>
    </AuthGuard>
  )
}
