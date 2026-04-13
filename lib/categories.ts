export const CATEGORIES = {
  food: {
    label: 'Food',
    subcategories: {
      groceries: 'Groceries',
      restaurants: 'Restaurants',
      delivery: 'Delivery',
      coffee_snacks: 'Coffee & Snacks',
    },
  },
  transport: {
    label: 'Transport',
    subcategories: {
      public_transit: 'Public Transit',
      uber: 'Uber',
    },
  },
  entertainment: {
    label: 'Entertainment',
    subcategories: {
      streaming: 'Streaming',
      events: 'Events',
      hobbies: 'Hobbies',
      games: 'Games',
    },
  },
  personal: {
    label: 'Personal',
    subcategories: {
      clothing: 'Clothing',
      personal_care: 'Personal Care',
      gifts: 'Gifts',
    },
  },
  education: {
    label: 'Education',
    subcategories: {
      courses: 'Courses',
      books: 'Books',
      tools_software: 'Tools & Software',
    },
  },
} as const

export type CategoryKey = keyof typeof CATEGORIES

export function getCategoryLabel(category: string): string {
  return CATEGORIES[category as CategoryKey]?.label ?? category
}

export function getSubcategoryLabel(category: string, subcategory: string): string {
  const cat = CATEGORIES[category as CategoryKey]
  if (!cat) return subcategory
  return (cat.subcategories as Record<string, string>)[subcategory] ?? subcategory
}
