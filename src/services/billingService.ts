import { useDemoStore } from '@/store/demoStore';

export const billingService = {
  getBills: () => useDemoStore.getState().bills,
  getPayments: () => useDemoStore.getState().payments,
  processPayment: (billId: string, amount: number, method: 'Cash' | 'Card' | 'UPI') =>
    useDemoStore.getState().processPayment(billId, amount, method)
};
