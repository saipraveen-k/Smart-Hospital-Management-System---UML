# SMART HOSPITAL MANAGEMENT SYSTEM (SHMS)
## Master UML & OOAD Laboratory Record

> **Course**: Bachelor of Technology (B.Tech) — Computer Science & Engineering / Information Technology  
> **Subject**: Object-Oriented Analysis and Design (OOAD) & Software Engineering Laboratory  
> **Academic Session**: 2026  
> **Student Name**: `[Student Name]`  
> **Register Number**: `[Register Number]`  
> **Department**: `[Department of Computer Science & Engineering]`  
> **Institution**: `[Institution / University Name]`  

---

## CERTIFICATE

This is to certify that this laboratory record entitled **"SMART HOSPITAL MANAGEMENT SYSTEM (SHMS) — OBJECT-ORIENTED ANALYSIS AND DESIGN LABORATORY RECORD"** is a bonafide record of work done by **`[Student Name]`** (Reg. No: **`[Register Number]`**) in partial fulfillment of the requirements for the award of the degree of **Bachelor of Technology** in Computer Science & Engineering / Information Technology during the academic year 2026.

<br/>

```text
_____________________                         _____________________
   Faculty In-Charge                             Head of Department
  [Faculty Name]                                 [HOD Name]
```

<br/>

**Internal Examiner Signature**: _______________________  
**External Examiner Signature**: _______________________  
**Date of Examination**: `[Date]`  

---

## ACKNOWLEDGEMENT

I express my sincere gratitude to **`[Institution Name]`** for providing the infrastructure and environment to complete this Object-Oriented Analysis and Design (OOAD) laboratory project.

I am deeply indebted to my faculty supervisor **`[Faculty Name]`** for their valuable guidance, continuous support, and constructive feedback throughout the course of this work.

Finally, I express my appreciation to my peers for their collaborative insights during domain analysis and UML diagram verification.

---

## TABLE OF CONTENTS

1. **System Overview & Problem Statement**
2. **Assumptions Log (`assumptions.md`)**
3. **Experiment 1**: OOAD Fundamentals & UML Tool Familiarization
4. **Experiment 2**: Requirement Engineering & Software Requirements Specification (SRS)
5. **Experiment 3**: Use Case Modelling & Detailed Specifications
6. **Experiment 4**: Domain Analysis & Conceptual Class Modelling
7. **Experiment 5**: System & High-Level Interaction Modelling (SSD & HLSD)
8. **Experiment 6**: Detailed Object Design & 3-Layer BCE Architecture
9. **Experiment 7**: Design Class Modelling, Interfaces & Dependencies
10. **Experiment 8**: Behavioural Modelling (Activity & State Machine Diagrams)
11. **Requirement Traceability Matrix (RTM)**
12. **Master Diagram Index**
13. **Conclusion & Future Scope**
14. **Viva Voce Question Bank (50 Q&A)**

---

## 1. System Overview & Problem Statement

The **Smart Hospital Management System (SHMS)** is an integrated enterprise healthcare software solution designed to automate, streamline, and audit clinical, operational, and financial hospital workflows. SHMS integrates 8 core functional modules across 6 Primary Actors (`Patient`, `Receptionist`, `Doctor`, `Pharmacist`, `Lab Technician`, `Cashier`) and 1 Supporting / Managerial Actor (`Admin`):

1. **Patient Registration**: Demographic capture, UHID generation, profile management.
2. **Appointment & OP Management**: Doctor schedule configuration, slot booking, OP check-in, queue token management.
3. **Inpatient (IP) Management**: IP admission recommendation, bed/ward allocation, treatment tracking, discharge processing.
4. **Laboratory Management**: Test ordering, sample collection barcoding, test execution, result entry, report approval.
5. **Pharmacy & Inventory**: Prescription verification, medicine dispensing, inventory auto-deduction, low stock alerting.
6. **Billing & Payment Settlement**: Multi-service charge aggregation, discount application, multi-mode payment processing (Cash/Card/UPI), receipt generation.
7. **Reports & Analytics**: Operational, financial, and clinical analytical report generation.
8. **Security & Administration**: User account provisioning, RBAC configuration, system master lookup tables, security audit trails.

---

## 2. Assumptions Log

*(Refer to [`assumptions.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/assumptions.md) for complete details `A-01` to `A-15`.)*

Key highlights:
- `A-01`: Abstract `User` superclass for all human actors.
- `A-02`: Strategy pattern interface `PaymentProcessor` for multi-mode payment gateways.
- `A-03`: Single active admission invariant per patient (`BR-09`).
- `A-05`: Mandatory doctor digital signature verification before drug dispensing.
- `A-10`: Automated multi-service charge consolidation into a single bill.

---

## 3. Experiment 1: OOAD Fundamentals & UML Tooling

*(Refer to [`experiment-01/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-01/README.md).)*

- **Aim**: Study SDLC phases, OOAD principles, UML diagram taxonomy, and Mermaid.js text-based diagram representations.
- **Deliverables**:
  - `ooad-fundamentals.md`
  - `uml-tool-familiarization.md`
  - `basic-class-diagram.mmd`
  - `relationships-class-diagram.mmd`

---

## 4. Experiment 2: Requirement Engineering & SRS

