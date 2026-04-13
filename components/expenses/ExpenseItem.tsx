'use client'

import { Expense } from '@/types'
import { getSubcategoryLabel } from '@/lib/categories'

interface ExpenseItemProps {
  expense: Expense
  onDelete: (id: string) => void
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const dateLabel = new Date(expense.date + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short',
  })

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">
          {getSubcategoryLabel(expense.category, expense.subcategory)}
        </span>
        {expense.note && <span className="text-xs text-gray-500">{expense.note}</span>}
        <span className="text-xs text-gray-600">{dateLabel}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-green-400">R$ {expense.amount.toFixed(2)}</span>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-gray-700 hover:text-red-400 text-lg leading-none"
          aria-label="Delete"
        >
          ×
        </button>
      </div>
    </div>
  )
}
