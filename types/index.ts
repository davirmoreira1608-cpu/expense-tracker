export interface Expense {
  id: string
  amount: number
  category: string
  subcategory: string
  date: string
  note: string | null
  created_at: string
}

export interface BudgetLimit {
  id: string
  category: string
  monthly_limit: number | null
  updated_at: string
}

export interface Income {
  id: string
  amount: number
  category: string
  date: string
  note: string | null
  created_at: string
}

export interface MonthYear {
  year: number
  month: number
}
