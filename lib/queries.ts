import { supabase } from './supabase'
import { Expense, BudgetLimit, Income } from '@/types'

export async function getExpensesByMonth(year: number, month: number): Promise<Expense[]> {
  const start = `${year}-${String(month).padStart(2, '0')}-01`
  const end = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .gte('date', start)
    .lt('date', end)
    .order('date', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function insertExpense(expense: {
  amount: number
  category: string
  subcategory: string
  date: string
  note?: string
}): Promise<void> {
  const { error } = await supabase.from('expenses').insert(expense)
  if (error) throw error
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from('expenses').delete().eq('id', id)
  if (error) throw error
}

export async function getAllBudgetLimits(): Promise<BudgetLimit[]> {
  const { data, error } = await supabase.from('budget_limits').select('*')
  if (error) throw error
  return data ?? []
}

export async function upsertBudgetLimit(category: string, monthly_limit: number): Promise<void> {
  const { error } = await supabase
    .from('budget_limits')
    .upsert(
      { category, monthly_limit, updated_at: new Date().toISOString() },
      { onConflict: 'category' }
    )
  if (error) throw error
}

export async function getIncomeByMonth(year: number, month: number): Promise<Income[]> {
  const start = `${year}-${String(month).padStart(2, '0')}-01`
  const end = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`

  const { data, error } = await supabase
    .from('income')
    .select('*')
    .gte('date', start)
    .lt('date', end)
    .order('date', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function insertIncome(income: {
  amount: number
  category: string
  date: string
  note?: string
}): Promise<void> {
  const { error } = await supabase.from('income').insert(income)
  if (error) throw error
}

export async function deleteIncome(id: string): Promise<void> {
  const { error } = await supabase.from('income').delete().eq('id', id)
  if (error) throw error
}
