import { TAG_ITEMS } from '@shared/constants/thread'

export class ThreadTagModel {
  slug: typeof TAG_ITEMS[number]['slug']
  label: typeof TAG_ITEMS[number]['label']
  icon: typeof TAG_ITEMS[number]['icon']
  group: typeof TAG_ITEMS[number]['group']
}
