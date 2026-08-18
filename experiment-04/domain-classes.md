# Domain Classes Catalog — SHMS

This catalog documents the attributes, relationships, and responsibilities for all 34 domain entities in SHMS.

---

### 1. Patient
* **Purpose**: Represents a registered individual seeking medical care.
* **Attributes**: `patientId`, `name`, `dob`, `gender`, `phone`, `email`, `address`, `emergencyContact`, `bloodGroup`.
* **Relationships**: Compositionally owns `MedicalRecord` (1:1); associated with `Appointment` (1:*), `Admission` (1:*), `Bill` (1:*).
* **Constraints**: `patientId` must be unique (`BR-01`).

### 2. User (Abstract Superclass)
* **Purpose**: Generalizes authentication and credential properties for system actors.
* **Attributes**: `userId`, `username`, `passwordHash`, `name`, `email`, `phone`, `role`, `isActive`.
* **Relationships**: Subclasses: `Patient`, `Receptionist`, `Doctor`, `Pharmacist`, `LabTechnician`, `Cashier`, `Admin`.

### 3. Doctor
* **Purpose**: Represents a medical practitioner conducting consultations.
* **Attributes**: `doctorId`, `specialization`, `qualification`, `consultationFee`, `roomNumber`, `maxDailyQuota`.
* **Relationships**: Inherits from `User`; aggregated in `Department` (*:1); conducts `Appointment` (1:*), `Consultation` (1:*).

### 4. Receptionist
* **Purpose**: Front-desk staff operating registration and bed allocation.
* **Attributes**: `receptionistId`, `deskLocation`, `shiftSchedule`.
* **Relationships**: Inherits from `User`.

### 5. Pharmacist
* **Purpose**: Pharmacy staff managing dispensing and stock.
* **Attributes**: `pharmacistId`, `licenseNumber`.
* **Relationships**: Inherits from `User`.

### 6. LabTechnician
* **Purpose**: Diagnostic laboratory technician.
* **Attributes**: `technicianId`, `labSection`.
* **Relationships**: Inherits from `User`.

### 7. Cashier
* **Purpose**: Finance settlement staff.
* **Attributes**: `cashierId`, `counterNumber`.
* **Relationships**: Inherits from `User`.

### 8. Admin
* **Purpose**: System administrator.
* **Attributes**: `adminId`, `accessLevel`.
* **Relationships**: Inherits from `User`.

### 9. Department
* **Purpose**: Operational medical department (e.g. Cardiology, Neurology).
* **Attributes**: `deptId`, `deptName`, `deptCode`, `location`.
* **Relationships**: Compositionally owned by `Hospital` (*:1); aggregates `Doctor` (1:*).

### 10. Appointment
* **Purpose**: Outpatient slot reservation.
* **Attributes**: `appointmentId`, `appointmentDate`, `timeSlot`, `status` (Requested/Confirmed/CheckedIn/Completed/Cancelled), `queueToken`.
* **Relationships**: Associated with `Patient` (*:1), `Doctor` (*:1); leads to `Consultation` (0..1:1).

### 11. Queue
* **Purpose**: Outpatient waiting queue for a doctor on a specific date.
* **Attributes**: `queueId`, `doctorDate`, `currentToken`, `totalCheckedIn`.
* **Relationships**: Manages `Appointment` (*:1).

### 12. MedicalRecord
* **Purpose**: Aggregated lifetime health history container for a patient.
* **Attributes**: `recordId`, `creationDate`, `allergies`, `chronicConditions`, `familyHistory`.
* **Relationships**: Owned compositionally by `Patient` (1:1); aggregates `Consultation` (1:*), `LabReport` (1:*).

### 13. Consultation
* **Purpose**: Clinical encounter between doctor and patient.
* **Attributes**: `consultationId`, `consultationDate`, `chiefComplaints`, `examinationNotes`, `advice`.
* **Relationships**: Associated with `Appointment` (1:1), `Doctor` (*:1); compositionally owns `Prescription` (1:0..1), links to `Diagnosis` (1:*).

### 14. Diagnosis
* **Purpose**: Standardized ICD clinical diagnosis record.
* **Attributes**: `diagnosisId`, `icdCode`, `description`, `severity`.
* **Relationships**: Linked to `Consultation` (*:1).

### 15. Prescription
* **Purpose**: Digital medication order.
* **Attributes**: `prescriptionId`, `issueDate`, `status` (Created/Verified/Dispensed/Cancelled), `doctorSignature`.
* **Relationships**: Compositionally owned by `Consultation` (1:1); compositionally owns `PrescriptionItem` (1:1..*).

### 16. PrescriptionItem
* **Purpose**: Line item specifying dosage for a specific drug.
* **Attributes**: `itemId`, `medicineName`, `dosage`, `frequency`, `durationDays`, `quantity`.
* **Relationships**: Owned by `Prescription` (*:1); associated with `Medicine` (*:1).

