'use client'

import { useState, useEffect, useCallback } from 'react'
import { Expense, MonthYear } from '@/types'
import { getExpensesByMonth, deleteExpense, getIncomeByMonth } from '@/lib/queries'
import MonthPicker from '@/components/ui/MonthPicker'
import ExpenseList from '@/components/expenses/ExpenseList'
import AuthGuard from '@/components/auth/AuthGuard'

export default function DashboardPage() {
  const now = new Date()
  const [month, setMonth] = useState<MonthYear>({ year: now.getFullYear(), month: now.getMonth() + 1 })
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [expensesData, incomeData] = await Promise.all([
        getExpensesByMonth(month.year, month.month),
        getIncomeByMonth(month.year, month.month),
      ])
      setExpenses(expensesData)
      setTotalIncome(incomeData.reduce((sum, i) => sum + i.amount, 0))
    } catch {
      setError('Failed to load data.')
    } finally {
      setLoading(false)
    }
  }, [month])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleDelete(id: string) {
    try {
      await deleteExpense(id)
      setExpenses(prev => prev.filter(e => e.id !== id))
    } catch {
      setError('Failed to delete expense.')
    }
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpenses

  return (
    <AuthGuard>
      <div className="p-5 pb-24">
        <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>

        <div className="flex flex-col items-center mb-5">
          <MonthPicker value={month} onChange={setMonth} />
        </div>

        {!loading && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Income</span>
              <span className="text-sm font-bold text-green-400">R$ {totalIncome.toFixed(2)}</span>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Expenses</span>
              <span className="text-sm font-bold text-red-400">R$ {totalExpenses.toFixed(2)}</span>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Balance</span>
              <span className={`text-sm font-bold ${balance >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                R$ {balance.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {loading ? (
          <p className="text-center text-gray-600 py-12">Loading...</p>
        ) : (
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        )}
      </div>
    </AuthGuard>
  )
}
