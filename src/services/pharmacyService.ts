import { useDemoStore } from '@/store/demoStore';
import { DemoPrescription } from '@/types';

export const pharmacyService = {
  getPrescriptions: () => useDemoStore.getState().prescriptions,
  getMedicines: () => useDemoStore.getState().medicines,
  createPrescription: (rx: Omit<DemoPrescription, 'id' | 'date' | 'status'>) =>
    useDemoStore.getState().addPrescription(rx),
  dispense: (id: string) => useDemoStore.getState().dispensePrescription(id)
};
