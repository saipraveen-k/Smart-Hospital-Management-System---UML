import { useDemoStore } from '@/store/demoStore';
import { DemoAppointment } from '@/types';

export const appointmentService = {
  getAll: () => useDemoStore.getState().appointments,
  getById: (id: string) => useDemoStore.getState().appointments.find((a) => a.id === id),
  book: (apt: Omit<DemoAppointment, 'id' | 'tokenNumber' | 'status'>) =>
    useDemoStore.getState().bookAppointment(apt),
  checkIn: (id: string) => useDemoStore.getState().checkInAppointment(id),
  updateStatus: (id: string, status: DemoAppointment['status']) =>
    useDemoStore.getState().updateAppointmentStatus(id, status),
  getByPatient: (patientId: string) =>
    useDemoStore.getState().appointments.filter((a) => a.patientId === patientId)
};
