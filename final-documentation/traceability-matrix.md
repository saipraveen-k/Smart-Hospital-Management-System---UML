# Requirement Traceability Matrix (RTM) — SHMS

This Traceability Matrix maps functional requirements (`FR-01` to `FR-30`) through Use Cases, Domain Classes, Sequence Diagrams, Design Classes, and Behavioral Activity/State Models.

| Requirement ID | Functional Requirement | Target Use Case | Domain Class | Sequence Diagram | Design Class | Activity / State Model |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-01** | Patient Registration | UC-01, UC-11 | Patient, User | SSD-01, HLSD-01, DSD-01, COM-01 | Patient, PatientRegistrationController | ACT-01 |
| **FR-02** | Patient Search | UC-12 | Patient, User | SSD-01, DSD-01 | Patient, PatientRegistrationController | ACT-01 |
| **FR-03** | Profile Management | UC-02 | Patient, User | SSD-01, DSD-01 | Patient | ACT-01 |
| **FR-04** | Appointment Booking | UC-03 | Appointment, Doctor | SSD-02, HLSD-02, DSD-02, COM-02 | Appointment, AppointmentController | ACT-02, STM-01 |
| **FR-05** | Doctor Availability | UC-13 | Doctor, Department | SSD-02, DSD-02 | Doctor, AppointmentController | ACT-02 |
| **FR-06** | OP Check-In | UC-05, UC-14 | Appointment, Queue | SSD-03, DSD-02 | Appointment | ACT-02, STM-01 |
| **FR-07** | Queue Management | UC-15 | Queue, Doctor | SSD-03 | Queue, AppointmentController | ACT-02, STM-01 |
| **FR-08** | Doctor Consultation | UC-20 | Consultation, MedicalRecord | SSD-04, HLSD-03, DSD-03, COM-03 | Consultation, ConsultationController | ACT-03 |
| **FR-09** | Diagnosis Recording | UC-21 | Diagnosis, Consultation | SSD-04, DSD-03 | Diagnosis, ConsultationController | ACT-03 |
| **FR-10** | Prescription Creation | UC-22 | Prescription, PrescriptionItem | SSD-04, DSD-03 | Prescription, ConsultationController | ACT-03, STM-05 |
| **FR-11** | Lab Test Request | UC-23 | LabTestOrder, LabTest | SSD-05, DSD-03 | LabTestOrder, ConsultationController | ACT-03, ACT-04, STM-02 |
| **FR-12** | Sample Collection | UC-29 | Sample, LabTestOrder | SSD-05, DSD-04, COM-04 | Sample, LaboratoryController | ACT-04, STM-02 |
| **FR-13** | Test Processing | UC-30 | LabTestOrder, Sample | SSD-05, DSD-04 | LabTestOrder, LaboratoryController | ACT-04, STM-02 |
| **FR-14** | Lab Report Release | UC-24, UC-31 | LabReport, LabTestOrder | SSD-05, HLSD-04, DSD-04, COM-04 | LabReport, LaboratoryController | ACT-04, STM-02 |
| **FR-15** | IP Admission | UC-16, UC-25 | Admission, Patient | SSD-07, DSD-06, COM-06 | Admission, AdmissionController | ACT-06, STM-03 |
| **FR-16** | Bed Allocation | UC-17 | Bed, Ward, Admission | SSD-07, DSD-06, COM-06 | Bed, AdmissionController | ACT-06, STM-03 |
| **FR-17** | IP Treatment Plan | UC-26 | TreatmentPlan, Admission | SSD-07, DSD-06 | TreatmentPlan | ACT-06, STM-03 |
| **FR-18** | Pharmacy Dispensing | UC-32 | Prescription, Medicine | SSD-06, DSD-05, COM-05 | Prescription, PharmacyController | ACT-05, STM-05 |
| **FR-19** | Inventory Alerting | UC-32a | InventoryItem, Medicine | SSD-06, DSD-05 | InventoryItem, PharmacyController | ACT-05 |
| **FR-20** | Multi-Service Billing | UC-33a | Bill, BillItem | SSD-08, HLSD-05, DSD-07, COM-07 | Bill, BillingController | ACT-07, STM-04 |
| **FR-21** | Payment Settlement | UC-08, UC-33b | Payment, Bill | SSD-08, HLSD-05, DSD-07, COM-07 | Payment, BillingController | ACT-07, STM-04 |
| **FR-22** | Receipt Generation | UC-09 | Receipt, Payment | SSD-08, DSD-07 | Receipt, BillingController | ACT-07 |
| **FR-23** | IP Discharge | UC-18 | Admission, Bed, Bill | SSD-09, DSD-08, COM-08 | Admission, AdmissionController | ACT-08, STM-03 |
| **FR-24** | Follow-Up Scheduling| UC-10, UC-27 | Consultation, Appointment | SSD-04, DSD-08 | Consultation | ACT-03, ACT-08 |
| **FR-25** | Reports & Analytics | UC-35 | AuditLog, Bill, Patient | SSD-08 | ReportController | ACT-07 |
| **FR-26** | Notifications | UC-03, UC-31 | Notification | SSD-02, DSD-03 | NotificationService | ACT-02, ACT-04 |
| **FR-27** | User Management | UC-34 | User, Admin | SSD-01 | User, SecurityController | ACT-01 |
| **FR-28** | RBAC Configuration | UC-34 | Role, User | SSD-01 | Role, SecurityController | ACT-01 |
| **FR-29** | Security Audit Logs | UC-35 | AuditLog, User | SSD-01 | AuditLog, SecurityController | ACT-01 |
| **FR-30** | Master Settings | UC-34 | Department, Ward, LabTest| SSD-07, DSD-06 | Department, Ward, LabTest | ACT-06 |
