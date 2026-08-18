# Viva Voce Preparation Guide: 50 OOAD & UML Questions with Answers

This guide contains 50 comprehensive viva questions and concise answers tailored for B.Tech OOAD / UML Laboratory evaluation on the **Smart Hospital Management System (SHMS)**.

---

### Q1: What is OOAD?
**Answer**: Object-Oriented Analysis and Design (OOAD) is a software engineering methodology that models a system as a group of interacting objects, combining structural analysis (domain entities, classes) with behavioral design (use cases, sequence interactions, state machines).

### Q2: What is the main difference between OOA and OOD?
**Answer**: Object-Oriented Analysis (OOA) focuses on *what* the system should do by identifying real-world domain concepts without implementation details. Object-Oriented Design (OOD) focuses on *how* the system fulfills requirements by defining software classes, interfaces, method signatures, and data structures.

### Q3: Define an Object and a Class with an SHMS example.
**Answer**: A **Class** is a blueprint defining structure and behavior (e.g. `Patient` template). An **Object** is a specific runtime instance of a class with concrete state (e.g. `patient_101` with UHID="P-9042").

### Q4: What is Encapsulation and how is it achieved in UML?
**Answer**: Encapsulation is the practice of bundling data attributes and operations inside a class while hiding internal state using private visibility (`-`). In SHMS, `Patient` attributes (`-patientId`, `-phone`) are accessible only through public methods (`+updateProfile()`).

### Q5: What is Abstraction?
**Answer**: Abstraction exposes essential functional characteristics while hiding underlying execution complexity. For example, the `PaymentProcessor` interface exposes `processPayment()` without revealing credit card encryption or banking API handshakes.

### Q6: Differentiate between Inheritance and Polymorphism.
**Answer**: **Inheritance** is a structural mechanism where a child subclass derives fields and methods from a parent superclass (e.g. `Doctor extends User`). **Polymorphism** allows different child objects to execute different implementations of the same parent method signature.

### Q7: Explain Association with an SHMS example.
**Answer**: Association represents a structural link between two independent classes. For example, `Patient` has a 1-to-many association with `Appointment` (`Patient 1 -- 0..* Appointment`).

### Q8: Differentiate between Aggregation and Composition.
**Answer**: 
- **Aggregation** (White Diamond `o--`) is a weak "has-a" relationship where child objects exist independently if parent is destroyed (e.g. `Department` aggregates `Doctor`).
- **Composition** (Black Diamond `*--`) is a strong "part-whole" ownership where child lifecycle depends on parent (e.g. `Hospital` compositionally owns `Department`, `MedicalRecord` owns `Consultation`).

### Q9: What is Dependency in UML?
**Answer**: Dependency (Dashed Arrow `..>`) indicates that a change in one class may affect another class that uses it. For example, `ConsultationController` depends on `NotificationService`.

### Q10: What is Generalization?
**Answer**: Generalization is the extraction of common attributes and operations from multiple subclasses into a common superclass taxonomy (e.g. generalizing `Doctor`, `Pharmacist`, `LabTechnician` into `User`).

### Q11: What is UML?
**Answer**: Unified Modeling Language (UML) is a standardized visual modeling language used to specify, visualize, construct, and document software system artifacts.

### Q12: How are UML diagrams classified?
**Answer**: UML 2.5 diagrams are divided into 3 categories:
1. **Structural Diagrams**: Static structure (Class, Package, Component, Deployment).
2. **Behavioral Diagrams**: Dynamic behavior (Use Case, Activity, State Machine).
3. **Interaction Diagrams**: Object messaging (Sequence, Communication, Interaction Overview, Timing).

### Q13: What is a Use Case?
**Answer**: A Use Case describes a sequence of actions conducted by an actor interacting with the system to achieve a specific observable goal (e.g. `UC-03 Book Appointment`).

### Q14: Explain `<<include>>` relationship in Use Case diagrams.
**Answer**: `<<include>>` indicates a mandatory sub-process that is always executed as part of the base use case. For example, `Book Appointment` *includes* `Check Doctor Availability`.

### Q15: Explain `<<extend>>` relationship in Use Case diagrams.
**Answer**: `<<extend>>` indicates an optional or conditional extension flow that executes only when specific conditions are met. For example, `Request Lab Test` *extends* `Doctor Consultation`.