*(Refer to [`experiment-02/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-02/README.md).)*

- **Aim**: Formulate IEEE 830 compliant SRS, stakeholder analysis (6 Primary Actors, 1 Supporting/Managerial Actor), 30 functional requirements (`FR-01` to `FR-30`), 11 NFRs, business rules (`BR-01` to `BR-10`), scope boundary, and Event Table.
- **Deliverables**:
  - `SRS.md`, `stakeholders.md`, `functional-requirements.md`, `non-functional-requirements.md`, `business-rules.md`, `scope.md`, `event-list.md`, `event-table.md`.

---

## 5. Experiment 3: Use Case Modelling

*(Refer to [`experiment-03/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-03/README.md).)*

- **Note on Mermaid.js Representation**: Because Mermaid.js does not provide a native UML Use Case Diagram syntax, the use-case model is represented using Mermaid flowchart notation (`flowchart LR`) while preserving UML actor, system-boundary, include, extend, and generalization semantics.
- **Aim**: Model system use cases, define actor relationships, structure 9 subsystem packages, and author 12 detailed use case specifications.
- **Deliverables**:
  - `actors.md`, `use-cases.md`, `use-case-packages.md`, `use-case-specifications.md`, `use-case-diagram.mmd`, `use-case-package-diagrams.mmd`.

---

## 6. Experiment 4: Domain Analysis & Conceptual Modelling

*(Refer to [`experiment-04/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-04/README.md).)*

- **Aim**: Identify 34+ conceptual domain entities via noun extraction, classify into Entity-Boundary-Control (BCE) patterns, define domain multiplicity constraints, and construct Domain Class Diagrams.
- **Deliverables**:
  - `domain-analysis.md`, `domain-classes.md`, `entity-boundary-control.md`, `constraints.md`, `domain-model.mmd`, `domain-class-diagram.mmd`.

---

## 7. Experiment 5: System & High-Level Interaction Modelling (SSD & HLSD)

*(Refer to [`experiment-05/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-05/README.md).)*

- **Aim**: Model black-box System Sequence Diagrams for 9 use cases and High-Level Sequence Diagrams for core subsystems.
- **Deliverables**:
  - 9 System Sequence Diagrams (`system-sequence-diagrams/`)
  - 5 High-Level Sequence Diagrams (`high-level-sequence-diagrams/`)

---

## 8. Experiment 6: Detailed Object Design & 3-Layer BCE Architecture

*(Refer to [`experiment-06/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-06/README.md).)*

- **Aim**: Construct detailed BCE sequence diagrams with activation lifelines (`Actor` -> `UI` -> `Controller` -> `Entity`), author numbered UML Communication Diagrams, and model the 3-Layer BCE Architecture.
- **Deliverables**:
  - 8 Detailed Sequence Diagrams (`detailed-sequence-diagrams/`)
  - 8 Numbered Communication Diagrams (`communication-diagrams/`)
  - `bce-architecture.mmd`

---

## 9. Experiment 7: Design Class Modelling, Interfaces & Dependencies

*(Refer to [`experiment-07/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-07/README.md).)*

- **Aim**: Transform domain models into complete software Design Class Diagrams with visibility modifiers (`+`, `-`, `#`), parameter signatures, return types, interfaces, and dependency realizations.
- **Deliverables**:
  - `design-class-model.md`, `design-class-diagram.mmd`, `interfaces-and-dependencies.mmd`.

---

## 10. Experiment 8: Behavioural Modelling (Activity & State Machines)

*(Refer to [`experiment-08/README.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/experiment-08/README.md).)*

- **Aim**: Model workflow activity graphs with decision nodes and swimlanes, and capture lifecycle state machine transitions for core entities.
- **Deliverables**:
  - `behavioural-model.md`
  - 9 Activity Diagrams (`activity-diagrams/`)
  - 5 State Machine Diagrams (`state-machine-diagrams/`)

---

## 11. Requirement Traceability Matrix (RTM)

*(Refer to [`traceability-matrix.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/final-documentation/traceability-matrix.md) for full mapping across `FR-01` to `FR-30`.)*

---

## 12. Master Diagram Index

*(Refer to [`diagram-index.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/final-documentation/diagram-index.md) for catalog of all 53 Mermaid diagrams.)*

---

## 13. Conclusion & Future Scope

### Conclusion
The Object-Oriented Analysis and Design (OOAD) laboratory project for the **Smart Hospital Management System (SHMS)** has been successfully completed. The system requirements were systematically analyzed, engineered into an IEEE 830 SRS, and transformed across 8 curriculum experiments into formal UML 2.5 diagrams. Complete forward and backward traceability across requirements, use cases, domain entities, BCE sequence interactions, design class structures, and state machine lifecycles has been achieved.

### Future Scope
1. **Microservices Decomposition**: Transforming the monolithic 3-Layer BCE architecture into decoupled microservices communicating via asynchronous message brokers.
2. **AI-Driven Clinical Decision Support**: Integrating machine learning diagnostic recommendation models into `ConsultationController`.
3. **HL7 / FHIR Integration**: Supporting standardized HL7 FHIR electronic health record data exchange formats with external health networks.

---

## 14. Viva Voce Question Bank

*(Refer to [`viva-questions.md`](file:///c:/tempp/clg/5th%20sem/uml/Smart%20Hospital%20Management%20System%20%E2%80%94%20UML/final-documentation/viva-questions.md) for complete 50 Q&A guide.)*
