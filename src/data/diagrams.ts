import { Diagram } from '@/types';

export const DIAGRAMS: Diagram[] = [
  // --- EXPERIMENT 1 ---
  {
    id: 'EXP1-CD-01',
    title: 'Basic Class Diagram',
    experimentId: '1',
    type: 'Class',
    filePath: 'experiment-01/basic-class-diagram.mmd',
    purpose: 'Demonstrates core SHMS domain entities, attributes, visibility, and inheritance structure.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-04', 'FR-08'],
    relatedUseCases: ['UC-01', 'UC-03', 'UC-20'],
    relatedClasses: ['User', 'Patient', 'Doctor', 'Appointment'],
    mermaidCode: `classDiagram
    class User {
        -String userId
        -String username
        -String passwordHash
        -String email
        +login()
        +logout()
    }
    class Patient {
        -String patientId
        -String name
        -int age
        -String phone
        +updateProfile()
    }
    class Doctor {
        -String doctorId
        -String specialization
        -String licenseNumber
        +consultPatient()
    }
    class Appointment {
        -String appointmentId
        -Date appointmentDate
        -String status
        +cancel()
        +confirm()
    }
    User <|-- Patient
    User <|-- Doctor
    Patient "1" -- "0..*" Appointment : books
    Doctor "1" -- "0..*" Appointment : conducts`
  },
  {
    id: 'EXP1-CD-02',
    title: 'Relationships Class Diagram',
    experimentId: '1',
    type: 'Class',
    filePath: 'experiment-01/relationships-class-diagram.mmd',
    purpose: 'Demonstrates association, aggregation, composition, and generalization in SHMS.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-08', 'FR-10', 'FR-16'],
    relatedUseCases: ['UC-17', 'UC-20', 'UC-22'],
    relatedClasses: ['Hospital', 'Department', 'MedicalRecord', 'Consultation', 'Prescription', 'PrescriptionItem'],
    mermaidCode: `classDiagram
    class Hospital {
        -String name
        -String address
    }
    class Department {
        -String deptId
        -String name
    }
    class MedicalRecord {
        -String recordId
    }
    class Consultation {
        -String consultationId
    }
    class Prescription {
        -String prescriptionId
    }
    class PrescriptionItem {
        -String drugName
        -String dosage
    }
    Hospital "1" *-- "1..*" Department : Composition
    MedicalRecord "1" *-- "0..*" Consultation : Composition
    Prescription "1" *-- "1..*" PrescriptionItem : Composition
    Department "1" o-- "0..*" Doctor : Aggregation`
  },

  // --- EXPERIMENT 3 ---
  {
    id: 'EXP3-UC-01',
    title: 'Master Use Case Diagram',
    experimentId: '3',
    type: 'Use Case',
    filePath: 'experiment-03/use-case-diagram.mmd',
    purpose: 'Overall system actors & use cases with mandatory <<include>> and conditional <<extend>> relationships.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-04', 'FR-08', 'FR-11', 'FR-18', 'FR-20'],
    relatedUseCases: ['UC-01', 'UC-03', 'UC-20', 'UC-23', 'UC-32', 'UC-33'],
    relatedClasses: ['Patient', 'Doctor', 'Pharmacist', 'LabTechnician', 'Cashier', 'Admin'],
    mermaidCode: `graph LR
    subgraph SystemBoundary ["Smart Hospital Management System (SHMS)"]
        UC01(("UC-01 Register Patient"))
        UC03(("UC-03 Book Appointment"))
        UC05(("UC-05 Check-In & Token"))
        UC08(("UC-08 Settle Payment"))
        UC20(("UC-20 Conduct Consultation"))
        UC22(("UC-22 Create Prescription"))
        UC23(("UC-23 Request Lab Test"))
        UC29(("UC-29 Collect Sample"))
        UC30(("UC-30 Process Test"))
        UC31(("UC-31 Approve Lab Report"))
        UC32(("UC-32 Dispense Medicines"))
        UC33(("UC-33 Generate Bill"))
        UC34(("UC-34 Manage Users & RBAC"))
    end

    Patient --> UC01
    Patient --> UC03
    Patient --> UC05
    Patient --> UC08

    Receptionist --> UC01
    Receptionist --> UC03
    Receptionist --> UC05

    Doctor --> UC20
    Doctor --> UC22
    Doctor --> UC23

    LabTech --> UC29
    LabTech --> UC30
    LabTech --> UC31

    Pharmacist --> UC32
    Cashier --> UC33
    Cashier --> UC08
    Admin --> UC34

    UC03 ..> UC05 : <<include>>
    UC23 ..> UC20 : <<extend>>`
  },
  {
    id: 'EXP3-UC-02',
    title: 'Subsystem Packages Diagram',
    experimentId: '3',
    type: 'Package',
    filePath: 'experiment-03/use-case-package-diagrams.mmd',
    purpose: 'Package architecture organizing use cases into modular operational subsystems.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-04', 'FR-11', 'FR-18', 'FR-20'],
    relatedUseCases: ['UC-01', 'UC-03', 'UC-23', 'UC-32', 'UC-33'],
    relatedClasses: ['Patient', 'Appointment', 'LabTestOrder', 'Prescription', 'Bill'],
    mermaidCode: `graph TD
    subgraph CoreSystem ["SHMS Architecture Packages"]
        P1["Patient Management Package"]
        P2["Appointment & OP Package"]
        P3["Clinical Package"]
        P4["Laboratory Package"]
        P5["Pharmacy Package"]
        P6["Inpatient Package"]
        P7["Billing & Payment Package"]
        P8["Security & Admin Package"]
    end

    P2 --> P1 : depends on
    P3 --> P2 : depends on
    P4 --> P3 : depends on
    P5 --> P3 : depends on
    P6 --> P3 : depends on
    P7 --> P4 : depends on
    P7 --> P5 : depends on
    P7 --> P6 : depends on
    P8 --> P1 : monitors`
  },

  // --- EXPERIMENT 4 ---
  {
    id: 'EXP4-DM-01',
    title: 'High-Level Domain Concept Map',
    experimentId: '4',
    type: 'Class',
    filePath: 'experiment-04/domain-model.mmd',
    purpose: 'High-level conceptual map of domain entities and real-world relationships.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-04', 'FR-08', 'FR-11'],
    relatedUseCases: ['UC-01', 'UC-03', 'UC-20'],
    relatedClasses: ['Patient', 'Doctor', 'Appointment', 'Consultation', 'Prescription', 'LabTestOrder', 'Bill'],
    mermaidCode: `classDiagram
    Patient "1" -- "0..*" Appointment : schedules
    Doctor "1" -- "0..*" Appointment : conducts
    Appointment "1" -- "0..1" Consultation : results in
    Consultation "1" -- "0..1" Prescription : yields
    Consultation "1" -- "0..*" LabTestOrder : requests
    Patient "1" -- "0..*" Bill : charged for
    Bill "1" -- "0..*" Payment : settled by`
  },
  {
    id: 'EXP4-DM-02',
    title: 'Formal Domain Class Diagram',
    experimentId: '4',
    type: 'Class',
    filePath: 'experiment-04/domain-class-diagram.mmd',
    purpose: 'Complete formal domain model showing 34+ entities with multiplicities and attributes.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-04', 'FR-08', 'FR-11', 'FR-15', 'FR-18', 'FR-20'],
    relatedUseCases: ['UC-01', 'UC-03', 'UC-16', 'UC-20', 'UC-23', 'UC-32', 'UC-33'],
    relatedClasses: ['Patient', 'Doctor', 'Appointment', 'Consultation', 'LabTestOrder', 'Admission', 'Bed', 'Bill', 'Medicine'],
    mermaidCode: `classDiagram
    class Patient {
        +String patientId
        +String name
        +int age
        +String phone
        +String bloodGroup
    }
    class Doctor {
        +String doctorId
        +String name
        +String specialization
        +Double consultationFee
    }
    class Appointment {
        +String appointmentId
        +Date appointmentDate
        +Time appointmentTime
        +String status
    }
    class Consultation {
        +String consultationId
        +DateTime consultationDate
        +String symptoms
        +String clinicalNotes
    }
    class LabTestOrder {
        +String orderId
        +String testName
        +String status
    }
    class Admission {
        +String admissionId
        +DateTime admissionDate
        +String status
    }
    class Bed {
        +String bedId
        +String bedNumber
        +String status
    }
    class Bill {
        +String billId
        +Double netAmount
        +String status
    }

    Patient "1" -- "0..*" Appointment
    Doctor "1" -- "0..*" Appointment
    Appointment "1" -- "0..1" Consultation
    Consultation "1" -- "0..*" LabTestOrder
    Patient "1" -- "0..*" Admission
    Admission "1" -- "0..1" Bed
    Patient "1" -- "0..*" Bill`
  },

  // --- EXPERIMENT 5 ---
  {
    id: 'EXP5-SSD-01',
    title: 'Patient Registration SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-01-patient-registration.mmd',
    purpose: 'Black-box System Sequence Diagram for patient self-registration.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-02'],
    relatedUseCases: ['UC-01', 'UC-11'],
    relatedClasses: ['Patient', 'System'],
    mermaidCode: `sequenceDiagram
    actor Patient
    participant System as System Boundary

    Patient->>System: registerPatient(name, age, gender, phone, email)
    activate System
    System->>System: validateFields()
    System->>System: generateUHID()
    System-->>Patient: registrationSuccess(UHID, status)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-02',
    title: 'Appointment Booking SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-02-appointment-booking.mmd',
    purpose: 'Black-box System Sequence Diagram for doctor search and slot booking.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-04', 'FR-05'],
    relatedUseCases: ['UC-03', 'UC-13'],
    relatedClasses: ['Patient', 'System'],
    mermaidCode: `sequenceDiagram
    actor Patient
    participant System as System Boundary

    Patient->>System: searchDoctor(specialty, date)
    activate System
    System-->>Patient: returnAvailableSlots(doctorList, slots)
    deactivate System

    Patient->>System: bookSlot(patientId, doctorId, slotTime)
    activate System
    System->>System: verifySlotAvailability()
    System-->>Patient: confirmBooking(appointmentId, tokenNum)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-03',
    title: 'OP Check-In SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-03-op-checkin.mmd',
    purpose: 'Black-box System Sequence Diagram for check-in and queue token generation.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-06', 'FR-07'],
    relatedUseCases: ['UC-05', 'UC-14'],
    relatedClasses: ['Patient', 'System'],
    mermaidCode: `sequenceDiagram
    actor Patient
    participant System as System Boundary

    Patient->>System: checkIn(UHID, appointmentId)
    activate System
    System->>System: validateBookingDate()
    System->>System: generateSequentialToken()
    System-->>Patient: checkInConfirmed(tokenNumber, roomNumber)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-04',
    title: 'Doctor Consultation SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-04-doctor-consultation.mmd',
    purpose: 'Black-box System Sequence Diagram for consultation documentation and prescriptions.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-08', 'FR-09', 'FR-10'],
    relatedUseCases: ['UC-20', 'UC-21', 'UC-22'],
    relatedClasses: ['Doctor', 'System'],
    mermaidCode: `sequenceDiagram
    actor Doctor
    participant System as System Boundary

    Doctor->>System: startConsultation(tokenNumber)
    activate System
    System-->>Doctor: displayPatientHistory(vitals, records)
    deactivate System

    Doctor->>System: recordClinicalNotes(symptoms, diagnosis)
    Doctor->>System: issuePrescription(medicines, dosage)
    activate System
    System-->>Doctor: consultationSaved(consultationId)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-05',
    title: 'Laboratory Testing SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-05-laboratory-testing.mmd',
    purpose: 'Black-box System Sequence Diagram for lab order, sample collection, and report approval.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-11', 'FR-12', 'FR-13', 'FR-14'],
    relatedUseCases: ['UC-23', 'UC-29', 'UC-30', 'UC-31'],
    relatedClasses: ['LabTech', 'System'],
    mermaidCode: `sequenceDiagram
    actor LabTech
    participant System as System Boundary

    LabTech->>System: collectSample(orderId, barcode)
    activate System
    System-->>LabTech: sampleLogged(status: SampleCollected)
    deactivate System

    LabTech->>System: enterTestResults(orderId, parameters)
    LabTech->>System: approveReport(orderId)
    activate System
    System-->>LabTech: reportPublished(reportId)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-06',
    title: 'Pharmacy Dispensing SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-06-pharmacy-dispensing.mmd',
    purpose: 'Black-box System Sequence Diagram for pharmacy dispensing and inventory sync.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-18', 'FR-19'],
    relatedUseCases: ['UC-32', 'UC-32a'],
    relatedClasses: ['Pharmacist', 'System'],
    mermaidCode: `sequenceDiagram
    actor Pharmacist
    participant System as System Boundary

    Pharmacist->>System: fetchPrescription(UHID)
    activate System
    System-->>Pharmacist: returnPrescriptionDetails(medicines)
    deactivate System

    Pharmacist->>System: dispenseMedicines(prescriptionId)
    activate System
    System->>System: updateInventoryStock()
    System-->>Pharmacist: dispensingSuccess(billItemCreated)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-07',
    title: 'Inpatient Admission SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-07-inpatient-admission.mmd',
    purpose: 'Black-box System Sequence Diagram for admission and bed allocation.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-15', 'FR-16'],
    relatedUseCases: ['UC-16', 'UC-17'],
    relatedClasses: ['Receptionist', 'System'],
    mermaidCode: `sequenceDiagram
    actor Receptionist
    participant System as System Boundary

    Receptionist->>System: createAdmission(patientId, wardCategory)
    activate System
    System-->>Receptionist: admissionCreated(admissionId)
    deactivate System

    Receptionist->>System: allocateBed(admissionId, bedId)
    activate System
    System->>System: markBedOccupied()
    System-->>Receptionist: bedAllocated(bedNumber)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-08',
    title: 'Billing and Payment SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-08-billing-and-payment.mmd',
    purpose: 'Black-box System Sequence Diagram for bill consolidation and payment settlement.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-20', 'FR-21', 'FR-22'],
    relatedUseCases: ['UC-08', 'UC-33', 'UC-33b'],
    relatedClasses: ['Cashier', 'System'],
    mermaidCode: `sequenceDiagram
    actor Cashier
    participant System as System Boundary

    Cashier->>System: generateBill(patientId)
    activate System
    System-->>Cashier: displayItemizedInvoice(totalAmount)
    deactivate System

    Cashier->>System: processPayment(billId, amount, mode)
    activate System
    System->>System: executePaymentTransaction()
    System-->>Cashier: paymentComplete(receiptId)
    deactivate System`
  },
  {
    id: 'EXP5-SSD-09',
    title: 'Inpatient Discharge SSD',
    experimentId: '5',
    type: 'Sequence',
    filePath: 'experiment-05/system-sequence-diagrams/ssd-09-discharge.mmd',
    purpose: 'Black-box System Sequence Diagram for discharge clearance and bed release.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-23'],
    relatedUseCases: ['UC-18', 'UC-28'],
    relatedClasses: ['Receptionist', 'System'],
    mermaidCode: `sequenceDiagram
    actor Receptionist
    participant System as System Boundary

    Receptionist->>System: processDischarge(admissionId)
    activate System
    System->>System: verifyPaymentClearance()
    System->>System: releaseBedStatus()
    System-->>Receptionist: dischargeApproved(dischargeSummary)
    deactivate System`
  },

  // --- EXPERIMENT 6 ---
  {
    id: 'EXP6-BCE-01',
    title: '3-Layer BCE System Architecture',
    experimentId: '6',
    type: 'Architecture',
    filePath: 'experiment-06/bce-architecture.mmd',
    purpose: 'Demonstrates 3-Layer Boundary-Control-Entity architecture partitioning UI screens, controllers, and domain entities.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-08', 'FR-20', 'FR-28'],
    relatedUseCases: ['UC-01', 'UC-20', 'UC-33', 'UC-34'],
    relatedClasses: ['PatientRegistrationUI', 'PatientRegistrationController', 'Patient', 'BillingUI', 'BillingController', 'Bill'],
    mermaidCode: `graph TD
    subgraph BoundaryLayer ["Boundary Layer (UI / Views)"]
        B1["PatientRegistrationUI"]
        B2["ConsultationUI"]
        B3["BillingUI"]
    end

    subgraph ControlLayer ["Control Layer (Business Controllers)"]
        C1["PatientRegistrationController"]
        C2["ConsultationController"]
        C3["BillingController"]
    end

    subgraph EntityLayer ["Entity Layer (Domain Models)"]
        E1["Patient Entity"]
        E2["Consultation Entity"]
        E3["Bill Entity"]
    end

    B1 --> C1
    B2 --> C2
    B3 --> C3

    C1 --> E1
    C2 --> E2
    C3 --> E3`
  },

  // --- EXPERIMENT 7 ---
  {
    id: 'EXP7-DCD-01',
    title: 'Master Design Class Diagram',
    experimentId: '7',
    type: 'Class',
    filePath: 'experiment-07/design-class-diagram.mmd',
    purpose: 'Complete Design Class Diagram mapping operations, visibilities, interfaces, and dependencies.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-04', 'FR-08', 'FR-11', 'FR-18', 'FR-20', 'FR-28'],
    relatedUseCases: ['UC-01', 'UC-03', 'UC-20', 'UC-23', 'UC-32', 'UC-33', 'UC-34'],
    relatedClasses: ['PatientRegistrationUI', 'PatientRegistrationController', 'Patient', 'AppointmentController', 'BillingController'],
    mermaidCode: `classDiagram
    class PatientRegistrationUI {
        -Map formFields
        +renderRegistrationForm()
        +onFormSubmit(formData)
    }
    class PatientRegistrationController {
        -PatientRepository repo
        +registerPatient(dto) String
        +generateUHID() String
    }
    class Patient {
        -String patientId
        -String name
        -int age
        +getUHID() String
    }
    class BillingController {
        -PaymentProcessor processor
        +generateInvoice(patientId) Bill
        +settlePayment(billId, amount) Receipt
    }

    PatientRegistrationUI ..> PatientRegistrationController : uses
    PatientRegistrationController --> Patient : creates & persists
    BillingController ..> PaymentProcessor : relies on abstraction`
  },
  {
    id: 'EXP7-INT-01',
    title: 'Interfaces & Dependencies Diagram',
    experimentId: '7',
    type: 'Class',
    filePath: 'experiment-07/interfaces-and-dependencies.mmd',
    purpose: 'Demonstrates Dependency Inversion Principle (DIP) and Strategy pattern implementations for Payment and Notifications.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-21', 'FR-26'],
    relatedUseCases: ['UC-08', 'UC-31'],
    relatedClasses: ['PaymentProcessor', 'CardPaymentProcessor', 'UPIPaymentProcessor', 'NotificationService', 'SMSNotificationAdapter'],
    mermaidCode: `classDiagram
    class PaymentProcessor {
        <<interface>>
        +processPayment(amount, payload)* PaymentResult
    }
    class CardPaymentProcessor {
        -String merchantKey
        +processPayment(amount, payload) PaymentResult
    }
    class UPIPaymentProcessor {
        -String upiVpa
        +processPayment(amount, payload) PaymentResult
    }
    class NotificationService {
        <<interface>>
        +sendNotification(recipient, message)* boolean
    }
    class SMSNotificationAdapter {
        -String smsGatewayUrl
        +sendNotification(recipient, message) boolean
    }

    PaymentProcessor <|.. CardPaymentProcessor : realizes
    PaymentProcessor <|.. UPIPaymentProcessor : realizes
    NotificationService <|.. SMSNotificationAdapter : realizes`
  },

  // --- EXPERIMENT 8 ---
  {
    id: 'EXP8-ACT-09',
    title: 'Master Hospital Workflow Activity Diagram',
    experimentId: '8',
    type: 'Activity',
    filePath: 'experiment-08/activity-diagrams/act-09-overall-hospital-workflow.mmd',
    purpose: 'Comprehensive swimlane activity flow across Registration, Appointment, Consultation, Lab, Pharmacy, Admission, Billing.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-01', 'FR-04', 'FR-08', 'FR-11', 'FR-15', 'FR-18', 'FR-20'],
    relatedUseCases: ['UC-01', 'UC-03', 'UC-20', 'UC-23', 'UC-32', 'UC-33'],
    relatedClasses: ['Patient', 'Doctor', 'Pharmacist', 'LabTechnician', 'Cashier'],
    mermaidCode: `flowchart TD
    Start([Start Patient Journey]) --> Registration[Patient Registration]
    Registration --> Appointment[Book Appointment]
    Appointment --> CheckIn[OP Check-In & Token]
    CheckIn --> Consultation[Doctor Consultation]

    Consultation --> LabDecision{Lab Test Required?}
    LabDecision -- Yes --> SampleCollection[Sample Collection]
    SampleCollection --> LabProcessing[Lab Processing & Approval]
    LabProcessing --> DoctorReview[Doctor Reviews Lab Report]
    DoctorReview --> AdmissionDecision{Admission Required?}

    LabDecision -- No --> AdmissionDecision

    AdmissionDecision -- Yes --> BedAllocation[Inpatient Bed Allocation]
    BedAllocation --> InpatientCare[Inpatient Treatment]
    InpatientCare --> Discharge[Discharge Clearance]
    Discharge --> Prescription[Issue Prescription]

    AdmissionDecision -- No --> Prescription

    Prescription --> Pharmacy[Pharmacy Dispensing]
    Pharmacy --> Billing[Billing & Payment Settlement]
    Billing --> End([End Journey])`
  },
  {
    id: 'EXP8-STM-01',
    title: 'Appointment State Machine',
    experimentId: '8',
    type: 'State Machine',
    filePath: 'experiment-08/state-machine-diagrams/stm-01-appointment.mmd',
    purpose: 'Finite state machine modeling appointment lifecycle states.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-04', 'FR-06'],
    relatedUseCases: ['UC-03', 'UC-04', 'UC-05'],
    relatedClasses: ['Appointment'],
    mermaidCode: `stateDiagram-v2
    [*] --> Requested
    Requested --> Confirmed : slotConfirmed()
    Confirmed --> CheckedIn : patientArrival()
    CheckedIn --> InConsultation : callToken()
    InConsultation --> Completed : consultationDone()
    Confirmed --> Cancelled : cancelBooking()
    CheckedIn --> NoShow : timeout()
    Completed --> [*]
    Cancelled --> [*]
    NoShow --> [*]`
  },
  {
    id: 'EXP8-STM-02',
    title: 'Lab Test Order State Machine',
    experimentId: '8',
    type: 'State Machine',
    filePath: 'experiment-08/state-machine-diagrams/stm-02-lab-test.mmd',
    purpose: 'Finite state machine modeling laboratory test order processing states.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-11', 'FR-12', 'FR-13', 'FR-14'],
    relatedUseCases: ['UC-23', 'UC-29', 'UC-30', 'UC-31'],
    relatedClasses: ['LabTestOrder'],
    mermaidCode: `stateDiagram-v2
    [*] --> Requested
    Requested --> SamplePending : logOrder()
    SamplePending --> SampleCollected : collectSpecimen()
    SampleCollected --> Processing : runAnalyzer()
    Processing --> ResultEntered : captureParameters()
    ResultEntered --> Approved : pathologistSignOff()
    Approved --> Reported : publishReport()
    Reported --> [*]`
  },
  {
    id: 'EXP8-STM-03',
    title: 'Inpatient Admission State Machine',
    experimentId: '8',
    type: 'State Machine',
    filePath: 'experiment-08/state-machine-diagrams/stm-03-admission.mmd',
    purpose: 'Finite state machine modeling inpatient admission and hospitalization lifecycle.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-15', 'FR-16', 'FR-23'],
    relatedUseCases: ['UC-16', 'UC-17', 'UC-18'],
    relatedClasses: ['Admission'],
    mermaidCode: `stateDiagram-v2
    [*] --> Requested
    Requested --> Admitted : confirmAdmission()
    Admitted --> BedAllocated : assignWardBed()
    BedAllocated --> UnderTreatment : beginClinicalCare()
    UnderTreatment --> DischargeInitiated : doctorSummarySigned()
    DischargeInitiated --> Discharged : billSettledAndBedReleased()
    Discharged --> [*]`
  },
  {
    id: 'EXP8-STM-04',
    title: 'Payment State Machine',
    experimentId: '8',
    type: 'State Machine',
    filePath: 'experiment-08/state-machine-diagrams/stm-04-payment.mmd',
    purpose: 'Finite state machine modeling financial payment transaction lifecycle.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-21', 'FR-22'],
    relatedUseCases: ['UC-08', 'UC-33b'],
    relatedClasses: ['Payment', 'Bill'],
    mermaidCode: `stateDiagram-v2
    [*] --> Pending
    Pending --> Processing : initiateTransaction()
    Processing --> Paid : paymentSuccess()
    Processing --> Failed : gatewayDecline()
    Failed --> Pending : retryPayment()
    Paid --> Refunded : processRefund()
    Paid --> [*]
    Refunded --> [*]`
  },
  {
    id: 'EXP8-STM-05',
    title: 'Prescription State Machine',
    experimentId: '8',
    type: 'State Machine',
    filePath: 'experiment-08/state-machine-diagrams/stm-05-prescription.mmd',
    purpose: 'Finite state machine modeling electronic prescription lifecycle.',
    starUmlAvailable: false,
    mermaidAvailable: true,
    relatedRequirements: ['FR-10', 'FR-18'],
    relatedUseCases: ['UC-22', 'UC-32'],
    relatedClasses: ['Prescription'],
    mermaidCode: `stateDiagram-v2
    [*] --> Created
    Created --> Verified : pharmacistCheck()
    Verified --> Dispensed : dispenseAllDrugs()
    Verified --> PartiallyDispensed : partialStockDispensed()
    PartiallyDispensed --> Dispensed : completeDispensing()
    Dispensed --> [*]`
  }
];
