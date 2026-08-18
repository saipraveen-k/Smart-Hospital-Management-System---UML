# Stakeholder Analysis — Smart Hospital Management System (SHMS)

This document categorizes and analyzes all primary, supporting, and managerial stakeholders involved in SHMS.

---

## 1. Primary Stakeholders

Primary stakeholders interact directly with the system core clinical and operational features on a daily basis.

### 1.1 Patient
* **Role**: Primary healthcare seeker.
* **Interests**: Quick registration, easy online appointment booking, minimal waiting room delay, instant access to medical reports and prescriptions, transparent billing.
* **Key Tasks**: Provide personal details, book appointments, check-in, view reports, make payments.

### 1.2 Receptionist
* **Role**: Front-desk operational staff.
* **Interests**: Fast walk-in registration, error-free patient lookup, efficient queue tokening, real-time bed availability tracking.
* **Key Tasks**: Register patients, verify appointments, check-in patients, allocate beds, process discharge forms.

### 1.3 Doctor
* **Role**: Medical practitioner providing healthcare diagnosis and care plans.
* **Interests**: Rapid access to patient medical histories, intuitive diagnosis recording, seamless lab test ordering, rapid prescription generation.
* **Key Tasks**: Conduct Doctor Consultation, record diagnoses, write prescriptions, order lab tests, manage IP treatments, sign discharge summaries.

### 1.4 Pharmacist
* **Role**: Pharmacy inventory and dispensing specialist.
* **Interests**: Verified digital prescription feeds, real-time inventory counts, automated low-stock warnings, fast bill generation.
* **Key Tasks**: Verify prescriptions, dispense medicines, create pharmacy charges, update stock.

### 1.5 Lab Technician
* **Role**: Diagnostic laboratory processing technician.
* **Interests**: Clear digital test order queues, specimen sample tracking, structured result input templates, report approval workflow.
* **Key Tasks**: Receive orders, collect samples, process tests, enter results, upload approved reports.

### 1.6 Cashier
* **Role**: Financial settlement desk clerk.
* **Interests**: Automated multi-department bill aggregation, discount validation, multi-mode payment processing, receipt printing.
* **Key Tasks**: Generate final bills, apply approved discounts, process payments (Cash/Card/UPI), issue receipts.

---

## 2. Supporting / Managerial Actor

Supporting and managerial actors oversee system administration, security, compliance, and strategic performance.

### 2.1 Admin (Supporting / Managerial Actor)
* **Role**: System Administrator and Security Manager.
* **Interests**: Secure user account provisioning, granular RBAC configuration, system uptime, security monitoring, unalterable audit trails.
* **Key Tasks**: Manage users/roles, configure doctors/departments, monitor security logs, review audit entries.

### 2.2 Hospital Management / Executive Board
* **Role**: Strategic decision-makers and compliance officers.
* **Interests**: Hospital bed occupancy rates, department revenue analytics, patient throughput, NABH/HIPAA regulatory compliance.
* **Key Tasks**: Review operational reports, analyze financial trends, evaluate service delivery efficiency.

---

## 3. Stakeholder Matrix

| Stakeholder | Category | Primary Focus | System Interaction Level |
| :--- | :--- | :--- | :--- |
| **Patient** | Primary | Convenience & Care | Direct Web / Mobile Interface |
| **Receptionist** | Primary | Operational Speed | Front-Desk Terminal UI |
| **Doctor** | Primary | Clinical Care | Doctor Workstation |
| **Pharmacist** | Primary | Dispensing & Stock | Pharmacy Terminal UI |
| **Lab Technician** | Primary | Diagnostics | Laboratory Terminal UI |
| **Cashier** | Primary | Billing & Payment Settlement | Cashier Terminal UI |
| **Admin** | Supporting / Managerial | Governance & Security | System Admin Portal |
| **Hospital Mgmt** | Supporting / Managerial | Analytics & Audit | Executive Reporting Dashboard |
