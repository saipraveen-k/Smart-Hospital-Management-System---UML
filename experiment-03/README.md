# Experiment 3: Use Case Modelling

## Lab Record Header
- **Experiment Number**: 03
- **Title**: Use Case Diagramming and Use Case Specification Analysis
- **Date**: Academic Session 2026

---

> **Note on Mermaid.js UML Representation**:  
> Because Mermaid.js does not provide a native UML Use Case Diagram syntax, the use-case model is represented using Mermaid flowchart notation (`flowchart LR`) while preserving UML actor, system-boundary, include, extend, and generalization semantics.

---

## 1. Aim
To identify system actors (6 Primary Actors, 1 Supporting/Managerial Actor), model functional use cases, structure use case packages, define `<<include>>` and `<<extend>>` relationships, author formal use case specifications, and generate standard UML Use Case Diagrams for the Smart Hospital Management System (SHMS).

---

## 2. Objectives
1. Detail actor catalogs distinguishing 6 Primary Actors (`Patient`, `Receptionist`, `Doctor`, `Pharmacist`, `Lab Technician`, `Cashier`) and 1 Supporting / Managerial Actor (`Admin`).
2. Formulate 35 use cases categorized across 9 subsystem packages.
3. Model semantically justified UML `<<include>>` and `<<extend>>` relationships:
   - `Book Appointment` `<<include>>` `Select Department`, `Select Doctor`, `Check Doctor Availability`, `Generate Appointment`.
   - `Doctor Consultation` `<<extend>>` `Request Laboratory Test`, `Recommend Inpatient Admission`.
   - `Billing and Payment` `<<include>>` `Calculate Charges`, `Process Payment`, `Generate Receipt`.
4. Author 12 detailed use case specifications covering primary flows, alternative flows, exception scenarios, preconditions, and postconditions.
5. Author standard Mermaid `.mmd` diagrams for system-wide and package-level use case representations.

---

## 3. Documents & Diagrams Created
1. `actors.md` — Detailed catalog of system actors.
2. `use-cases.md` — Complete enumeration of use cases per actor.
3. `use-case-packages.md` — Subsystem packaging organization.
4. `use-case-specifications.md` — 12 fully elaborated use case specifications.
5. `use-case-diagram.mmd` — System-wide master UML Use Case Diagram script.
6. `use-case-package-diagrams.mmd` — Package-level Use Case Diagram scripts.

---

## 4. Procedure
1. Analyzed functional requirements (`FR-01` to `FR-30`) from Experiment 2.
2. Mapped operational tasks for `Patient`, `Receptionist`, `Doctor`, `Lab Technician`, `Pharmacist`, `Cashier` (Primary Actors) and `Admin` (Supporting / Managerial Actor).
3. Applied UML relationship semantics:
   - `<<include>>`: Mandatory sub-processes (e.g. `Book Appointment` includes `Check Doctor Availability`).
   - `<<extend>>`: Optional/Conditional flows (e.g. `Request Laboratory Test` extends `Doctor Consultation`).
4. Authored tabular specifications detailing step-by-step main success flows and exception handling.

---

## 5. Result
The functional behavior of SHMS was comprehensively captured through formalized use cases and validated Mermaid diagrams.

---

## 6. Conclusion
Experiment 3 establishes the behavioral contract between actors and the system, providing the direct foundation for object interaction modeling (Experiment 5 & 6).
