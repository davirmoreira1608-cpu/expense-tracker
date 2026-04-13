'use client'

import { getCategoryLabel } from '@/lib/categories'
import ProgressBar from '@/components/ui/ProgressBar'
import BudgetForm from './BudgetForm'

interface BudgetCardProps {
  category: string
  limit: number | null
  spent: number
  onSaved: () => void
}

export default function BudgetCard({ category, limit, spent, onSaved }: BudgetCardProps) {
  const overBudget = limit !== null && spent > limit

  return (
    <div className="bg-gray-950 rounded-2xl border border-gray-800 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-yellow-400">{getCategoryLabel(category)}</span>
        {limit !== null && (
          <span className={`text-sm font-medium ${overBudget ? 'text-red-400' : 'text-green-400'}`}>
            R$ {spent.toFixed(2)} / {limit.toFixed(2)}
          </span>
        )}
      </div>

      {limit !== null ? (
        <ProgressBar spent={spent} limit={limit} />
      ) : (
        <p className="text-xs text-gray-600">No limit set</p>
      )}

      <BudgetForm category={category} currentLimit={limit} onSaved={onSaved} />
    </div>
  )
}
