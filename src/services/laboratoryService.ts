import { useDemoStore } from '@/store/demoStore';
import { DemoLabOrder } from '@/types';

export const laboratoryService = {
  getAll: () => useDemoStore.getState().labOrders,
  getById: (id: string) => useDemoStore.getState().labOrders.find((o) => o.id === id),
  create: (order: Omit<DemoLabOrder, 'id' | 'orderDate' | 'status'>) =>
    useDemoStore.getState().addLabOrder(order),
  updateStatus: (id: string, status: DemoLabOrder['status'], result?: string, notes?: string) =>
    useDemoStore.getState().updateLabOrderStatus(id, status, result, notes)
};