### 17. Medicine
* **Purpose**: Pharmaceutical master item.
* **Attributes**: `medicineId`, `name`, `genericName`, `manufacturer`, `unitPrice`.
* **Relationships**: Associated with `InventoryItem` (1:1).

### 18. InventoryItem
* **Purpose**: Real-time stock count for a medicine item.
* **Attributes**: `inventoryId`, `batchNumber`, `expiryDate`, `stockQuantity`, `reorderLevel`.
* **Relationships**: Associated with `Medicine` (1:1).

### 19. LabTest
* **Purpose**: Master diagnostic test catalog item.
* **Attributes**: `testId`, `testName`, `testCode`, `cost`, `referenceRange`.
* **Relationships**: Associated with `LabTestOrder` (*:1).

### 20. LabTestOrder
* **Purpose**: Request for a diagnostic test for a patient.
* **Attributes**: `orderId`, `orderDate`, `urgency`, `status` (Requested/SampleCollected/Processing/Approved/Cancelled).
* **Relationships**: Created during `Consultation` (*:1); compositionally owns `Sample` (1:0..1), leads to `LabReport` (1:0..1).

### 21. Sample
* **Purpose**: Specimen container tag record.
* **Attributes**: `sampleId`, `barcode`, `sampleType`, `collectionTimestamp`.
* **Relationships**: Owned by `LabTestOrder` (1:1).

### 22. LabReport
* **Purpose**: Final approved diagnostic report document.
* **Attributes**: `reportId`, `reportDate`, `measuredValues`, `findingNotes`, `pdfFilePath`, `approvalStatus`.
* **Relationships**: Generated for `LabTestOrder` (1:1).

### 23. Admission
* **Purpose**: Inpatient hospitalization episode.
* **Attributes**: `admissionId`, `admissionDate`, `dischargeDate`, `status` (Requested/Admitted/BedAllocated/UnderTreatment/Discharged/Cancelled), `admittingDiagnosis`.
* **Relationships**: Associated with `Patient` (*:1); links to `Bed` (1:0..1); compositionally owns `TreatmentPlan` (1:0..*).

### 24. Ward
* **Purpose**: Hospital inpatient ward facility.
* **Attributes**: `wardId`, `wardName`, `wardType` (ICU/General/SemiPrivate), `totalBeds`, `dailyRate`.
* **Relationships**: Compositionally owns `Bed` (1:1..*).

### 25. Bed
* **Purpose**: Individual inpatient bed unit.
* **Attributes**: `bedId`, `bedNumber`, `status` (Available/Occupied/Maintenance).
* **Relationships**: Owned by `Ward` (*:1); allocated to `Admission` (0..1:0..1).

### 26. TreatmentPlan
* **Purpose**: Daily clinical progress log during IP stay.
* **Attributes**: `planId`, `logDate`, `progressNotes`, `vitalsRecord`.
* **Relationships**: Owned by `Admission` (*:1).

### 27. Bill
* **Purpose**: Consolidated financial account bill.
* **Attributes**: `billId`, `billDate`, `grossAmount`, `discountAmount`, `taxAmount`, `netAmount`, `status` (Pending/Paid/Cancelled).
* **Relationships**: Associated with `Patient` (*:1); compositionally owns `BillItem` (1:1..*); linked to `Payment` (1:0..*).

### 28. BillItem
* **Purpose**: Individual charge line item on a bill.
* **Attributes**: `billItemId`, `serviceDescription`, `unitPrice`, `quantity`, `subTotal`.
* **Relationships**: Owned by `Bill` (*:1).

### 29. Payment
* **Purpose**: Financial settlement transaction.
* **Attributes**: `paymentId`, `paymentDate`, `amountPaid`, `paymentMode` (Cash/Card/UPI), `transactionRef`, `status`.
* **Relationships**: Settles `Bill` (*:1); generates `Receipt` (1:1).

### 30. Receipt
* **Purpose**: Official payment proof document.
* **Attributes**: `receiptId`, `receiptDate`, `amountReceived`, `cashierSignature`.
* **Relationships**: Generated from `Payment` (1:1).

### 31. DischargeSummary
* **Purpose**: Clinical summary compiled at inpatient discharge.
* **Attributes**: `summaryId`, `dischargeDate`, `treatmentSummary`, `conditionAtDischarge`, `followUpAdvice`.
* **Relationships**: Generated for `Admission` (1:1).

### 32. Role
* **Purpose**: RBAC authorization role definition.
* **Attributes**: `roleId`, `roleName`, `permissionSet`.
* **Relationships**: Associated with `User` (*:*).

### 33. Notification
* **Purpose**: Alert message payload.
* **Attributes**: `notificationId`, `channel` (SMS/Email), `recipient`, `messageBody`, `sentTimestamp`.
* **Relationships**: Dispatched to `User` (*:1).

### 34. AuditLog
* **Purpose**: Security event log record.
* **Attributes**: `logId`, `timestamp`, `userId`, `actionExecuted`, `ipAddress`, `affectedRecordId`.
* **Relationships**: Records actions of `User` (*:1).
