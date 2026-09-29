import { useDemoStore } from '@/store/demoStore';

export const notificationService = {
  getAll: () => useDemoStore.getState().notifications,
  markAsRead: (id: string) => useDemoStore.getState().markNotificationRead(id),
  markAllAsRead: () => useDemoStore.getState().markAllNotificationsRead()
};

export const auditService = {
  getAll: () => useDemoStore.getState().auditLogs
};
