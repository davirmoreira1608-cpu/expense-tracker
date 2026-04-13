import ExpenseForm from '@/components/expenses/ExpenseForm'
import AuthGuard from '@/components/auth/AuthGuard'

export default function AddPage() {
  return (
    <AuthGuard>
      <div className="p-5 pb-24">
        <h1 className="text-2xl font-bold text-white mb-6">Add Expense</h1>
        <ExpenseForm />
      </div>
    </AuthGuard>
  )
}
