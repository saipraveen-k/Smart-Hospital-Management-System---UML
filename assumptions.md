# Assumptions Log — Smart Hospital Management System (SHMS)

This document records all design and architectural assumptions made during the Object-Oriented Analysis and Design (OOAD) modelling of the Smart Hospital Management System (SHMS) to supplement the primary source document (`Smart_Hospital_Management_System.pdf`).

---

### A-01: Abstract User Superclass
* **Assumption**: The core human actors (`Patient`, `Receptionist`, `Doctor`, `Pharmacist`, `LabTechnician`, `Cashier`, `Admin`) inherit common credentials and profile attributes (`userId`, `username`, `passwordHash`, `name`, `email`, `phone`, `role`) from an abstract superclass `User`.
* **Reason**: Promotes encapsulation, code reuse, and standardizes Role-Based Access Control (RBAC) across all system modules.
* **Impact**: Class Diagrams (Exp 1, Exp 4, Exp 7), BCE Architecture (Exp 6).

### A-02: Payment Gateway Interface Abstraction
* **Assumption**: Electronic payment processing (Credit/Debit Cards, UPI, Online Banking) is handled via a unified `PaymentProcessor` interface implemented by concrete processor classes (`CashPaymentProcessor`, `CardPaymentProcessor`, `UPIPaymentProcessor`).
* **Reason**: Adheres to the Dependency Inversion Principle (DIP) and Strategy Pattern, shielding the core billing module from third-party gateway API changes.
* **Impact**: Detailed Sequence Diagrams (Exp 6), Design Class Diagram (Exp 7), Interface Diagram (Exp 7).

### A-03: Single Active Admission per Patient Constraint
* **Assumption**: A patient can only have one active `Admission` record in status `Admitted` or `UnderTreatment` at any given time.
* **Reason**: Enforces real-world medical bed management invariants and avoids double bed allocation.
* **Impact**: Functional Requirements (Exp 2), Domain Constraints (Exp 4), Admission State Machine (Exp 8).

### A-04: Automated Bed Availability Verification
* **Assumption**: When allocating a bed, `AdmissionController` queries `Bed` records filtered by `Ward` type to automatically transition bed status from `Available` to `Occupied`.
* **Reason**: Eliminates human error during bed allocation by Receptionists.
* **Impact**: Detailed Sequence Diagrams (Exp 6), Activity Diagrams (Exp 8).

### A-05: Mandatory Doctor Verification for Prescription Dispensing
* **Assumption**: Pharmacists cannot dispense medication unless the corresponding `Prescription` object status is `Verified` and signed by a licensed `Doctor`.
* **Reason**: Ensures medical compliance and legal patient safety standards.
* **Impact**: Business Rules (Exp 2), Prescription State Machine (Exp 8).

### A-06: Two-Phase Laboratory Test Result Approval
* **Assumption**: Lab test processing consists of result entry by `LabTechnician` (`ResultEntered`) followed by automated or senior tech verification (`Approved`) before reports become visible to the consulting `Doctor`.
* **Reason**: Guarantees report accuracy and prevents diagnostic errors from propagating to patient records.
* **Impact**: Laboratory Use Case (Exp 3), Lab Test State Machine (Exp 8).

### A-07: Standardized Unified Medical Record Aggregation
* **Assumption**: Each registered `Patient` is compositionally linked to exactly one `MedicalRecord` instance, which aggregates `Consultation`, `Prescription`, `LabReport`, and `DischargeSummary` histories.
* **Reason**: Provides a centralized, audit-friendly history of patient care.
* **Impact**: Domain Model (Exp 4), Design Class Diagram (Exp 7).

### A-08: Automatic Queue Token Assignment on OP Check-In
* **Assumption**: Upon OP Check-In at the reception desk, the system automatically assigns an incremental `queueToken` for the selected `Doctor`'s daily consultation schedule.
* **Reason**: Streamlines outpatient queue management and minimizes waiting room conflicts.
* **Impact**: Event Table (Exp 2), Appointment Sequence Diagram (Exp 6).

### A-09: Synchronous Inventory Deduction on Medicine Dispensing
* **Assumption**: Dispensing prescription items automatically decrements `stockQuantity` in `InventoryItem` and checks against `reorderLevel` to trigger `LowStockAlert`.
* **Reason**: Maintains real-world inventory synchronization without manual stock count delays.
* **Impact**: Business Rules (Exp 2), Pharmacy Sequence Diagram (Exp 6).

### A-10: Automated Comprehensive Bill Generation
* **Assumption**: `BillingController` automatically aggregates unpaid charges from `Consultation`, `LabTestOrder`, `Prescription`, and `Admission` (bed day rates) into a single unified `Bill`.
* **Reason**: Simplifies cashier operations and ensures single-receipt settlement at discharge.
* **Impact**: Billing & Payment Sequence Diagram (Exp 6), Activity Diagram (Exp 8).

### A-11: Audit Logging for All Administrative Operations
* **Assumption**: All CRUD operations on user accounts, roles, bed allocations, and report modifications trigger an asynchronous write to `AuditLog`.
* **Reason**: Ensures security auditability and HIPAA/NABH regulatory compliance.
* **Impact**: Non-Functional Requirements (Exp 2), BCE Architecture (Exp 6).

### A-12: Notification Dispatch Service
* **Assumption**: System alerts (appointment confirmations, lab report readiness, low stock alerts) are dispatched via an asynchronous `NotificationService` interface supporting `SMSNotification` and `EmailNotification`.
* **Reason**: Decouples business logic from communication protocol details.
* **Impact**: Design Class Diagram (Exp 7), BCE Architecture (Exp 6).

### A-13: Outpatient vs Inpatient Workflow Forking
* **Assumption**: Following a consultation, a patient proceeds to Pharmacy/Billing if outpatient, or to Bed Allocation/Ward Admission if inpatient care is indicated.
* **Reason**: Models real-world hospital operational branching.
* **Impact**: Main Hospital Workflow Activity Diagram (Exp 8).

### A-14: Soft Deletion of Critical Records
* **Assumption**: Patient profiles and medical records are never physically purged from the database; status flags (e.g. `isActive = false` or `isArchived = true`) are updated instead.
* **Reason**: Prevents accidental data loss and preserves medico-legal audit trails.
* **Impact**: SRS (Exp 2), Domain Analysis (Exp 4).

### A-15: Monolithic Architecture with Layered BCE Packaging
* **Assumption**: SHMS is designed as a monolithic 3-tier system using Boundary-Control-Entity (BCE) architecture for clean separation of concerns.
* **Reason**: Aligns with academic OOAD laboratory curriculum while providing clear transformation paths to microservices.
* **Impact**: BCE Architecture (Exp 6), Design Class Model (Exp 7).
