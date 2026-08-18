# OOAD Fundamentals & SDLC Analysis for SHMS

This document details the core theoretical principles of Object-Oriented Analysis and Design (OOAD) and Software Development Life Cycle (SDLC) mapped directly to the **Smart Hospital Management System (SHMS)**.

---

## 1. SDLC Phases Mapped to SHMS

```text
Requirement Analysis ──► System Analysis ──► System Design ──► Implementation ──► Testing ──► Deployment ──► Maintenance
```

### 1.1 Requirement Analysis
* **Definition**: Gathering business workflows, stakeholder expectations, and operational constraints to define system scope.
* **SHMS Context**: Eliciting workflow requirements from hospital staff—reception desk check-ins, doctor consultation flows, lab sample tracking, pharmacy stock management, and cashier billing procedures.

### 1.2 System Analysis
* **Definition**: Analyzing requirements to build conceptual models without specifying software implementation technology.
* **SHMS Context**: Identifying domain entities (`Patient`, `Doctor`, `Appointment`, `Prescription`, `LabTest`), building Use Case Models, and establishing domain class boundaries.

### 1.3 System Design
* **Definition**: Transforming conceptual models into detailed software architectures, database schemas, component structures, and UI interactions.
* **SHMS Context**: Designing the 3-Layer BCE (Boundary-Control-Entity) architecture, defining design class method signatures, interfaces (`PaymentProcessor`), and behavioral state machines.

### 1.4 Implementation
* **Definition**: Translating design class models and interaction specifications into executable source code.
* **SHMS Context**: Developing modules using object-oriented languages (e.g. Java / TypeScript / C#) implementing encapsulation, design patterns, and REST API controllers.

### 1.5 Testing
* **Definition**: Verifying that the implemented software fulfills functional requirements and non-functional quality attributes.
* **SHMS Context**: Unit testing `Patient` entity logic, integration testing `ConsultationController` to `LabTestOrder` pipelines, and system testing cashier billing settlement.

### 1.6 Deployment
* **Definition**: Packaging, installing, and releasing the validated application into host servers/cloud environments for live operational use.
* **SHMS Context**: Deploying SHMS on hospital intranet web application servers with Role-Based Access Control (RBAC) and database clusters.

### 1.7 Maintenance
* **Definition**: Correcting post-release defects, enhancing operational performance, and adapting software to regulatory changes.
* **SHMS Context**: Applying security patches, adding new lab test categories, updating tax rules in billing, and auditing system logs.

---

## 2. Fundamental OOAD Principles with SHMS Examples

### 2.1 Object
* **Definition**: An instance of a class possessing state (attributes), behavior (methods), and identity.
* **SHMS Example**: `patient_101` having `patientId = "P-9042"`, `name = "John Doe"`, and capability `updateProfile()`.

### 2.2 Class
* **Definition**: A blueprint or template defining the structure (attributes) and behavior (operations) common to a set of objects.
* **SHMS Example**: The `Patient` class template defining fields `patientId`, `name`, `phone` and operations `bookAppointment()`, `payBill()`.

### 2.3 Encapsulation
* **Definition**: Bundling state attributes and methods operating on that state into a single class while restricting direct access via visibility modifiers (`private`, `protected`).
* **SHMS Example**: Making `patientId` and `medicalHistory` private attributes within `Patient`, forcing modifications through public methods `getMedicalHistory()` and `updateMedicalHistory()`.

### 2.4 Abstraction
* **Definition**: Exposing essential characteristics while suppressing internal operational complexity.
* **SHMS Example**: The `PaymentProcessor` interface exposing `processPayment(amount)` without revealing internal credit card validation or banking network handshake algorithms.

### 2.5 Inheritance
* **Definition**: A mechanism where a child subclass derives attributes and behavior from a parent superclass.
* **SHMS Example**: Subclasses `Doctor`, `Receptionist`, and `Pharmacist` inheriting `userId`, `name`, `email`, and `login()` from the superclass `User`.

### 2.6 Polymorphism
* **Definition**: The ability of different objects to respond to the exact same message invocation in specialized ways.
* **SHMS Example**: Calling `generateBill()` on a `BillingController` polymorphically delegating charge calculations differently for Outpatient (`OPBill`) vs Inpatient (`IPBill`).

### 2.7 Association
* **Definition**: A structural relationship specifying that objects of one class are connected to objects of another.
* **SHMS Example**: `Patient` *books* `Appointment` (1-to-many association).

### 2.8 Aggregation
* **Definition**: A specialized "has-a" relationship where child objects can exist independently of the container parent object (weak ownership).
* **SHMS Example**: `Department` aggregates `Doctor`. If a department is renamed or reorganized, the doctor object continues to exist independently in the system.

### 2.9 Composition
* **Definition**: A strict "part-whole" relationship where child objects cannot exist without the parent container (strong lifecycle ownership).
* **SHMS Example**: `MedicalRecord` compositionally owns `Consultation` notes. Destroying a patient's medical record purges its consultation entries.

### 2.10 Dependency
* **Definition**: A weak "uses-a" relationship where a change in one class may affect another class that uses it.
* **SHMS Example**: `ConsultationController` depends on `NotificationService` to send SMS alerts to patients.

### 2.11 Generalization
* **Definition**: The process of extracting shared properties from multiple subclasses to establish a common superclass taxonomy.
* **SHMS Example**: Generalizing `Doctor`, `Receptionist`, `Pharmacist`, `LabTechnician`, `Cashier`, and `Admin` into `User`.

---

## 3. Classification of UML Diagrams

```text
                                  UML 2.5 Diagrams
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
  Structural Diagrams            Behavioral Diagrams            Interaction Diagrams
  (Static Architecture)         (Dynamic Behavior)              (Object Communication)
  - Class Diagram                - Activity Diagram              - Sequence Diagram
  - Package Diagram              - State Machine Diagram         - Communication Diagram
  - Component Diagram            - Use Case Diagram              - Interaction Overview
  - Deployment Diagram                                           - Timing Diagram
```
