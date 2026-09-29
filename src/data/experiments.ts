import { Experiment } from '@/types';

export const EXPERIMENTS: Experiment[] = [
  {
    id: '1',
    number: 1,
    title: 'Experiment 1: OOAD Fundamentals & UML Familiarization',
    subtitle: 'Object-Oriented Analysis & Design Concepts and Modeling Environment Setup',
    aim: 'To study and understand the fundamental principles of Object-Oriented Analysis and Design (OOAD) and familiarize with UML modeling tools.',
    objectives: [
      'Understand core OOAD concepts: Abstraction, Encapsulation, Inheritance, Polymorphism, Association, Aggregation, and Composition.',
      'Explore standard UML diagram classifications (Structural, Behavioral, Interaction).',
      'Model basic domain entities and relationships for the Smart Hospital Management System (SHMS).'
    ],
    theory: `Object-Oriented Analysis and Design (OOAD) is a structured software development methodology that views a system as a set of collaborating software objects. Analysis (OOA) focuses on understanding the problem domain without specifying implementation details, whereas Design (OOD) defines software abstractions, class structures, method signatures, and architectural patterns.

The Unified Modeling Language (UML) is the industry-standard visual modeling notation maintained by the Object Management Group (OMG). In SHMS, foundational classes such as User, Patient, Doctor, Appointment, and Consultation encapsulate state and behavior to achieve modularity and reuse.`,
    activities: [
      'Identification of primary domain entities for Smart Hospital Operations.',
      'Classification of relationships into Association, Aggregation, Composition, and Generalization.',
      'Drafting initial structural class diagrams using Mermaid notation.'
    ],
    procedure: [
      'Inspect problem statement for Smart Hospital Management System.',
      'Identify domain abstractions: Patient, Doctor, Appointment, Department, MedicalRecord.',
      'Define class attributes, operation visibilities (+ public, - private), and multiplicity constraints.',
      'Render visual class diagrams using Mermaid engine.'
    ],
    diagramIds: ['EXP1-CD-01', 'EXP1-CD-02'],
    result: 'Core OOAD concepts were successfully applied to formulate initial structural class diagrams for SHMS domain entities.',
    conclusion: 'Familiarization with OOAD principles and UML modeling tools provides the baseline structural foundation required for subsequent requirement analysis and use case design.'
  },
  {
    id: '2',
    number: 2,
    title: 'Experiment 2: Requirement Engineering & SRS Modeling',
    subtitle: 'Functional & Non-Functional Requirement Elicitation and Business Rules Definition',
    aim: 'To perform systematic requirement engineering for the Smart Hospital Management System, specifying functional requirements, non-functional constraints, and business rules.',
    objectives: [
      'Elicit 30 Functional Requirements (FR-01 to FR-30) covering registration, consultation, lab, pharmacy, billing, and administration.',
      'Define 11 Non-Functional Requirements (NFR-01 to NFR-11) addressing performance, security, availability, and compliance.',
      'Formulate core business rules (BR-01 to BR-08) governing clinical and financial workflows.'
    ],
    theory: `Requirement Engineering is the process of establishing the services required of a system and the constraints under which it operates. Functional Requirements define specific automated behaviors (e.g. UHID generation, appointment booking, prescription creation), while Non-Functional Requirements specify quality attributes (latency < 1.5s, 99.9% uptime, AES-256 encryption).

In SHMS, explicit business rules enforce clinical safety and financial integrity, such as requiring zero outstanding bill balance prior to inpatient discharge completion (BR-07).`,
    activities: [
      'Stakeholder mapping for Patients, Receptionists, Doctors, Pharmacists, Lab Technicians, Cashiers, and Admins.',
      'Categorization of requirements across 8 core functional modules.',
      'Establishment of non-functional metrics adhering to IEEE 830 SRS guidelines.'
    ],
    procedure: [
      'Analyze hospital operational workflows from patient intake to discharge.',
      'Draft IEEE 830 compliant Software Requirement Specification (SRS).',
      'Map requirements into priority matrix (CRITICAL, HIGH, MEDIUM, LOW).',
      'Validate requirements with domain traceability placeholders.'
    ],
    diagramIds: ['EXP3-UC-02'],
    result: 'A total of 30 Functional Requirements, 11 Non-Functional Requirements, and 8 Business Rules were formally documented.',
    conclusion: 'Rigorous requirement engineering ensures complete functional coverage and establishes clear validation targets for design and testing.'
  },
  {
    id: '3',
    number: 3,
    title: 'Experiment 3: Use Case Modeling & Package Architecture',
    subtitle: 'Actor Elicitation, Use Case Diagrams, Detailed Specifications, and Subsystem Partitioning',
    aim: 'To model system functionality from an external actor perspective using UML Use Case Diagrams and detailed specifications.',
    objectives: [
      'Identify 7 system actors (6 Primary/Supporting + 1 Managerial Admin).',
      'Define 35 Use Cases capturing end-to-end clinical and administrative interactions.',
      'Model <<include>> and <<extend>> relationships and organize use cases into 8 architectural packages.'
    ],
    theory: `Use Case Modeling models system behavior by depicting interaction boundaries between external Actors and internal Use Cases. Primary actors initiate goals (e.g. Patient books appointment), while supporting actors assist execution (e.g. PaymentGatewayAdapter).

Relationships include:
- <<include>>: Mandatory sub-process always executed (e.g., Book Appointment includes Check Availability).
- <<extend>>: Optional or conditional flow (e.g., Request Lab Test extends Consultation).`,
    activities: [
      'Elicitation of 35 comprehensive use cases across 8 subsystems.',
      'Creation of Master Use Case Diagram and Package Architecture Diagrams.',
      'Authoring structured specifications detailing main flows, alternative flows, and preconditions.'
    ],
    procedure: [
      'Identify system boundaries and external actors.',
      'Define goals and scenario flows for each use case.',
      'Draw UML Use Case diagrams incorporating inclusion and extension dependencies.',
      'Group use cases into logical subsystem packages.'
    ],
    diagramIds: ['EXP3-UC-01', 'EXP3-UC-02'],
    result: '35 Use Cases were authored with complete step-by-step specifications and structured into 8 subsystem packages.',
    conclusion: 'Use case modeling provides an intuitive, behavioral view of the system that bridges stakeholder requirements with object-oriented design.'
  },
  {
    id: '4',
    number: 4,
    title: 'Experiment 4: Domain Analysis & Concept Modeling',
    subtitle: 'Conceptual Entity Identification, Attribute Definition, and Multiplicity Analysis',
    aim: 'To analyze the problem domain and create a conceptual Domain Model representing real-world entities and their relationships.',
    objectives: [
      'Identify 34 domain entities representing physical, conceptual, and transactional artifacts.',
      'Define attributes, responsibilities, and multiplicity constraints.',
      'Differentiate conceptual domain entities from implementation software classes.'
    ],
    theory: `Domain Analysis inspects the problem domain to identify conceptual entities (e.g., Patient, Doctor, LabTestOrder, Bill) without referring to software implementation constructs like UI widgets or database tables.

The Domain Model serves as a visual dictionary of domain terms and structural associations, providing the conceptual foundation for detailed object design in later stages.`,
    activities: [
      'Noun phrase extraction from SRS documents.',
      'Modeling conceptual associations and multiplicity constraints (1 to 0..*, 1 to 1).',
      'Drafting High-Level Domain Concept Map and Formal Domain Class Diagram.'
    ],
    procedure: [
      'Perform domain discovery to isolate key business concepts.',
      'Assign semantic attributes and identify structural links between entities.',
      'Specify multiplicity bounds and integrity constraints.',
      'Render domain class diagrams using Mermaid notation.'
    ],
    diagramIds: ['EXP4-DM-01', 'EXP4-DM-02'],
    result: 'A complete Domain Model comprising 34 domain classes with explicit attributes and multiplicities was established.',
    conclusion: 'Domain analysis creates a shared conceptual vocabulary that aligns domain experts with software architects.'
  },
  {
    id: '5',
    number: 5,
    title: 'Experiment 5: System Sequence Diagrams & Object Interaction',
    subtitle: 'Black-Box SSDs and Controller-Level High-Level Sequence Modeling',
    aim: 'To model temporal messaging sequences between external actors and system boundaries using System Sequence Diagrams (SSDs).',
    objectives: [
      'Construct 9 System Sequence Diagrams (SSD-01 to SSD-09) for core hospital workflows.',
      'Construct 5 High-Level Sequence Diagrams (HLSD-01 to HLSD-05) depicting controller interactions.',
      'Model system events, return responses, and execution lifelines.'
    ],
    theory: `System Sequence Diagrams (SSDs) treat the system as a black box and show the time-ordered sequence of input events generated by actors, along with system responses.

High-Level Sequence Diagrams (HLSDs) take the first step toward white-box design by illustrating how system operation requests are received by business controllers and dispatched to entity repositories.`,
    activities: [
      'Mapping use case main flows into time-ordered message interactions.',
      'Defining formal system operation calls (e.g., registerPatient(), bookSlot(), dispenseMedicines()).',
      'Modeling activation lifelines and alt/opt execution frames.'
    ],
    procedure: [
      'Select primary use case scenarios.',
      'Identify actor inputs and corresponding system events.',
      'Draw sequence lifelines with activation bars and return messages.',
      'Organize sequence diagrams into SSD and HLSD catalogs.'
    ],
    diagramIds: [
      'EXP5-SSD-01', 'EXP5-SSD-02', 'EXP5-SSD-03', 'EXP5-SSD-04',
      'EXP5-SSD-05', 'EXP5-SSD-06', 'EXP5-SSD-07', 'EXP5-SSD-08', 'EXP5-SSD-09'
    ],
    result: '14 Sequence Diagrams (9 SSDs and 5 HLSDs) were successfully modeled covering all core operational paths.',
    conclusion: 'Sequence modeling articulates system behavior over time, establishing clear message contracts for design class methods.'
  },
  {
    id: '6',
    number: 6,
    title: 'Experiment 6: Detailed Object Design & BCE Architecture',
    subtitle: 'Boundary-Control-Entity (BCE) Pattern Realization & Communication Diagrams',
    aim: 'To perform detailed object design by applying the 3-Layer BCE architectural pattern and creating Detailed Sequence & Communication Diagrams.',
    objectives: [
      'Apply Boundary-Control-Entity (BCE) pattern to partition UI, business logic, and entity layers.',
      'Construct 8 Detailed Sequence Diagrams (DSD-01 to DSD-08) showing internal object messaging.',
      'Construct 8 Communication Diagrams (COM-01 to COM-08) highlighting object collaboration networks.'
    ],
    theory: `The Boundary-Control-Entity (BCE) architectural pattern structures object-oriented software into three clean layers:
- Boundary: Handles user interaction and external gateway communication (e.g., PatientRegistrationUI).
- Control: Orchestrates business logic, workflow rules, and transaction boundaries (e.g., PatientRegistrationController).
- Entity: Encapsulates persistent state and domain rules (e.g., Patient).

Detailed Sequence Diagrams reveal internal method invocations between BCE objects, while Communication Diagrams emphasize structural linkages using numbered message labels.`,
    activities: [
      'Partitioning domain classes into BCE architectural roles.',
      'Detailing message parameters, return types, and repository calls.',
      'Creating 3-Layer BCE System Architecture diagram and Communication Diagrams.'
    ],
    procedure: [
      'Decompose system operations into Boundary, Control, and Entity collaborations.',
      'Draw detailed white-box sequence diagrams with execution lifelines.',
      'Convert sequence flows into numbered Communication Diagram networks.',
      'Validate layer separation to prevent tight coupling.'
    ],
    diagramIds: ['EXP6-BCE-01'],
    result: 'The 3-Layer BCE architectural pattern was successfully implemented across 8 Detailed Sequence Diagrams and 8 Communication Diagrams.',
    conclusion: 'BCE architecture promotes high cohesion and low coupling, facilitating maintainable and testable software components.'
  },
  {
    id: '7',
    number: 7,
    title: 'Experiment 7: Design Class Modeling & Interface Architecture',
    subtitle: 'Software Class Specifications, Visibilities, Interfaces, and Dependency Inversion',
    aim: 'To transform conceptual domain models into fully specified Design Class Diagrams (DCD) with visibilities, method signatures, interfaces, and dependencies.',
    objectives: [
      'Define 42 Design Classes with precise visibilities (+, -, #), attributes, and method signatures.',
      'Incorporate Design Patterns (Strategy, Adapter, Repository, Controller).',
      'Model interfaces and demonstrate Dependency Inversion Principle (DIP) realizations.'
    ],
    theory: `Design Class Diagrams (DCDs) depict software design classes ready for implementation in code. They include exact data types, access modifiers (+ public, - private, # protected), full operation signatures, return types, and interface realizations.

Design Patterns implemented in SHMS:
- Strategy Pattern: PaymentProcessor interface realized by CardPaymentProcessor and UPIPaymentProcessor.
- Adapter Pattern: SMSNotificationAdapter realizing NotificationService interface.
- Controller Pattern: Centralized controllers handling business workflows.`,
    activities: [
      'Expansion of domain concepts into 42 software design classes.',
      'Specification of method parameters, return types, and field visibilities.',
      'Creation of Master Design Class Diagram and Interfaces & Dependencies Diagram.'
    ],
    procedure: [
      'Assign access modifiers to all attributes and operations.',
      'Define abstract interfaces for external integration points (Payment, Notifications).',
      'Draw realization and dependency links.',
      'Validate completeness against requirement traceability matrix.'
    ],
    diagramIds: ['EXP7-DCD-01', 'EXP7-INT-01'],
    result: '42 Design Classes were specified with complete operation contracts and DIP interface realizations.',
    conclusion: 'Design class modeling provides an explicit, code-ready blueprint that directly maps to TypeScript interfaces and components.'
  },
  {
    id: '8',
    number: 8,
    title: 'Experiment 8: Behavioural Modeling & Dynamic Workflow Analysis',
    subtitle: 'Activity Diagrams with Swimlanes and Finite State Machine Lifecycle Modeling',
    aim: 'To model dynamic operational workflows and entity state transitions using Activity Diagrams and State Machine Diagrams.',
    objectives: [
      'Construct 9 Activity Diagrams (ACT-01 to ACT-09) featuring swimlanes, decisions, and parallel forks.',
      'Construct 5 State Machine Diagrams (STM-01 to STM-05) modeling lifecycle states for core entities.',
      'Map end-to-end hospital patient workflow from registration to discharge.'
    ],
    theory: `Behavioral modeling captures dynamic runtime execution:
- Activity Diagrams model procedural flow of control, decisions, parallel execution forks, and swimlane role responsibilities (Patient, Doctor, Pharmacist, Cashier).
- State Machine Diagrams model the finite states, events, and transition guards an entity undergoes during its lifecycle (e.g. Appointment states: Requested -> Confirmed -> CheckedIn -> InConsultation -> Completed).`,
    activities: [
      'Modeling multi-actor hospital business processes with swimlanes.',
      'Defining finite state transitions, triggers, and guards for Appointment, LabTestOrder, Admission, Payment, and Prescription.',
      'Creation of Master Overall Hospital Workflow diagram.'
    ],
    procedure: [
      'Identify business process decision points and swimlane roles.',
      'Draw procedural activity flows with decision diamonds and merge nodes.',
      'Identify state lifecycle stages for core entities and model transitions.',
      'Render behavioral diagrams using Mermaid syntax.'
    ],
    diagramIds: ['EXP8-ACT-09', 'EXP8-STM-01', 'EXP8-STM-02', 'EXP8-STM-03', 'EXP8-STM-04', 'EXP8-STM-05'],
    result: '9 Activity Diagrams and 5 State Machine Diagrams were completed, fully describing dynamic hospital behavior.',
    conclusion: 'Behavioral modeling provides comprehensive operational clarity for complex multi-step workflows and entity state management.'
  }
];
