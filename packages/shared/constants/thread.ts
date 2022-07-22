export const MAX_TITLE_LENGTH = 60
export const MAX_CAPACITY = 20
export const MAX_TAGS_LENGTH = 5
export const TAG_ITEMS = [
  { slug: 'japanese', label: '日本語', icon: '🇯🇵', group: 'language' },
  {
    slug: 'basketball',
    label: 'バスケットボール🏀',
    icon: '🏀',
    group: 'sports',
  },
  { slug: 'football', label: 'サッカー', icon: '⚽', group: 'sports' },
  { slug: 'baseball', label: '野球', icon: '⚾', group: 'sports' },
] as const

export const TAG_GROUPS = [
  { slug: 'language', label: '言語' },
  { slug: 'sports', label: 'スポーツ' },
] as const
