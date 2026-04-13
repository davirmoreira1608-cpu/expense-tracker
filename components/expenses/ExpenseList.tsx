'use client'

import { Expense } from '@/types'
import { getCategoryLabel, CATEGORIES } from '@/lib/categories'
import ExpenseItem from './ExpenseItem'

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="text-center text-gray-600 py-12">No expenses this month.</p>
  }

  const grouped = Object.keys(CATEGORIES).reduce<Record<string, Expense[]>>((acc, cat) => {
    const items = expenses.filter(e => e.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(([cat, items]) => {
        const total = items.reduce((sum, e) => sum + e.amount, 0)
        return (
          <div key={cat} className="bg-gray-950 rounded-2xl border border-gray-800 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-yellow-400">{getCategoryLabel(cat)}</span>
              <span className="text-sm font-semibold text-green-400">R$ {total.toFixed(2)}</span>
            </div>
            {items.map(e => (
              <ExpenseItem key={e.id} expense={e} onDelete={onDelete} />
            ))}
          </div>
        )
      })}
    </div>
  )
}
