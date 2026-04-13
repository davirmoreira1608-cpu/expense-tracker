export const INCOME_CATEGORIES: Record<string, string> = {
  salary: 'Salary',
  sales: 'Sales',
  freelance: 'Freelance',
  other: 'Other',
}

export function getIncomeCategoryLabel(category: string): string {
  return INCOME_CATEGORIES[category] ?? category
}
