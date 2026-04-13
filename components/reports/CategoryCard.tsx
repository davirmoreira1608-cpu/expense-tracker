import { Expense } from '@/types'
import { getCategoryLabel } from '@/lib/categories'
import SubcategoryRow from './SubcategoryRow'

interface CategoryCardProps {
  category: string
  expenses: Expense[]
}

export default function CategoryCard({ category, expenses }: CategoryCardProps) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const bySubcategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.subcategory] = (acc[e.subcategory] ?? 0) + e.amount
    return acc
  }, {})

  return (
    <div className="bg-gray-950 rounded-2xl border border-gray-800 p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-yellow-400">{getCategoryLabel(category)}</span>
        <span className="font-bold text-green-400">R$ {total.toFixed(2)}</span>
      </div>
      {Object.entries(bySubcategory).map(([sub, subTotal]) => (
        <SubcategoryRow key={sub} category={category} subcategory={sub} total={subTotal} />
      ))}
    </div>
  )
}
