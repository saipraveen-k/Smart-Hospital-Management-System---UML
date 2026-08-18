# Smart Hospital Management System (SHMS) — UML / OOAD Laboratory Project

> **Academic Course**: B.Tech Object-Oriented Analysis & Design (OOAD) / Software Engineering Laboratory  
> **Primary Source Document**: `Smart_Hospital_Management_System.pdf`  
> **Modelling Standard**: UML 2.5 Standard via Mermaid.js & Markdown Specifications  

---

## 1. Executive Overview

The **Smart Hospital Management System (SHMS)** is an integrated enterprise healthcare solution designed to automate, streamline, and audit end-to-end clinical, administrative, and financial hospital workflows. This repository contains the complete **Object-Oriented Analysis and Design (OOAD)** laboratory project, covering all 8 curriculum experiments, from requirements engineering and domain modeling to object interaction, detailed design class modeling, and state machine behavioral analysis.

---

## 2. System Architecture & Core Modules

SHMS is architected around a 3-Layer **Boundary-Control-Entity (BCE)** design pattern, integrating 8 primary functional modules:

1. **Patient Registration**: Demographic capture, identification, and profile management.
2. **Appointment & OP Management**: Scheduling, doctor availability verification, queue tokening, and outpatient check-in.
3. **Inpatient (IP) Management**: Bed allocation, ward management, inpatient treatment tracking, and discharge approval.
4. **Laboratory Management**: Test ordering, sample collection, test processing, result entry, and report upload/verification.
5. **Pharmacy & Inventory**: Prescription verification, medicine dispensing, inventory auto-deduction, and low-stock alerting.
6. **Billing & Payment**: Multi-service charge aggregation, discount application, multi-mode payment settlement, and receipt generation.
7. **Reports & Analytics**: Clinical, operational, and financial analytics report generation.
8. **Security & Administration**: Role-Based Access Control (RBAC), user lifecycle management, system settings, and security audit logging.

---

## 3. System Actors

| Actor | Type | Primary Responsibilities |
| :--- | :--- | :--- |
| **Patient** | Primary | Registers account, books appointments, views prescriptions/reports, pays bills, attends follow-ups. |
| **Receptionist** | Primary | Registers walk-in patients, manages appointments, processes OP check-ins, allocates beds, initiates discharge. |
| **Doctor** | Primary | Conducts consultations, records diagnoses, creates prescriptions, orders lab tests, manages IP care, approves discharge. |
| **Pharmacist** | Supporting | Verifies doctor prescriptions, checks inventory, dispenses medicine, generates pharmacy bills, receives alerts. |
| **Lab Technician** | Supporting | Receives test requests, collects samples, processes lab tests, inputs results, uploads approved reports. |
| **Cashier** | Supporting | Generates consolidated bills, applies discounts, processes payments (Cash/Card/UPI), issues official receipts. |
| **Admin** | Managerial | Manages users and roles, configures doctor/department data, monitors security, reviews system audit logs. |

---

## 4. End-to-End Hospital Workflow

```text
Patient Registration
  │
  ▼
Appointment Booking ──► OP Check-In ──► Doctor Consultation
                                              │
                    ┌─────────────────────────┴────────────────────────┐
                    ▼                                                  ▼
         [Lab Test Required?]                                [Admission Required?]
            ├── YES ──► Sample Collection                       ├── YES ──► Bed Allocation
            │           Test Processing                                     Inpatient Care
            │           Report Upload                                       Discharge Prep
            │           Doctor Review                                       │
            │                 │                                             │
            └── NO ───────────┴─────────────────────────────────────────────┘
                                              │
                                              ▼
                                    Prescription & Pharmacy
                                              │
                                              ▼
                                      Billing & Payment
                                              │
                                              ▼
                                     Receipt & Follow-Up
```

---

## 5. Repository Directory Structure

