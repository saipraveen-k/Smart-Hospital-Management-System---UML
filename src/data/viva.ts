import { VivaQuestion } from '@/types';

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    category: 'OOAD Concepts',
    question: 'What is Object-Oriented Analysis and Design (OOAD)?',
    answer: 'Object-Oriented Analysis and Design (OOAD) is a software engineering methodology that models a system as a group of interacting objects, combining structural analysis (domain entities, classes) with behavioral design (use cases, sequence interactions, state machines).'
  },
  {
    id: 2,
    category: 'OOAD Concepts',
    question: 'What is the main difference between OOA and OOD?',
    answer: 'Object-Oriented Analysis (OOA) focuses on what the system should do by identifying real-world domain concepts without implementation details. Object-Oriented Design (OOD) focuses on how the system fulfills requirements by defining software classes, interfaces, method signatures, and data structures.'
  },
  {
    id: 3,
    category: 'OOAD Concepts',
    question: 'Define an Object and a Class with an SHMS example.',
    answer: 'A Class is a blueprint defining structure and behavior (e.g. Patient template). An Object is a specific runtime instance of a class with concrete state (e.g. patient_1001 with UHID="P-1001").'
  },
  {
    id: 4,
    category: 'OOAD Concepts',
    question: 'What is Encapsulation and how is it achieved in UML?',
    answer: 'Encapsulation is the practice of bundling data attributes and operations inside a class while hiding internal state using private visibility (-). In SHMS, Patient attributes (-patientId, -phone) are accessible only through public methods (+updateProfile()).'
  },
  {
    id: 5,
    category: 'OOAD Concepts',
    question: 'What is Abstraction with an SHMS example?',
    answer: 'Abstraction exposes essential functional characteristics while hiding underlying execution complexity. For example, the PaymentProcessor interface exposes processPayment() without revealing credit card encryption or banking API handshakes.'
  },
  {
    id: 6,
    category: 'OOAD Concepts',
    question: 'Differentiate between Inheritance and Polymorphism.',
    answer: 'Inheritance is a structural mechanism where a child subclass derives fields and methods from a parent superclass (e.g. Doctor extends User). Polymorphism allows different child objects to execute different implementations of the same parent method signature.'
  },
  {
    id: 7,
    category: 'OOAD Concepts',
    question: 'Explain Association with an SHMS example.',
    answer: 'Association represents a structural link between two independent classes. For example, Patient has a 1-to-many association with Appointment (Patient 1 -- 0..* Appointment).'
  },
  {
    id: 8,
    category: 'OOAD Concepts',
    question: 'Differentiate between Aggregation and Composition.',
    answer: 'Aggregation (White Diamond o--) is a weak "has-a" relationship where child objects exist independently if parent is destroyed (e.g. Department aggregates Doctor). Composition (Black Diamond *--) is a strong "part-whole" ownership where child lifecycle depends on parent (e.g. Hospital compositionally owns Department, MedicalRecord owns Consultation).'
  },
  {
    id: 9,
    category: 'OOAD Concepts',
    question: 'What is Dependency in UML?',
    answer: 'Dependency (Dashed Arrow ..>) indicates that a change in one class may affect another class that uses it. For example, ConsultationController depends on NotificationService.'
  },
  {
    id: 10,
    category: 'OOAD Concepts',
    question: 'What is Generalization?',
    answer: 'Generalization is the extraction of common attributes and operations from multiple subclasses into a common superclass taxonomy (e.g. generalizing Doctor, Pharmacist, LabTechnician into User).'
  },
  {
    id: 11,
    category: 'UML Diagrams',
    question: 'What is UML and how are diagrams classified?',
    answer: 'Unified Modeling Language (UML) is a standardized visual modeling language. UML 2.5 diagrams are divided into Structural Diagrams (Class, Package, Component, Deployment), Behavioral Diagrams (Use Case, Activity, State Machine), and Interaction Diagrams (Sequence, Communication).'
  },
  {
    id: 12,
    category: 'UML Diagrams',
    question: 'What is a Use Case?',
    answer: 'A Use Case describes a sequence of actions conducted by an actor interacting with the system to achieve a specific observable goal (e.g. UC-03 Book Appointment).'
  },
  {
    id: 13,
    category: 'UML Diagrams',
    question: 'Explain <<include>> and <<extend>> relationships in Use Case diagrams.',
    answer: '<<include>> indicates a mandatory sub-process that is always executed (e.g. Book Appointment includes Check Doctor Availability). <<extend>> indicates an optional flow executing under specific conditions (e.g. Request Lab Test extends Consultation).'
  },
  {
    id: 14,
    category: 'UML Diagrams',
    question: 'What is a Primary Actor vs Supporting Actor?',
    answer: 'A Primary Actor initiates a use case to achieve a goal (e.g. Patient, Doctor). A Supporting Actor provides a service to the system (e.g. PaymentGatewayAdapter).'
  },
  {
    id: 15,
    category: 'UML Diagrams',
    question: 'What is a System Sequence Diagram (SSD)?',
    answer: 'An SSD treats the entire system as a black box and shows message interactions strictly between external Actors and the System boundary.'
  },
  {
    id: 16,
    category: 'Architecture',
    question: 'What is the BCE architectural pattern?',
    answer: 'Boundary-Control-Entity (BCE) partitions classes into 3 layers: Boundary (UI screens & adapters), Control (business logic & workflow controllers), and Entity (persistent domain state models).'
  },
  {
    id: 17,
    category: 'SHMS Domain',
    question: 'Give SHMS examples of Entity, Boundary, and Control classes.',
    answer: 'Entity: Patient, Appointment, Prescription, Bill. Boundary: PatientRegistrationUI, BillingUI. Control: PatientRegistrationController, BillingController.'
  },
  {
    id: 18,
    category: 'UML Diagrams',
    question: 'What do alt and opt frames represent in Sequence Diagrams?',
    answer: 'alt (Alternative) represents conditional branching (if-else logic, e.g. Payment Success vs Declined). opt (Optional) represents an optional execution block (e.g. Ordering optional Lab Tests during consultation).'
  },
  {
    id: 19,
    category: 'UML Diagrams',
    question: 'Differentiate between Sequence Diagram and Communication Diagram.',
    answer: 'Sequence Diagrams emphasize strict time-ordering of messages along vertical lifelines. Communication Diagrams emphasize structural relationships between collaborating objects using numbered message labels (1:, 1.1:).'
  },
  {
    id: 20,
    category: 'UML Diagrams',
    question: 'What is a Design Class Diagram (DCD)?',
    answer: 'A DCD maps conceptual entities into software design classes complete with data types, visibilities (+, -, #), method signatures, return types, interfaces, and dependencies.'
  },
  {
    id: 21,
    category: 'UML Diagrams',
    question: 'What do the symbols +, -, #, ~ signify in UML Class Diagrams?',
    answer: '+: Public access. -: Private access. #: Protected access. ~: Package/default access.'
  },
  {
    id: 22,
    category: 'Design Patterns',
    question: 'What is Dependency Inversion Principle (DIP)?',
    answer: 'High-level modules should not depend on low-level concrete modules; both should depend on abstractions/interfaces. In SHMS, BillingController depends on PaymentProcessor interface rather than concrete card APIs.'
  },
  {
    id: 23,
    category: 'UML Diagrams',
    question: 'What is an Activity Diagram and what is a Swimlane?',
    answer: 'An Activity Diagram shows procedural flow of control, decisions, and parallel paths. Swimlanes partition activity nodes by responsible actors or organizational roles (Patient, Doctor, Pharmacist).'
  },
  {
    id: 24,
    category: 'UML Diagrams',
    question: 'What is a State Machine Diagram?',
    answer: 'A behavioral diagram modeling the finite states, events, and transitions an entity undergoes during its lifecycle (e.g. Appointment states: Requested -> Confirmed -> CheckedIn -> InConsultation -> Completed).'
  },
  {
    id: 25,
    category: 'SHMS Domain',
    question: 'What states does an SHMS Appointment undergo?',
    answer: 'Requested -> Confirmed -> CheckedIn -> InConsultation -> Completed (or Cancelled / NoShow).'
  },
  {
    id: 26,
    category: 'SHMS Domain',
    question: 'What states does an SHMS LabTestOrder undergo?',
    answer: 'Requested -> SamplePending -> SampleCollected -> Processing -> ResultEntered -> Approved -> Reported.'
  },
  {
    id: 27,
    category: 'SHMS Domain',
    question: 'What states does an SHMS Admission undergo?',
    answer: 'Requested -> Admitted -> BedAllocated -> UnderTreatment -> DischargeInitiated -> Discharged.'
  },
  {
    id: 28,
    category: 'SHMS Domain',
    question: 'What states does an SHMS Payment undergo?',
    answer: 'Pending -> Processing -> Paid (or Failed / Refunded).'
  },
  {
    id: 29,
    category: 'SHMS Domain',
    question: 'What states does an SHMS Prescription undergo?',
    answer: 'Created -> Verified -> PartiallyDispensed -> Dispensed (or Cancelled).'
  },
  {
    id: 30,
    category: 'UML Diagrams',
    question: 'What is Multiplicity in UML?',
    answer: 'Multiplicity specifies the allowable range of instances linked between two classes (e.g. 1 to 0..*, 1 to 1).'
  },
  {
    id: 31,
    category: 'Architecture',
    question: 'What is a Traceability Matrix (RTM)?',
    answer: 'A matrix ensuring that every functional requirement maps forward to a Use Case, Domain Class, Sequence Diagram, Design Class, and Activity/State model, proving zero missing requirements.'
  },
  {
    id: 32,
    category: 'SHMS Domain',
    question: 'How does SHMS handle Role-Based Access Control (RBAC)?',
    answer: 'SecurityController intercepts requests, checking the user\'s assigned Role permissions before allowing access to Boundary screens or execution of Control methods.'
  },
  {
    id: 33,
    category: 'SHMS Domain',
    question: 'How does SHMS maintain inventory synchronization?',
    answer: 'When PharmacyController dispenses medication, it synchronously decrements stockQuantity in InventoryItem and checks against reorderLevel to trigger LowStockAlert (BR-05).'
  },
  {
    id: 34,
    category: 'OOAD Concepts',
    question: 'Why is MedicalRecord compositionally owned by Patient?',
    answer: 'Because a medical record has strong lifecycle dependence on the patient; if a patient profile is deleted or archived, its health history container is permanently bound to that patient.'
  },
  {
    id: 35,
    category: 'SHMS Domain',
    question: 'What business rule prevents premature inpatient discharge?',
    answer: 'BR-07 Payment Clearance for Discharge requires that the consolidated Bill status associated with an Admission must be Paid before the system permits discharge completion and bed release.'
  },
  {
    id: 36,
    category: 'Design Patterns',
    question: 'How are external payment gateways integrated into SHMS?',
    answer: 'Via PaymentGatewayAdapter implementing PaymentProcessor, allowing third-party API processing without coupling core BillingController logic.'
  },
  {
    id: 37,
    category: 'SHMS Domain',
    question: 'What is the purpose of AuditLog in SHMS?',
    answer: 'To record an unalterable append-only audit trail capturing user ID, timestamp, IP address, and mutated record ID for all critical clinical and financial transactions (BR-08).'
  },
  {
    id: 38,
    category: 'SHMS Domain',
    question: 'How does SHMS handle walk-in patients vs online booked appointments?',
    answer: 'Walk-in patients are registered at reception (UC-11) and immediately booked into the next available doctor slot (UC-03), proceeding directly to check-in (UC-14) and token generation (UC-15). Online patients skip registration desk and check in directly upon arrival.'
  },
  {
    id: 39,
    category: 'Design Patterns',
    question: 'What is the Strategy Pattern and how is it used in SHMS?',
    answer: 'The Strategy Pattern defines a family of algorithms, encapsulating each one, and making them interchangeable. SHMS uses Strategy for PaymentProcessor (Card vs UPI) and NotificationService (SMS vs Email).'
  },
  {
    id: 40,
    category: 'Architecture',
    question: 'What is Component Architecture in UML?',
    answer: 'A Component Diagram shows the physical or logical software components (subsystems, modules, databases) and their dependencies and provided interfaces.'
  },
  {
    id: 41,
    category: 'Architecture',
    question: 'What is Deployment Architecture in UML?',
    answer: 'A Deployment Diagram models the execution architecture of system software nodes, physical hardware devices, network topologies, and communication protocols.'
  },
  {
    id: 42,
    category: 'OOAD Concepts',
    question: 'What is the difference between a Interface and an Abstract Class?',
    answer: 'An Interface specifies a pure contract of method signatures without any method bodies. An Abstract Class can contain concrete method implementations alongside abstract methods and fields.'
  },
  {
    id: 43,
    category: 'UML Diagrams',
    question: 'What is a Decision Node vs Merge Node in Activity Diagrams?',
    answer: 'A Decision Node (Diamond) branches 1 incoming flow into multiple guarded outgoing paths. A Merge Node recombines multiple incoming paths into 1 single flow.'
  },
  {
    id: 44,
    category: 'SHMS Domain',
    question: 'Explain the bed allocation workflow during inpatient admission.',
    answer: 'Doctor issues admission order -> Receptionist creates Admission entity -> System displays available beds in requested Ward -> Receptionist assigns Bed B-102 -> System marks Bed status Occupied.'
  },
  {
    id: 45,
    category: 'SHMS Domain',
    question: 'What information is contained on an electronic prescription in SHMS?',
    answer: 'Prescription ID, Doctor ID, Patient UHID, Date, List of Medicines (Name, Dosage, Frequency, Duration, Qty), and special dietary/intake instructions.'
  },
  {
    id: 46,
    category: 'SHMS Domain',
    question: 'What is the role of the Pharmacist in SHMS?',
    answer: 'The Pharmacist retrieves electronic prescriptions by Patient UHID, verifies dosage parameters, dispenses medicines, updates inventory stock, and generates bill items.'
  },
  {
    id: 47,
    category: 'SHMS Domain',
    question: 'What laboratory test order statuses exist in SHMS?',
    answer: 'Requested -> Sample Collected -> Processing -> Result Entered -> Approved -> Reported.'
  },
  {
    id: 48,
    category: 'Architecture',
    question: 'What security measures are implemented for SHMS data?',
    answer: 'Role-Based Access Control (RBAC), AES-256 encryption at rest, TLS 1.3 encryption in transit, bcrypt password hashing, and unalterable append-only audit logging.'
  },
  {
    id: 49,
    category: 'UML Diagrams',
    question: 'How are Package Diagrams used in SHMS?',
    answer: 'Package Diagrams organize system use cases and classes into 8 logical subsystems: Patient Management, Appointment & OP, Clinical, Laboratory, Pharmacy, Inpatient, Billing, and Security & Admin.'
  },
  {
    id: 50,
    category: 'SHMS Domain',
    question: 'What is the primary objective of the SHMS UML laboratory project?',
    answer: 'To demonstrate a comprehensive, end-to-end Object-Oriented Analysis and Design (OOAD) model transforming requirements into use cases, domain models, sequence interactions, design classes, behavioral activity models, and component/deployment architecture.'
  }
];
