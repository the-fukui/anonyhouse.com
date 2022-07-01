import { NotificationProps, showNotification } from '@mantine/notifications'

/**
 * Notification内容を一元管理する
 */

const NOTIFICATION_LIST = {
  onCreateThreadFailed: {
    title: 'スレッドを作成できませんでした',
    message: 'しばらくしてからお試しください',
    color: 'red',
    radius: 'sm',
    autoClose: 5000,
  } as NotificationProps,
} as const

export const notify = (type: keyof typeof NOTIFICATION_LIST) =>
  showNotification(NOTIFICATION_LIST[type])
