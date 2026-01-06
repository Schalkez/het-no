// Avatar color palette for consistent member identification
export const AVATAR_COLORS = [
  'bg-red-100 text-red-700',
  'bg-orange-100 text-orange-700',
  'bg-amber-100 text-amber-700',
  'bg-lime-100 text-lime-700',
  'bg-green-100 text-green-700',
  'bg-emerald-100 text-emerald-700',
  'bg-teal-100 text-teal-700',
  'bg-cyan-100 text-cyan-700',
  'bg-sky-100 text-sky-700',
  'bg-blue-100 text-blue-700',
  'bg-indigo-100 text-indigo-700',
  'bg-violet-100 text-violet-700',
  'bg-purple-100 text-purple-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-pink-100 text-pink-700',
  'bg-rose-100 text-rose-700',
]

/**
 * Get an avatar color for a person based on their index
 * Colors cycle if there are more people than colors
 */
export const getAvatarColor = (index: number): string => {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]!
}

/**
 * Get the next available color based on existing people count
 */
export const getNextAvatarColor = (currentPeopleCount: number): string => {
  return getAvatarColor(currentPeopleCount)
}