### Q16: What is a Primary Actor vs Supporting Actor?
**Answer**: A **Primary Actor** initiates a use case to achieve a goal (e.g. `Patient`, `Doctor`). A **Supporting Actor** provides a service to the system (e.g. `PaymentGatewayAdapter`).

### Q17: What is a System Boundary Box?
**Answer**: A rectangle in Use Case diagrams enclosing all system use cases, separating internal system capabilities from external actors.

### Q18: What is Domain Analysis?
**Answer**: The process of inspecting problem domain requirements to identify key conceptual entities, attributes, and relationships without referring to code or UI widgets.

### Q19: What is the BCE architectural pattern?
**Answer**: Boundary-Control-Entity (BCE) partitions classes into 3 layers:
- **Boundary**: UI screens and external gateway adapters.
- **Control**: Business logic and workflow orchestration controllers.
- **Entity**: Persistent domain state and data models.

### Q20: Give SHMS examples of Entity, Boundary, and Control classes.
**Answer**:
- **Entity**: `Patient`, `Appointment`, `Prescription`, `Bill`.
- **Boundary**: `PatientRegistrationUI`, `BillingUI`.
- **Control**: `PatientRegistrationController`, `BillingController`.

### Q21: What is a System Sequence Diagram (SSD)?
**Answer**: An SSD treats the entire system as a black box and shows message interactions strictly between external Actors and the System boundary.

### Q22: What is a Detailed Sequence Diagram?
**Answer**: A sequence diagram showing internal object-to-object messaging between Boundary UIs, Controllers, Repositories, and Entities, including execution lifelines and activation bars.

### Q23: What do `alt` and `opt` frames represent in Sequence Diagrams?
**Answer**:
- `alt` (Alternative): Represents conditional branching (if-else logic, e.g. Payment Success vs Payment Declined).
- `opt` (Optional): Represents an optional execution block (e.g. Ordering optional Lab Tests during consultation).

### Q24: Differentiate between Sequence Diagram and Communication Diagram.
**Answer**: 
- **Sequence Diagrams** emphasize the strict *time-ordering* of messages along vertical lifelines.
- **Communication Diagrams** emphasize the *structural relationships* between collaborating objects using numbered message labels (`1:`, `1.1:`).

### Q25: How are Communication Diagrams represented in Mermaid?
**Answer**: Since Mermaid lacks a native `communicationDiagram` keyword, standard UML Communication semantics are represented using `flowchart LR` with numbered message labels (`1: registerPatient()`, `1.1: validateFields()`).

### Q26: What is a Design Class Diagram (DCD)?
**Answer**: A DCD maps conceptual entities into software design classes complete with data types, visibilities (`+`, `-`, `#`), method signatures, return types, interfaces, and dependencies.

### Q27: What do the symbols `+`, `-`, `#`, `~` signify in UML Class Diagrams?
**Answer**:
- `+`: Public access.
- `-`: Private access.
- `#`: Protected access.
- `~`: Package/default access.

### Q28: What is an Interface in UML?
**Answer**: An Interface defines a contract of abstract operations without implementation code. Concrete classes realize the interface (e.g. `PaymentProcessor` interface realized by `CardPaymentProcessor`).

### Q29: What is Dependency Inversion Principle (DIP)?
**Answer**: High-level modules should not depend on low-level concrete modules; both should depend on abstractions/interfaces. In SHMS, `BillingController` depends on `PaymentProcessor` interface rather than concrete card APIs.

### Q30: What is an Abstract Class?
**Answer**: A class marked `<<Abstract>>` that cannot be directly instantiated and serves as a superclass for child concrete classes (e.g. `abstract class User`).

### Q31: What is an Activity Diagram?
**Answer**: A behavioral diagram showing procedural flow of control, decisions, parallel paths, and swimlane responsibilities across business processes.

### Q32: What is a Swimlane in Activity Diagrams?
**Answer**: Swimlanes partition activity nodes by responsible actors or organizational roles (e.g. `Patient`, `Doctor`, `Pharmacist` swimlanes in SHMS workflow).

