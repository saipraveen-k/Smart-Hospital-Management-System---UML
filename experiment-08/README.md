# Experiment 8: Behavioural Modelling (Activity & State Machine Diagrams)

## Lab Record Header
- **Experiment Number**: 08
- **Title**: Behavioural Workflow Activity Diagramming & State Machine Lifecycle Modelling
- **Date**: Academic Session 2026

---

## 1. Aim
To model operational workflows using Activity Diagrams (with decision nodes, parallel branches, and swimlanes) for 8 core modules plus the overall hospital workflow, and capture complete lifecycle state transitions using UML State Machine Diagrams (`stateDiagram-v2`) for key entities in the Smart Hospital Management System (SHMS).

---

## 2. Objectives
1. Model procedural workflows using Mermaid `flowchart TD` activity representations.
2. Author 9 Activity Diagrams (`act-01` to `act-09`) including decision branches for `Laboratory Test Required?` and `Admission Required?`.
3. Explicitly construct swimlane subgraphs (`Patient`, `Receptionist`, `Doctor`, `Lab Technician`, `Pharmacist`, `Cashier`, `Admin`, `System`) for the master hospital workflow.
4. Author 5 complete State Machine Diagrams (`stm-01` to `stm-05`) for `Appointment`, `LabTestOrder`, `Admission`, `Payment`, and `Prescription` lifecycles.

---

## 3. Documents & Diagrams Created

### Narrative & Specifications
1. `behavioural-model.md` — Narrative analysis of workflow activities and state transitions.

### Activity Diagrams (`activity-diagrams/`)
1. `act-01-patient-registration.mmd` — Patient Registration Activity
2. `act-02-appointment-booking.mmd` — Appointment Booking Activity
3. `act-03-doctor-consultation.mmd` — Doctor Consultation Activity
4. `act-04-laboratory-testing.mmd` — Laboratory Testing Activity
5. `act-05-pharmacy-dispensing.mmd` — Pharmacy Dispensing Activity
6. `act-06-inpatient-admission.mmd` — Inpatient Admission Activity
7. `act-07-billing-and-payment.mmd` — Billing & Payment Activity
8. `act-08-discharge.mmd` — Inpatient Discharge Activity
9. `act-09-overall-hospital-workflow.mmd` — Master Overall Hospital Workflow with Swimlanes & Decision Forks

### State Machine Diagrams (`state-machine-diagrams/`)
1. `stm-01-appointment.mmd` — Appointment State Machine (`Requested` -> `Confirmed` -> `CheckedIn` -> `InConsultation` -> `Completed` / `Cancelled` / `NoShow`)
2. `stm-02-lab-test.mmd` — Lab Test State Machine (`Requested` -> `SamplePending` -> `SampleCollected` -> `Processing` -> `ResultEntered` -> `Approved` -> `Reported` / `Cancelled`)
3. `stm-03-admission.mmd` — Admission State Machine (`Requested` -> `Admitted` -> `BedAllocated` -> `UnderTreatment` -> `DischargeInitiated` -> `Discharged` / `Cancelled`)
4. `stm-04-payment.mmd` — Payment State Machine (`Pending` -> `Processing` -> `Paid` / `Failed` / `Refunded`)
5. `stm-05-prescription.mmd` — Prescription State Machine (`Created` -> `Verified` -> `PartiallyDispensed` -> `Dispensed` / `Cancelled`)

---

## 4. Procedure
1. Analyzed decision logic from the source SHMS document (`Smart_Hospital_Management_System.pdf`).
2. Mapped activity flows with initial nodes, action states, decision diamonds, merge nodes, and final nodes.
3. Formulated state machine transitions with explicit trigger events and guard conditions (`[bill.status == Paid]`).

---

## 5. Result
The dynamic behavioral workflows and state transition rules of SHMS were fully established and rendered in valid Mermaid syntax.

---

## 6. Conclusion
Experiment 8 provides complete dynamic behavior modeling, finalizing the OOAD lab specification required for full system verification and traceability.