```text
smart-hospital-uml/
├── README.md                           # Master Project Readme
├── assumptions.md                      # Log of OOAD & Design Assumptions (A-01 to A-15)
├── source/
│   └── Smart_Hospital_Management_System.pdf # Primary Source Reference Document
│
├── experiment-01/                      # Exp 1: OOAD Fundamentals & UML Tooling
│   ├── README.md
│   ├── ooad-fundamentals.md
│   ├── uml-tool-familiarization.md
│   ├── basic-class-diagram.mmd
│   └── relationships-class-diagram.mmd
│
├── experiment-02/                      # Exp 2: Requirement Engineering & SRS
│   ├── README.md
│   ├── SRS.md
│   ├── stakeholders.md
│   ├── functional-requirements.md
│   ├── non-functional-requirements.md
│   ├── business-rules.md
│   ├── scope.md
│   ├── event-list.md
│   └── event-table.md
│
├── experiment-03/                      # Exp 3: Use Case Modelling
│   ├── README.md
│   ├── actors.md
│   ├── use-cases.md
│   ├── use-case-packages.md
│   ├── use-case-specifications.md
│   ├── use-case-diagram.mmd
│   └── use-case-package-diagrams.mmd
│
├── experiment-04/                      # Exp 4: Domain Analysis & Conceptual Modelling
│   ├── README.md
│   ├── domain-analysis.md
│   ├── domain-classes.md
│   ├── entity-boundary-control.md
│   ├── constraints.md
│   ├── domain-model.mmd
│   └── domain-class-diagram.mmd
│
├── experiment-05/                      # Exp 5: System & High-Level Interaction Modelling
│   ├── README.md
│   ├── system-sequence-diagrams/       # 9 System Sequence Diagrams (.mmd)
│   └── high-level-sequence-diagrams/  # 5 High-Level Sequence Diagrams (.mmd)
│
├── experiment-06/                      # Exp 6: Detailed Object Design & BCE Architecture
│   ├── README.md
│   ├── detailed-sequence-diagrams/     # 8 Detailed BCE Sequence Diagrams (.mmd)
│   ├── communication-diagrams/        # 8 Numbered UML Communication Diagrams (.mmd)
│   └── bce-architecture.mmd            # 3-Layer Architecture Diagram (.mmd)
│
├── experiment-07/                      # Exp 7: Design Class Modelling & Interfaces
│   ├── README.md
│   ├── design-class-model.md
│   ├── design-class-diagram.mmd
│   └── interfaces-and-dependencies.mmd
│
├── experiment-08/                      # Exp 8: Behavioural Modelling
│   ├── README.md
│   ├── behavioural-model.md
│   ├── activity-diagrams/              # 9 Workflow Activity Diagrams (.mmd)
│   └── state-machine-diagrams/         # 5 State Machine Diagrams (.mmd)
│
└── final-documentation/                # Lab Record & Evaluation Deliverables
    ├── complete-lab-record.md          # Unified B.Tech Lab Record Document
    ├── viva-questions.md               # 50+ OOAD/UML Viva Questions & Answers
    ├── diagram-index.md                # Comprehensive Diagram Catalog
    └── traceability-matrix.md          # End-to-End Requirement Traceability
```

---

## 6. Rendering Mermaid Diagrams

All diagrams in this project are authored in valid standard **Mermaid.js** format (`.mmd`).

### Viewing Options:
1. **VS Code / IDE Extension**: Install *Markdown Preview Mermaid Support* or *Mermaid Chart*.
2. **Mermaid Live Editor**: Copy `.mmd` contents into [mermaid.live](https://mermaid.live).
3. **GitHub / Gitlab Rendering**: Direct native preview when browsing `.md` or `.mmd` files on GitHub.
4. **Command Line Rendering**:
   ```bash
   npx @mermaid-js/mermaid-cli -i experiment-07/design-class-diagram.mmd -o output.png
   ```

---

## 7. Curriculum & Traceability Audit Summary

- **Functional Requirements**: 30 (`FR-01` to `FR-30`)
- **Use Cases**: 35 across 9 packages (12 fully specified)
- **Domain Entities**: 34 with strict multiplicities and invariants
- **Design Classes**: 42 with full visibility, signatures, and interfaces
- **Sequence Diagrams**: 22 (9 SSDs, 5 HLSDs, 8 Detailed BCE DSDs)
- **Communication Diagrams**: 8 numbered message flows
- **Activity Diagrams**: 9 workflow graphs with decision nodes & swimlanes
- **State Machines**: 5 complete lifecycle diagrams (`Appointment`, `LabTest`, `Admission`, `Payment`, `Prescription`)
- **Traceability**: 100% forward and backward traceability across all artifacts.
