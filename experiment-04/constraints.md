# Domain Constraints & Multiplicities Specification — SHMS

This document specifies the multiplicity constraints, invariants, and structural business rules governing domain entity relationships in SHMS.

---

## 1. Domain Relationship Multiplicities Table

| Source Entity | Relationship Type | Target Entity | Multiplicity | Semantic Constraint |
| :--- | :--- | :--- | :--- | :--- |
| **Hospital** | Composition | **Department** | `1` to `1..*` | Hospital must contain at least 1 department; destroying Hospital deletes departments. |
| **Department**| Aggregation | **Doctor** | `1` to `0..*` | Doctor is assigned to 1 department; Doctor exists independently if department renames. |
| **Patient** | Association | **Appointment**| `1` to `0..*` | Patient can book multiple appointments over time. |
| **Doctor** | Association | **Appointment**| `1` to `0..*` | Doctor conducts multiple patient appointments. |
| **Patient** | Composition | **MedicalRecord**| `1` to `1` | Patient owns exactly 1 lifetime MedicalRecord container. |
| **MedicalRecord**| Aggregation | **Consultation**| `1` to `0..*` | MedicalRecord aggregates historical consultation notes. |
| **Consultation**| Composition | **Prescription**| `1` to `0..1` | Consultation optionally creates at most 1 Prescription document. |
| **Prescription**| Composition | **PrescriptionItem**| `1` to `1..*` | Prescription must contain 1 or more drug dosage items. |
| **Consultation**| Association | **LabTestOrder**| `1` to `0..*` | Consultation can order multiple laboratory tests. |
| **LabTestOrder**| Composition | **Sample** | `1` to `0..1` | LabTestOrder optionally creates 1 specimen sample container. |
| **LabTestOrder**| Association | **LabReport** | `1` to `0..1` | LabTestOrder produces at most 1 final LabReport. |
| **Patient** | Association | **Admission** | `1` to `0..*` | Patient may have multiple IP admissions across history. |
| **Admission** | Association | **Bed** | `0..1` to `0..1` | Admitted patient is allocated at most 1 active Bed (`BR-09`). |
| **Ward** | Composition | **Bed** | `1` to `1..*` | Ward compositionally owns 1 or more Bed units. |
| **Patient** | Association | **Bill** | `1` to `0..*` | Patient accumulates multiple bills over time. |
| **Bill** | Composition | **BillItem** | `1` to `1..*` | Bill must contain 1 or more charge line items. |
| **Bill** | Association | **Payment** | `1` to `0..*` | Bill may be settled across multiple payments (partial/full). |
| **Payment** | Composition | **Receipt** | `1` to `1` | Payment generates exactly 1 official Receipt. |

---

## 2. Invariants & Business Constraints

1. **Unique Patient Identification Invariant**: `patientId` must be non-null, unique across system.
2. **Bed Allocation Invariant**: A `Bed` with status `Occupied` cannot be allocated to a second `Admission` simultaneously.
3. **Prescription Sign-off Invariant**: `Prescription` status cannot transition to `Dispensed` unless `doctorSignature` is present.
4. **Lab Report Release Invariant**: `LabReport` cannot be viewed by Patient or Doctor unless `approvalStatus == Approved`.
5. **Bill Settlement Invariant**: Inpatient `Admission` status cannot transition to `Discharged` while associated `Bill.status == Pending`.
