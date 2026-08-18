# Behavioural Modelling Analysis — SHMS

This document provides a detailed narrative analysis of the activity workflows and state machine transition rules in SHMS.

---

## 1. Master Operational Hospital Workflow

The overall SHMS operational workflow integrates 8 primary modules across 7 actors and the system core:

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
            │           Test Processing                                     Inpatient Treatment
            │           Report Upload                                       Discharge Approval
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

## 2. State Machine Lifecycle Transitions

### 2.1 Appointment Lifecycle (`stm-01-appointment.mmd`)
* `Requested` -> `Confirmed` (Trigger: `confirmBooking()`)
* `Confirmed` -> `CheckedIn` (Trigger: `checkIn()`, Guard: `[date == today]`)
* `CheckedIn` -> `InConsultation` (Trigger: `callToken()`)
* `InConsultation` -> `Completed` (Trigger: `completeConsultation()`)
* `Confirmed` -> `Cancelled` (Trigger: `cancel()`)
* `Confirmed` -> `NoShow` (Trigger: `autoCancel()`, Guard: `[time > 23:59]`)

### 2.2 Lab Test Order Lifecycle (`stm-02-lab-test.mmd`)
* `Requested` -> `SamplePending` (Trigger: `receiveLabOrder()`)
* `SamplePending` -> `SampleCollected` (Trigger: `collectSample()`)
* `SampleCollected` -> `Processing` (Trigger: `loadAnalyzer()`)
* `Processing` -> `ResultEntered` (Trigger: `inputValues()`)
* `ResultEntered` -> `Approved` (Trigger: `verifyReport()`)
* `Approved` -> `Reported` (Trigger: `publishToDoctor()`)
* `SamplePending` -> `Cancelled` (Trigger: `cancelOrder()`)

### 2.3 Admission Lifecycle (`stm-03-admission.mmd`)
* `Requested` -> `Admitted` (Trigger: `acceptAdmission()`)
* `Admitted` -> `BedAllocated` (Trigger: `assignBed()`, Guard: `[bed.status == Available]`)
* `BedAllocated` -> `UnderTreatment` (Trigger: `startIPTreatment()`)
* `UnderTreatment` -> `DischargeInitiated` (Trigger: `signDischargeSummary()`)
* `DischargeInitiated` -> `Discharged` (Trigger: `finalizeDischarge()`, Guard: `[bill.status == Paid]`)

### 2.4 Payment Lifecycle (`stm-04-payment.mmd`)
* `Pending` -> `Processing` (Trigger: `submitPayment()`)
* `Processing` -> `Paid` (Trigger: `txnSuccess()`)
* `Processing` -> `Failed` (Trigger: `txnDeclined()`)
* `Paid` -> `Refunded` (Trigger: `issueRefund()`)

### 2.5 Prescription Lifecycle (`stm-05-prescription.mmd`)
* `Created` -> `Verified` (Trigger: `verifyDoctorSignature()`)
* `Verified` -> `PartiallyDispensed` (Trigger: `dispensePartialStock()`)
* `Verified` / `PartiallyDispensed` -> `Dispensed` (Trigger: `dispenseFullStock()`)
* `Created` -> `Cancelled` (Trigger: `cancelPrescription()`)
