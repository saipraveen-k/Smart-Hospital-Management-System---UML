# Experiment 5: System & High-Level Interaction Modelling (SSD & HLSD)

## Lab Record Header
- **Experiment Number**: 05
- **Title**: System Sequence Diagrams (SSD) & High-Level Sequence Diagrams (HLSD)
- **Date**: Academic Session 2026

---

## 1. Aim
To model system interaction boundaries using System Sequence Diagrams (SSD) for 9 major use cases, and construct High-Level Sequence Diagrams (HLSD) demonstrating initial controller-entity interactions for core hospital operations in the Smart Hospital Management System (SHMS).

---

## 2. Objectives
1. Understand the distinction between black-box System Sequence Diagrams (Actor <-> System) and High-Level Sequence Diagrams.
2. Author 9 System Sequence Diagrams (`ssd-01` to `ssd-09`) covering key system workflows.
3. Author 5 High-Level Sequence Diagrams (`hlsd-01` to `hlsd-05`) introducing initial subsystem controllers and domain entity targets.
4. Ensure 100% diagram alignment with functional requirements and use case specifications.

---

## 3. Documents & Diagrams Created

### System Sequence Diagrams (`system-sequence-diagrams/`)
1. `ssd-01-patient-registration.mmd` — Patient Registration SSD
2. `ssd-02-appointment-booking.mmd` — Appointment Booking SSD
3. `ssd-03-op-checkin.mmd` — OP Arrival Check-In SSD
4. `ssd-04-doctor-consultation.mmd` — Doctor Consultation SSD
5. `ssd-05-laboratory-testing.mmd` — Laboratory Testing SSD
6. `ssd-06-pharmacy-dispensing.mmd` — Pharmacy Dispensing SSD
7. `ssd-07-inpatient-admission.mmd` — Inpatient Admission SSD
8. `ssd-08-billing-and-payment.mmd` — Billing & Payment SSD
9. `ssd-09-discharge.mmd` — Inpatient Discharge SSD

### High-Level Sequence Diagrams (`high-level-sequence-diagrams/`)
1. `hlsd-01-patient-registration.mmd` — High-Level Registration Sequence
2. `hlsd-02-appointment-booking.mmd` — High-Level Appointment Booking Sequence
3. `hlsd-03-doctor-consultation.mmd` — High-Level Doctor Consultation Sequence
4. `hlsd-04-laboratory-testing.mmd` — High-Level Laboratory Sequence
5. `hlsd-05-billing-and-payment.mmd` — High-Level Billing & Payment Sequence

---

## 4. Procedure
1. Extracted interaction scenarios from Use Case Specifications (`UC-01` to `UC-33`).
2. Modeled black-box actor-system message exchanges for SSDs (System hides internal class implementation).
3. Introduced high-level architectural components (`Controller`, `Entity Repository`) for HLSDs.
4. Formulated Mermaid `sequenceDiagram` scripts with return parameters and system status feedback.

---

## 5. Result
System boundaries and high-level object interactions were successfully modeled and validated.

---

## 6. Conclusion
Experiment 5 bridges requirements analysis and detailed software design, providing the prerequisite interaction blueprints for Experiment 6 (Detailed BCE Sequence Diagrams).
