import IncomeForm from '@/components/income/IncomeForm'
import AuthGuard from '@/components/auth/AuthGuard'

export default function AddIncomePage() {
  return (
    <AuthGuard>
      <div className="p-5 pb-24">
        <h1 className="text-2xl font-bold text-white mb-6">Add Income</h1>
        <IncomeForm />
      </div>
    </AuthGuard>
  )
}
