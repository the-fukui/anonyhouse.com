export const MAX_CAPACITY = 20

export const TAG_ITEMS = [
  { slug: 'japanese', label: '日本語🇯🇵', group: 'language' },
  { slug: 'basketball', label: 'バスケットボール🏀', group: 'sports' },
  { slug: 'football', label: 'サッカー⚽', group: 'sports' },
  { slug: 'baseball', label: '野球⚾', group: 'sports' },
] as const

export const TAG_GROUPS = [
  { slug: 'language', label: '言語' },
  { slug: 'sports', label: 'スポーツ' },
] as const
