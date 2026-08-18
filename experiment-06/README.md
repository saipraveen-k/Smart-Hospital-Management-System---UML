# Experiment 6: Detailed Object Design & BCE Architecture

## Lab Record Header
- **Experiment Number**: 06
- **Title**: Detailed BCE Object Interaction Sequence & Numbered Communication Diagrams
- **Date**: Academic Session 2026

---

## 1. Aim
To construct detailed Object Design Sequence Diagrams applying the 3-Layer **Boundary-Control-Entity (BCE)** architectural pattern (with `alt`, `opt`, `loop`, and activation bars), author numbered UML Communication Diagrams, and detail the complete BCE System Architecture for the Smart Hospital Management System (SHMS).

---

## 2. Objectives
1. Implement detailed object interactions adhering strictly to `Boundary UI` -> `Control Class` -> `Entity / Repository` call flows.
2. Author 8 Detailed Sequence Diagrams (`dsd-01` to `dsd-08`) with activation lifelines and conditional logic blocks (`alt` / `opt`).
3. Author 8 UML Communication Diagrams (`com-01` to `com-08`) using numbered message syntax (`1:`, `1.1:`, `1.2:`).
4. Construct a unified 3-Layer BCE System Architectural Diagram script (`bce-architecture.mmd`).

---

## 3. Documents & Diagrams Created

### Detailed Sequence Diagrams (`detailed-sequence-diagrams/`)
1. `dsd-01-patient-registration.mmd` — Detailed Patient Registration BCE Sequence
2. `dsd-02-appointment-booking.mmd` — Detailed Appointment Booking BCE Sequence
3. `dsd-03-doctor-consultation.mmd` — Detailed Doctor Consultation BCE Sequence
4. `dsd-04-laboratory-testing.mmd` — Detailed Laboratory Testing BCE Sequence
5. `dsd-05-pharmacy-dispensing.mmd` — Detailed Pharmacy Dispensing BCE Sequence
6. `dsd-06-inpatient-admission.mmd` — Detailed Inpatient Admission BCE Sequence
7. `dsd-07-billing-and-payment.mmd` — Detailed Billing & Payment BCE Sequence
8. `dsd-08-discharge.mmd` — Detailed Inpatient Discharge BCE Sequence

### Communication Diagrams (`communication-diagrams/`)
1. `com-01-patient-registration.mmd` — Patient Registration Communication Diagram
2. `com-02-appointment-booking.mmd` — Appointment Booking Communication Diagram
3. `com-03-doctor-consultation.mmd` — Doctor Consultation Communication Diagram
4. `com-04-laboratory-testing.mmd` — Laboratory Testing Communication Diagram
5. `com-05-pharmacy-dispensing.mmd` — Pharmacy Dispensing Communication Diagram
6. `com-06-inpatient-admission.mmd` — Inpatient Admission Communication Diagram
7. `com-07-billing-and-payment.mmd` — Billing & Payment Communication Diagram
8. `com-08-discharge.mmd` — Inpatient Discharge Communication Diagram

### BCE Architecture Diagram
1. `bce-architecture.mmd` — 3-Layer Boundary-Control-Entity Master Architecture

---

## 4. Procedure
1. Analyzed BCE class mappings established in Experiment 4.
2. Modeled explicit object lifelines: `Actor` -> `Boundary UI` -> `Controller` -> `Repository` -> `Entity`.
3. Embedded UML control structures (`alt` for success/failure branches, `opt` for optional orders, `loop` for item processing).
4. Modeled UML Communication Diagrams using Mermaid `flowchart` with numbered method invocation labels.

---

## 5. Result
The detailed object interaction design and 3-Layer BCE architecture were fully established and rendered in valid Mermaid syntax.

---

## 6. Conclusion
Experiment 6 provides the low-level method invocation and object interaction specifications necessary for constructing the formal Design Class Diagram (Experiment 7).
