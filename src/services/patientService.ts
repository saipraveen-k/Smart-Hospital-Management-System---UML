import { useDemoStore } from '@/store/demoStore';
import { DemoPatient } from '@/types';

export const patientService = {
  getAll: () => useDemoStore.getState().patients,
  getById: (id: string) => useDemoStore.getState().patients.find((p) => p.id === id || p.uhid === id),
  create: (patient: Omit<DemoPatient, 'id' | 'uhid' | 'registeredDate'>) =>
    useDemoStore.getState().addPatient(patient),
  search: (query: string) => {
    const q = query.toLowerCase();
    return useDemoStore
      .getState()
      .patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.uhid.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.department.toLowerCase().includes(q)
      );
  }
};
