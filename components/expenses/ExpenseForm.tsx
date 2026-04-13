'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, CategoryKey } from '@/lib/categories'
import { insertExpense } from '@/lib/queries'

export default function ExpenseForm() {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]

  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<CategoryKey>('food')
  const [subcategory, setSubcategory] = useState('groceries')
  const [date, setDate] = useState(today)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleCategoryChange(cat: CategoryKey) {
    setCategory(cat)
    const firstSub = Object.keys(CATEGORIES[cat].subcategories)[0]
    setSubcategory(firstSub)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = parseFloat(amount)
    if (!parsed || parsed <= 0) {
      setError('Enter a valid amount greater than 0')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await insertExpense({ amount: parsed, category, subcategory, date, note: note || undefined })
      router.push('/dashboard')
    } catch {
      setError('Failed to save expense. Try again.')
      setLoading(false)
    }
  }

  const inputClass = "bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
  const labelClass = "text-sm font-medium text-gray-400"
  const subcategories = CATEGORIES[category].subcategories

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Amount (R$)</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          className={`${inputClass} text-lg text-green-400 placeholder-gray-700`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Category</label>
        <select
          value={category}
          onChange={e => handleCategoryChange(e.target.value as CategoryKey)}
          className={inputClass}
        >
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Subcategory</label>
        <select
          value={subcategory}
          onChange={e => setSubcategory(e.target.value)}
          className={inputClass}
        >
          {Object.entries(subcategories).map(([key, label]) => (
            <option key={key} value={key}>{label as string}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Note (optional)</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g. lunch with friends"
          rows={2}
          className={`${inputClass} resize-none placeholder-gray-700`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-black rounded-xl py-4 text-base font-bold hover:bg-yellow-300 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving...' : 'Save Expense'}
      </button>
    </form>
  )
}
