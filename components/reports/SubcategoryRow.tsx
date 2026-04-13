import { getSubcategoryLabel } from '@/lib/categories'

interface SubcategoryRowProps {
  category: string
  subcategory: string
  total: number
}

export default function SubcategoryRow({ category, subcategory, total }: SubcategoryRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
      <span className="text-sm text-gray-400">{getSubcategoryLabel(category, subcategory)}</span>
      <span className="text-sm font-medium text-white">R$ {total.toFixed(2)}</span>
    </div>
  )
}
