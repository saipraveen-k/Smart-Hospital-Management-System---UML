# Entity-Boundary-Control (BCE) Architectural Classification

This document classifies all SHMS system abstractions into Entity, Boundary, and Control architectural stereotypes based on the 3-Layer BCE pattern.

---

## 1. Architectural Pattern Overview

```text
               ┌────────────────┐
               │    Boundary    │ (User Interface Screens / Forms)
               └───────┬────────┘
                       │
                       ▼
               ┌────────────────┐
               │    Control     │ (Workflow Controllers & Service Logic)
               └───────┬────────┘
                       │
                       ▼
               ┌────────────────┐
               │     Entity     │ (Persistent Domain State & DB Models)
               └────────────────┘
```

---

## 2. Classification Mapping

### 2.1 Entity Classes (Domain Persistent State)
Entity classes encapsulate passive data, persistent state, and core business rules.

* `User`, `Patient`, `Doctor`, `Receptionist`, `Pharmacist`, `LabTechnician`, `Cashier`, `Admin`
* `Hospital`, `Department`, `Ward`, `Bed`
* `Appointment`, `Queue`
* `MedicalRecord`, `Consultation`, `Diagnosis`, `Prescription`, `PrescriptionItem`
* `Medicine`, `InventoryItem`
* `LabTest`, `LabTestOrder`, `Sample`, `LabReport`
* `Admission`, `TreatmentPlan`, `DischargeSummary`
* `Bill`, `BillItem`, `Payment`, `Receipt`
* `Role`, `Notification`, `AuditLog`

### 2.2 Boundary Classes (User Interfaces & Gateways)
Boundary classes interface between external actors/systems and internal application logic.

* `PatientRegistrationUI` — Screen for entering patient details.
* `AppointmentBookingUI` — Interface for slot selection & booking.
* `OPCheckInUI` — Front-desk check-in and queue token terminal UI.
* `ConsultationWorkstationUI` — Doctor workstation for EHR, diagnosis, orders.
* `LaboratoryUI` — Tech interface for orders, sample logging, report upload.
* `PharmacyUI` — Pharmacist terminal for prescription verification & dispensing.
* `AdmissionUI` — Reception desk bed allocation screen.
* `BillingUI` — Cashier screen for charge consolidation & payment collection.
* `AdminPortalUI` — Admin interface for RBAC and master table updates.
* `PaymentGatewayAdapter` — External payment network interface boundary.
* `NotificationGatewayAdapter` — External SMS/Email gateway interface boundary.

### 2.3 Control Classes (Workflow Orchestration & Business Logic)
Control classes coordinate business workflows, enforce transaction boundaries, and execute calculations.

* `PatientRegistrationController` — Coordinates registration validation, UHID creation, DB save.
* `AppointmentController` — Manages slot verification, queue tokening, booking transactions.
* `ConsultationController` — Coordinates diagnosis saving, prescription creation, lab order dispatch.
* `LaboratoryController` — Orchestrates sample barcoding, status transitions, report verification.
* `PharmacyController` — Manages stock verification, inventory decrementing, low-stock alerting.
* `AdmissionController` — Handles bed availability queries, status updates, IP lifecycle.
* `BillingController` — Consolidates multi-service charges, applies discounts, triggers receipts.
* `ReportController` — Compiles operational and financial analytics summaries.
* `SecurityController` — Enforces RBAC permissions, password authentication, audit logging.

---

## 3. Justification for BCE Separation

1. **Decoupling UI from Business Rules**: Modifying the UI screen layout (`PatientRegistrationUI`) does not alter patient validation rules in `PatientRegistrationController` or entity schemas in `Patient`.
2. **Reusability of Controller Logic**: The exact same `AppointmentController` logic can serve web browser UIs, self-service kiosk terminals, or mobile application APIs.
3. **Auditability & Security**: Enforcing security policies at the Controller layer (`SecurityController`) guarantees that unauthorized requests are blocked before mutating persistent `Entity` objects.
