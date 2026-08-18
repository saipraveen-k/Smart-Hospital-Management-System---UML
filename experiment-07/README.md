# Experiment 7: Detailed Design Class Modelling & Interfaces

## Lab Record Header
- **Experiment Number**: 07
- **Title**: Detailed Design Class Diagrams, Visibility Modifiers, Method Signatures, Interfaces, and Dependencies
- **Date**: Academic Session 2026

---

## 1. Aim
To transform conceptual domain models into fully specified UML Design Class Diagrams for the Smart Hospital Management System (SHMS), incorporating explicit visibility modifiers (`+`, `-`, `#`, `~`), parameter signatures, return types, interfaces, realizations, dependencies, abstract superclasses, and structural associations.

---

## 2. Objectives
1. Author complete design class specifications for fields, accessors, constructors, and business operations.
2. Incorporate visibility rules (`-` private attributes for encapsulation, `+` public operations for contracts).
3. Design application interfaces (`PaymentProcessor`, `NotificationService`, `ReportGenerator`, `AuthenticationService`).
4. Establish inheritance generalisation hierarchies (`User` superclass).
5. Author standard Mermaid `.mmd` design class diagrams and interface realization maps.

---

## 3. Documents & Diagrams Created
1. `design-class-model.md` — In-depth design class specifications detailing field types and signatures.
2. `design-class-diagram.mmd` — Master UML Design Class Diagram script.
3. `interfaces-and-dependencies.mmd` — Interface realization and dependency diagram script.

---

## 4. Procedure
1. Refined conceptual classes from Experiment 4 based on interaction requirements from Experiment 6.
2. Formulated method signatures with explicit parameter lists and return types (e.g. `+bookAppointment(patientId: String, doctorId: String, slot: String): AppointmentId`).
3. Applied UML visibility modifiers (`-` private, `+` public, `#` protected, `~` package).
4. Defined abstract interfaces and concrete strategy implementations (`PaymentProcessor` interface realized by `CashPaymentProcessor`, `CardPaymentProcessor`, `UPIPaymentProcessor`).

---

## 5. Result
The detailed software design class model and interface dependencies were fully specified and validated.

---

## 6. Conclusion
Experiment 7 completes the static software architecture design, establishing exact specifications ready for software implementation and code generation.