### Q33: What is a Decision Node vs Merge Node in Activity Diagrams?
**Answer**: A **Decision Node** (Diamond) branches 1 incoming flow into multiple guarded outgoing paths (e.g. `[Lab Test Required?]`). A **Merge Node** recombines multiple paths into 1 single flow.

### Q34: What is a State Machine Diagram?
**Answer**: A behavioral diagram modeling the finite states, events, and transitions an entity undergoes during its lifecycle (e.g. `Appointment` states).

### Q35: Define State, Event, and Transition.
**Answer**:
- **State**: A condition or stage in the lifecycle of an entity (e.g. `CheckedIn`).
- **Event**: A trigger causing a state change (e.g. `callToken()`).
- **Transition**: The movement from one state to another (`CheckedIn` -> `InConsultation`).

### Q36: What states does an SHMS `Appointment` undergo?
**Answer**: `Requested` -> `Confirmed` -> `CheckedIn` -> `InConsultation` -> `Completed` (or `Cancelled` / `NoShow`).

### Q37: What states does an SHMS `LabTestOrder` undergo?
**Answer**: `Requested` -> `SamplePending` -> `SampleCollected` -> `Processing` -> `ResultEntered` -> `Approved` -> `Reported`.

### Q38: What states does an SHMS `Admission` undergo?
**Answer**: `Requested` -> `Admitted` -> `BedAllocated` -> `UnderTreatment` -> `DischargeInitiated` -> `Discharged`.

### Q39: What states does an SHMS `Payment` undergo?
**Answer**: `Pending` -> `Processing` -> `Paid` (or `Failed` / `Refunded`).

### Q40: What states does an SHMS `Prescription` undergo?
**Answer**: `Created` -> `Verified` -> `PartiallyDispensed` -> `Dispensed` (or `Cancelled`).

### Q41: What is Multiplicity in UML?
**Answer**: Multiplicity specifies the allowable range of instances linked between two classes (e.g. `1` to `0..*`, `1` to `1`).

### Q42: Explain the multiplicity `1` to `0..1` between `Admission` and `Bed`.
**Answer**: An `Admission` record is allocated at most 1 active `Bed` at a time; prior to bed allocation, it links to 0 beds.

### Q43: What is a Traceability Matrix (RTM)?
**Answer**: A matrix ensuring that every functional requirement maps forward to a Use Case, Domain Class, Sequence Diagram, Design Class, and Activity/State model, proving zero missing requirements.

### Q44: How does SHMS handle Role-Based Access Control (RBAC)?
**Answer**: `SecurityController` intercepts requests, checking the user's assigned `Role` permissions before allowing access to Boundary screens or execution of Control methods.

### Q45: How does SHMS maintain inventory synchronization?
**Answer**: When `PharmacyController` dispenses medication, it synchronously decrements `stockQuantity` in `InventoryItem` and checks against `reorderLevel` to trigger `LowStockAlert` (`BR-05`).

### Q46: Why is `MedicalRecord` compositionally owned by `Patient`?
**Answer**: Because a medical record has strong lifecycle dependence on the patient; if a patient profile is deleted or archived, its corresponding health history container is permanently bound to that patient (`A-07`).

### Q47: What business rule prevents premature inpatient discharge?
**Answer**: `BR-07 Payment Clearance for Discharge` requires that the consolidated `Bill` status associated with an `Admission` must be `Paid` before the system permits discharge completion and bed release.

### Q48: How are external payment gateways integrated into SHMS?
**Answer**: Via `PaymentGatewayAdapter` implementing `PaymentProcessor`, allowing third-party API processing without coupling core `BillingController` logic.

### Q49: What is the purpose of `AuditLog` in SHMS?
**Answer**: To record an unalterable append-only audit trail capturing user ID, timestamp, IP address, and mutated record ID for all critical clinical and financial transactions (`BR-08`).

### Q50: How does SHMS handle walk-in patients vs online booked appointments?
**Answer**: Walk-in patients are registered at reception (`UC-11`) and immediately booked into the next available doctor slot (`UC-03`), proceeding directly to check-in (`UC-14`) and token generation (`UC-15`). Online patients skip registration at the desk and proceed directly to check-in upon arrival.
