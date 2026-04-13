'use client'

import { MonthYear } from '@/types'

interface MonthPickerProps {
  value: MonthYear
  onChange: (v: MonthYear) => void
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function MonthPicker({ value, onChange }: MonthPickerProps) {
  function prev() {
    if (value.month === 1) onChange({ year: value.year - 1, month: 12 })
    else onChange({ year: value.year, month: value.month - 1 })
  }

  function next() {
    if (value.month === 12) onChange({ year: value.year + 1, month: 1 })
    else onChange({ year: value.year, month: value.month + 1 })
  }

  return (
    <div className="flex items-center gap-4">
      <button onClick={prev} className="p-2 rounded-full hover:bg-gray-800 text-yellow-400 text-lg">‹</button>
      <span className="font-semibold text-white min-w-[140px] text-center">
        {MONTHS[value.month - 1]} {value.year}
      </span>
      <button onClick={next} className="p-2 rounded-full hover:bg-gray-800 text-yellow-400 text-lg">›</button>
    </div>
  )
}
