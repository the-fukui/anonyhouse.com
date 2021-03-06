export const MAX_TITLE_LENGTH = 60
export const MAX_CAPACITY = 20
export const MAX_TAGS_LENGTH = 5
export const TAG_ITEMS = [
  { slug: 'japanese', label: 'ζ₯ζ¬θͺ', icon: 'π―π΅', group: 'language' },
  {
    slug: 'basketball',
    label: 'γγΉγ±γγγγΌγ«',
    icon: 'π',
    group: 'sports',
  },
  { slug: 'football', label: 'γ΅γγ«γΌ', icon: 'β½', group: 'sports' },
  { slug: 'baseball', label: 'ιη', icon: 'βΎ', group: 'sports' },
] as const

export const TAG_GROUPS = [
  { slug: 'language', label: 'θ¨θͺ' },
  { slug: 'sports', label: 'γΉγγΌγ' },
] as const
