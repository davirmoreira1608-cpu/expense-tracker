'use client'

import { useState, useEffect, useCallback } from 'react'
import { BudgetLimit, Expense } from '@/types'
import { getAllBudgetLimits, getExpensesByMonth } from '@/lib/queries'
import { CATEGORIES } from '@/lib/categories'
import BudgetCard from '@/components/budgets/BudgetCard'
import AuthGuard from '@/components/auth/AuthGuard'

export default function BudgetsPage() {
  const now = new Date()
  const [limits, setLimits] = useState<BudgetLimit[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [limitsData, expensesData] = await Promise.all([
        getAllBudgetLimits(),
        getExpensesByMonth(now.getFullYear(), now.getMonth() + 1),
      ])
      setLimits(limitsData)
      setExpenses(expensesData)
    } catch {
      setError('Failed to load data.')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchData() }, [fetchData])

  function getSpent(category: string): number {
    return expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0)
  }

  function getLimit(category: string): number | null {
    return limits.find(l => l.category === category)?.monthly_limit ?? null
  }

  return (
    <AuthGuard>
    <div className="p-5 pb-24">
      <h1 className="text-2xl font-bold text-white mb-1">Budgets</h1>
      <p className="text-sm text-gray-500 mb-5">Monthly limits for {now.toLocaleString('en', { month: 'long' })}</p>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-400 py-12">Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.keys(CATEGORIES).map(cat => (
            <BudgetCard
              key={cat}
              category={cat}
              limit={getLimit(cat)}
              spent={getSpent(cat)}
              onSaved={fetchData}
            />
          ))}
        </div>
      )}
    </div>
    </AuthGuard>
  )
}
