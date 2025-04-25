
export type NotificationStatus = 'unread' | 'read';
export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  createdAt: string;
  link?: string;
}
