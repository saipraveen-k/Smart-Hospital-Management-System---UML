# System Event Identification List — SHMS

This document lists all external, temporal, and state-driven events identified within the Smart Hospital Management System.

---

## 1. External Events (Actor Initiated)

1. **EV-01**: Patient requests demographic registration.
2. **EV-02**: Patient or Receptionist requests appointment booking.
3. **EV-03**: Patient arrives at reception and requests OP check-in.
4. **EV-04**: Doctor initiates consultation for checked-in patient.
5. **EV-05**: Doctor submits electronic diagnosis and prescription.
6. **EV-06**: Doctor submits diagnostic laboratory test order.
7. **EV-07**: Lab Technician collects specimen sample.
8. **EV-08**: Lab Technician inputs test execution results.
9. **EV-09**: Lab Technician approves and uploads lab report.
10. **EV-10**: Doctor submits inpatient admission recommendation.
11. **EV-11**: Receptionist allocates bed and admits patient.
12. **EV-12**: Pharmacist verifies prescription and dispenses medicine.
13. **EV-13**: Cashier generates consolidated bill.
14. **EV-14**: Cashier processes bill payment settlement.
15. **EV-15**: Doctor approves discharge summary.
16. **EV-16**: Receptionist completes inpatient discharge.
17. **EV-17**: Admin creates user account or updates RBAC privileges.

---

## 2. Temporal Events (Time-Triggered)

1. **EV-18**: Daily consultation schedule auto-reset (at 00:00 hrs).
2. **EV-19**: Unattended appointment auto-cancellation (at 23:59 hrs on appointment date).
3. **EV-20**: Inpatient daily bed rate calculation batch job (at 24:00 hrs daily).
4. **EV-21**: Automated daily revenue report compilation (at 06:00 hrs daily).

---

## 3. State Events (System Condition Triggered)

1. **EV-22**: Medicine stock falls below reorder level (Triggers `LowStockAlert`).
2. **EV-23**: Payment status updates to `Paid` (Triggers `ReceiptGeneration` & `DischargeClearance`).
3. **EV-24**: Lab Report transitions to `Approved` (Triggers `DoctorNotification`).
4. **EV-25**: Failed login attempts exceed threshold (Triggers `SecurityAccountLockout`).
