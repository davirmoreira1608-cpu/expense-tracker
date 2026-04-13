'use client'

interface ProgressBarProps {
  spent: number
  limit: number
}

export default function ProgressBar({ spent, limit }: ProgressBarProps) {
  const pct = Math.min((spent / limit) * 100, 100)
  const color = pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-yellow-400' : 'bg-green-400'

  return (
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
