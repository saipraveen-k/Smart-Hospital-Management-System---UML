# Software Requirements Specification (SRS) for Smart Hospital Management System (SHMS)

**Document Standard**: IEEE 830-1998 Compliant Specification  
**System Name**: Smart Hospital Management System (SHMS)  

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) specifies the complete functional and non-functional requirements for the **Smart Hospital Management System (SHMS)**. SHMS is an integrated enterprise software solution automating patient registration, outpatient scheduling, inpatient bed management, laboratory testing, pharmacy inventory, multi-service billing, clinical analytics, and security administration.

### 1.2 Scope
SHMS covers the digital transformation of hospital operational workflows across 8 core modules:
1. Patient Registration Module
2. Appointment and Outpatient (OP) Management Module
3. Inpatient (IP) Management Module
4. Laboratory Management Module
5. Pharmacy and Inventory Management Module
6. Billing and Payment Settlement Module
7. Reports and Clinical Analytics Module
8. Security and Administration Module

### 1.3 System Overview
SHMS is designed as a secure, multi-user web application utilizing Role-Based Access Control (RBAC). It connects 7 distinct human actor roles (`Patient`, `Receptionist`, `Doctor`, `Lab Technician`, `Pharmacist`, `Cashier`, `Admin`) to central databases, facilitating seamless clinical collaboration and accurate financial tracking.

### 1.4 Intended Audience & Reading Suggestions
* **Software Architects & Developers**: For designing component models, APIs, and database schemas.
* **UML / OOAD Engineers**: For mapping functional requirements into Use Case Diagrams, BCE Sequence Diagrams, Design Class Diagrams, and State Machines.
* **QA & Test Engineers**: For deriving test suites, validation criteria, and traceability matrices.
* **Hospital Management & Auditors**: For validating system operational scope and compliance features.

### 1.5 Definitions, Acronyms, and Abbreviations
* **SHMS**: Smart Hospital Management System
* **OP**: Outpatient
* **IP**: Inpatient
* **BCE**: Boundary-Control-Entity architectural pattern
* **RBAC**: Role-Based Access Control
* **UHID**: Unique Health Identification Number (Patient ID)
* **SRS**: Software Requirements Specification

---

## 2. Overall Description

### 2.1 Product Perspective
SHMS operates as an independent enterprise application interfacing with external client web browsers, local barcoding hardware (for samples and medicine stock), and third-party payment gateways (`PaymentProcessor`).

### 2.2 Product Functions Overview
* **Demographic Registration**: Capturing patient profile data and issuing unique UHIDs.
* **OP Queue Management**: Booking slots and auto-issuing consultation tokens.
* **Clinical Consultation**: Electronic health recording, prescription issuance, and lab order placement.
* **Diagnostic Pipeline**: Sample collection, test processing, and electronic lab report distribution.
* **Inpatient Lifecycle**: Bed tracking, ward allocation, daily treatment logs, and discharge workflow.
* **Pharmacy Operations**: Doctor prescription validation, inventory auto-deduction, and low-stock notification.
* **Financial Settlement**: Multi-department bill consolidation, discount calculation, receipt generation, and payment processing.
* **System Administration**: RBAC policy enforcement, doctor scheduling configuration, and security audit logging.

### 2.3 User Classes and Characteristics
1. **Patient**: End-user accessing portal to book slots, view reports, and settle bills online.
2. **Receptionist**: Operational desk staff processing registrations, queue check-ins, and bed allocations.
3. **Doctor**: Licensed medical practitioner inputting diagnoses, orders, and treatment notes.
4. **Lab Technician**: Clinical lab technician handling test specimens and recording test parameters.
5. **Pharmacist**: Certified pharmacy staff dispensing medicines and maintaining inventory counts.
6. **Cashier**: Finance desk staff collecting payments and issuing official payment receipts.
7. **Admin**: System administrator managing user credentials, security policies, and system master tables.

### 2.4 Operating Environment
* **Server**: Node.js / Java enterprise runtime, relational database server (PostgreSQL / MySQL).
* **Client**: Standard HTML5 web browsers (Chrome, Edge, Firefox, Safari) running on PC, tablet, or kiosk terminals.

### 2.5 Design and Implementation Constraints
* All system actions must strictly adhere to defined Role-Based Access Control (RBAC).
* Financial transactions must enforce ACID compliance and single-receipt settlement.
* Medical information access must comply with data privacy standards and audit logging.

---

## 3. Specific Requirements

*(Refer to `functional-requirements.md`, `non-functional-requirements.md`, and `business-rules.md` for complete enumerated details.)*
