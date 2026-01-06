/**
 * Person color palette - consistent colors for each person across the app
 * Colors are assigned based on person's index in the people array
 */

export interface PersonColorStyle {
  bg: string
  border: string
  iconBg: string
  text: string
  iconText: string
}

const PERSON_COLORS: PersonColorStyle[] = [
  {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-100 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-800',
    text: 'text-blue-900 dark:text-blue-100',
    iconText: 'text-blue-600 dark:text-blue-200',
  },
  {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-100 dark:border-emerald-800',
    iconBg: 'bg-emerald-100 dark:bg-emerald-800',
    text: 'text-emerald-900 dark:text-emerald-100',
    iconText: 'text-emerald-600 dark:text-emerald-200',
  },
  {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-100 dark:border-purple-800',
    iconBg: 'bg-purple-100 dark:bg-purple-800',
    text: 'text-purple-900 dark:text-purple-100',
    iconText: 'text-purple-600 dark:text-purple-200',
  },
  {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-100 dark:border-orange-800',
    iconBg: 'bg-orange-100 dark:bg-orange-800',
    text: 'text-orange-900 dark:text-orange-100',
    iconText: 'text-orange-600 dark:text-orange-200',
  },
  {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    border: 'border-pink-100 dark:border-pink-800',
    iconBg: 'bg-pink-100 dark:bg-pink-800',
    text: 'text-pink-900 dark:text-pink-100',
    iconText: 'text-pink-600 dark:text-pink-200',
  },
  {
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-100 dark:border-cyan-800',
    iconBg: 'bg-cyan-100 dark:bg-cyan-800',
    text: 'text-cyan-900 dark:text-cyan-100',
    iconText: 'text-cyan-600 dark:text-cyan-200',
  },
  {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-100 dark:border-amber-800',
    iconBg: 'bg-amber-100 dark:bg-amber-800',
    text: 'text-amber-900 dark:text-amber-100',
    iconText: 'text-amber-600 dark:text-amber-200',
  },
  {
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-100 dark:border-rose-800',
    iconBg: 'bg-rose-100 dark:bg-rose-800',
    text: 'text-rose-900 dark:text-rose-100',
    iconText: 'text-rose-600 dark:text-rose-200',
  },
]

/**
 * Get color style for a person based on their index
 * Colors cycle when index exceeds available colors
 */
export function getPersonColor(index: number): PersonColorStyle {
  return PERSON_COLORS[index % PERSON_COLORS.length]!
}

/**
 * Get color for a person by their ID from a people array
 */
export function getPersonColorById(personId: string, people: { id: string }[]): PersonColorStyle {
  const index = people.findIndex((p) => p.id === personId)
  return getPersonColor(index >= 0 ? index : 0)
}
