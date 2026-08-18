# System Scope & Boundary Specification — SHMS

This document explicitly defines the functional scope boundaries for the Smart Hospital Management System.

---

## 1. In-Scope Modules & Features

The following 8 modules and operational workflows are fully in-scope for SHMS:

1. **Patient Registration**: Demographic data capture, UHID generation, profile updates.
2. **Appointment & OP Management**: Doctor schedule configuration, slot booking, arrival check-in, queue token management.
3. **Inpatient (IP) Management**: IP admission recommendation, bed/ward allocation, treatment plan tracking, discharge processing.
4. **Laboratory Management**: Test order intake, sample collection barcoding, test execution logging, result entry, report approval.
5. **Pharmacy & Inventory Management**: Prescription validation, medicine dispensing, stock auto-deduction, low stock alerting.
6. **Billing & Payment Settlement**: Multi-service bill consolidation, discount application, multi-mode payment processing (Cash/Card/UPI), official receipt generation.
7. **Reports & Analytics**: Operational, financial, and clinical analytical report generation.
8. **Security & Administration**: User account provisioning, RBAC configuration, system master lookup tables, security audit trails.

---

## 2. Out-of-Scope Items & Boundary Exclusions

The following capabilities are excluded from the current operational scope of SHMS and are documented as design assumptions:

1. **Third-Party Medical Insurance Claim Settlement**: Direct EDI claims processing with insurance underwriters is out-of-scope (handled via manual receipt submission).
2. **External Organ Donation Registries**: Inter-hospital organ transplant matching and logistics registries are excluded.
3. **Automated Biomedical Equipment IoT Telemetry**: Direct streaming telemetry from ICU ventilators or ECG monitors into database is excluded (manual vital logging by clinical staff is supported).
4. **Blood Bank Inventory Logistics**: Specialized blood donor matching and refrigeration logistics are excluded.
5. **Hospital Cafeteria & Laundry Services**: Non-medical ancillary commercial operations are excluded.
