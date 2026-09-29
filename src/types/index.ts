export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type ModuleId =
  | 'patient-registration'
  | 'appointment-op'
  | 'ip-management'
  | 'laboratory'
  | 'pharmacy-inventory'
  | 'billing-payment'
  | 'reports-analytics'
  | 'security-admin';

export interface Actor {
  id: string;
  name: string;
  type: 'PRIMARY' | 'SUPPORTING' | 'MANAGERIAL';
  description: string;
  responsibilities: string[];
  modules: ModuleId[];
  useCases: string[];
  requirements: string[];
  diagrams: string[];
}

export interface SystemModule {
  id: ModuleId;
  name: string;
  code: string;
  description: string;
  icon: string;
  responsibilities: string[];
  actors: string[];
  requirements: string[];
  useCases: string[];
  diagrams: string[];
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  actor: string;
  module: ModuleId;
  priority: Priority;
  relatedUseCases: string[];
  relatedClasses: string[];
  relatedDiagrams: string[];
  type: 'FUNCTIONAL' | 'NON_FUNCTIONAL';
  category?: string;
}

export interface UseCase {
  id: string;
  name: string;
  goal: string;
  primaryActor: string;
  supportingActors: string[];
  package: string;
  module: ModuleId;
  preconditions: string[];
  postconditions: string[];
  mainFlow: { step: number; action: string }[];
  alternativeFlows: { name: string; condition: string; action: string }[];
  relatedRequirements: string[];
  relatedClasses: string[];
  relatedDiagrams: string[];
}

export interface DomainClass {
  name: string;
  purpose: string;
  attributes: { name: string; type: string; description: string }[];
  relationships: { target: string; type: string; multiplicity: string; description: string }[];
  multiplicity: string;
  constraints: string[];
  relatedRequirements: string[];
  relatedUseCases: string[];
  relatedSequenceDiagrams: string[];
}

export interface DesignClass {
  name: string;
  layer: 'Boundary' | 'Control' | 'Entity' | 'Interface';
  package: string;
  purpose: string;
  attributes: { visibility: '+' | '-' | '#'; name: string; type: string }[];
  methods: { visibility: '+' | '-' | '#'; name: string; parameters: string; returnType: string }[];
  interfaces: string[];
  dependencies: string[];
  relationships: { target: string; type: string }[];
  relatedRequirements: string[];
  relatedUseCases: string[];
}

export interface Diagram {
  id: string;
  title: string;
  experimentId: string;
  type: 'Class' | 'Use Case' | 'Sequence' | 'Communication' | 'Activity' | 'State Machine' | 'Package' | 'Architecture' | 'Component' | 'Deployment';
  filePath: string;
  purpose: string;
  starUmlAvailable: boolean;
  mermaidAvailable: boolean;
  relatedRequirements: string[];
  relatedUseCases: string[];
  relatedClasses: string[];
  mermaidCode: string;
}

export interface Experiment {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  aim: string;
  objectives: string[];
  theory: string;
  activities: string[];
  procedure: string[];
  diagramIds: string[];
  result: string;
  conclusion: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  type: 'Frontend' | 'Core Subsystem' | 'Infrastructure' | 'Database' | 'External Gateway';
  purpose: string;
  responsibilities: string[];
  providedInterfaces: string[];
  dependencies: string[];
  relatedModules: ModuleId[];
  relatedClasses: string[];
  relatedRequirements: string[];
}

export interface DeploymentNode {
  id: string;
  name: string;
  nodeType: 'Client Device' | 'Workstation' | 'Network' | 'Server' | 'External Service';
  purpose: string;
  hostedComponents: string[];
  communication: string;
  security: string[];
}

export interface TraceabilityItem {
  reqId: string;
  title: string;
  useCases: string[];
  domainClasses: string[];
  ssds: string[];
  dsds: string[];
  designClasses: string[];
  activityState: string[];
}

export interface VivaQuestion {
  id: number;
  category: 'OOAD Concepts' | 'UML Diagrams' | 'SHMS Domain' | 'Design Patterns' | 'Architecture';
  question: string;
  answer: string;
}

// Demo Store Types
export type UserRole = 'Patient' | 'Receptionist' | 'Doctor' | 'Pharmacist' | 'Lab Technician' | 'Cashier' | 'Admin';

export interface DemoPatient {
  id: string;
  uhid: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  bloodGroup: string;
  registeredDate: string;
  department: string;
}

export interface DemoAppointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'Confirmed' | 'Checked In' | 'In Consultation' | 'Completed' | 'Cancelled';
  tokenNumber: number;
  symptoms?: string;
  notes?: string;
}

export interface DemoDoctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  experience: string;
  room: string;
  availableDays: string[];
  status: 'Available' | 'In Consultation' | 'On Leave';
}

export interface DemoLabOrder {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  testName: string;
  orderDate: string;
  status: 'Requested' | 'Sample Collected' | 'Processing' | 'Result Entered' | 'Approved';
  result?: string;
  referenceRange?: string;
  notes?: string;
}

export interface DemoPrescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medicines: { medicineName: string; dosage: string; frequency: string; duration: string; qty: number }[];
  status: 'Created' | 'Verified' | 'Dispensed';
  instructions?: string;
}

export interface DemoMedicine {
  id: string;
  name: string;
  category: string;
  stock: number;
  unitPrice: number;
  reorderLevel: number;
  expiryDate: string;
  dosageForm: string;
}

export interface DemoAdmission {
  id: string;
  patientId: string;
  patientName: string;
  ward: string;
  bedNumber: string;
  admittedDate: string;
  dischargedDate?: string;
  attendingDoctor: string;
  diagnosis: string;
  status: 'Admitted' | 'Bed Allocated' | 'Under Treatment' | 'Discharge Initiated' | 'Discharged';
}

export interface DemoBill {
  id: string;
  patientId: string;
  patientName: string;
  billDate: string;
  items: { description: string; amount: number; category: 'Consultation' | 'Laboratory' | 'Pharmacy' | 'Inpatient' }[];
  totalAmount: number;
  discount: number;
  netAmount: number;
  paidAmount: number;
  status: 'Pending' | 'Partially Paid' | 'Paid';
}

export interface DemoPayment {
  id: string;
  billId: string;
  patientId: string;
  patientName: string;
  amount: number;
  paymentMethod: 'Cash' | 'Card' | 'UPI';
  transactionId: string;
  paymentDate: string;
  status: 'Success' | 'Failed';
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface DemoAuditLog {
  id: string;
  timestamp: string;
  userRole: UserRole;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
}
