'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth'

const links = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/add', label: 'Expense', icon: '➖' },
  { href: '/income', label: 'Income', icon: '➕' },
  { href: '/reports', label: 'Reports', icon: '📊' },
  { href: '/budgets', label: 'Budgets', icon: '🎯' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const isAuthPage = pathname === '/login' || pathname === '/signup'
  if (isAuthPage) return null

  async function handleSignOut() {
    await signOut()
    router.replace('/login')
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 z-50">
      <div className="flex justify-around items-center h-16">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 text-xs ${active ? 'text-yellow-400' : 'text-gray-500'}`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          )
        })}
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center gap-0.5 py-2 px-3 text-xs text-gray-500 hover:text-red-400"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  )
}
