# Detailed Design Class Specification — SHMS

This document lists the class definitions, private attributes, method signatures, return types, visibilities, and interface realizations for the core design classes in SHMS.

---

## 1. Core Classes & Method Signatures

### 1.1 `abstract class User`
* **Visibility**: `#` Protected fields, `+` Public methods
* **Attributes**:
  - `- userId: String`
  - `- username: String`
  - `- passwordHash: String`
  - `- name: String`
  - `- email: String`
  - `- phone: String`
  - `- role: String`
  - `- isActive: boolean`
* **Operations**:
  - `+ login(credentials: LoginDto): boolean`
  - `+ logout(): void`
  - `+ updatePassword(oldPass: String, newPass: String): boolean`
  - `+ getProfileDetails(): UserProfileDto`

### 1.2 `class Patient extends User`
* **Attributes**:
  - `- patientId: String`
  - `- dob: String`
  - `- gender: String`
  - `- address: String`
  - `- emergencyContact: String`
  - `- bloodGroup: String`
* **Operations**:
  - `+ register(dto: RegistrationDto): String`
  - `+ updateProfile(dto: ProfileDto): boolean`
  - `+ bookAppointment(doctorId: String, date: String, slot: String): String`
  - `+ viewMedicalHistory(): MedicalRecordDto`
  - `+ payBill(billId: String, amount: double, mode: String): ReceiptDto`

### 1.3 `class Doctor extends User`
* **Attributes**:
  - `- doctorId: String`
  - `- specialization: String`
  - `- qualification: String`
  - `- consultationFee: double`
  - `- roomNumber: String`
  - `- maxDailyQuota: int`
* **Operations**:
  - `+ examinePatient(patientId: String): MedicalRecordDto`
  - `+ recordConsultation(dto: ConsultationDto): String`
  - `+ prescribeMedicine(items: List~PrescriptionItem~): String`
  - `+ orderLabTest(testIds: List~String~): String`
  - `+ recommendAdmission(wardType: String, diagnosis: String): String`

### 1.4 `class Appointment`
* **Attributes**:
  - `- appointmentId: String`
  - `- patientId: String`
  - `- doctorId: String`
  - `- appointmentDate: String`
  - `- timeSlot: String`
  - `- status: String`
  - `- queueToken: int`
* **Operations**:
  - `+ scheduleSlot(): boolean`
  - `+ checkIn(): int`
  - `+ cancel(reason: String): boolean`
  - `+ complete(): void`

### 1.5 `class MedicalRecord`
* **Attributes**:
  - `- recordId: String`
  - `- patientId: String`
  - `- creationDate: String`
  - `- allergies: List~String~`
  - `- chronicConditions: List~String~`
* **Operations**:
  - `+ addConsultationEntry(entry: Consultation): void`
  - `+ addLabReport(report: LabReport): void`
  - `+ getFullHistory(): MedicalRecordSummaryDto`

### 1.6 `class LabTestOrder`
* **Attributes**:
  - `- orderId: String`
  - `- patientId: String`
  - `- doctorId: String`
  - `- orderDate: String`
  - `- urgency: String`
  - `- status: String`
* **Operations**:
  - `+ collectSample(barcode: String, sampleType: String): Sample`
  - `+ inputResults(measuredValues: String, pdfPath: String): void`
  - `+ approveReport(technicianId: String): boolean`

### 1.7 `class Admission`
* **Attributes**:
  - `- admissionId: String`
  - `- patientId: String`
  - `- admissionDate: String`
  - `- dischargeDate: String`
  - `- status: String`
  - `- bedId: String`
* **Operations**:
  - `+ allocateBed(bedId: String): boolean`
  - `+ appendTreatmentNote(note: String): void`
  - `+ initiateDischarge(): boolean`
  - `+ completeDischarge(): void`

### 1.8 `class Bill`
* **Attributes**:
  - `- billId: String`
  - `- patientId: String`
  - `- billDate: String`
  - `- grossAmount: double`
  - `- discountAmount: double`
  - `- netAmount: double`
  - `- status: String`
* **Operations**:
  - `+ addChargeItem(desc: String, amount: double, qty: int): void`
  - `+ applyDiscount(discountAmount: double): void`
  - `+ calculateNetTotal(): double`
  - `+ markAsPaid(): void`

---

## 2. Interfaces & Strategy Realizations

### 2.1 `interface PaymentProcessor`
* **Signature**: `+processPayment(amount: double, paymentDetails: PaymentDto): PaymentResultDto`
* **Realizing Classes**:
  - `CashPaymentProcessor`
  - `CardPaymentProcessor`
  - `UPIPaymentProcessor`

### 2.2 `interface NotificationService`
* **Signature**: `+sendNotification(recipient: String, message: String, channel: String): boolean`
* **Realizing Classes**:
  - `SMSNotificationService`
  - `EmailNotificationService`

### 2.3 `interface AuthenticationService`
* **Signature**: `+authenticate(username: String, pass: String): AuthTokenDto`
* **Realizing Classes**:
  - `RBACAuthenticationService`
