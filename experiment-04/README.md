# Experiment 4: Domain Analysis & Conceptual Class Modelling

## Lab Record Header
- **Experiment Number**: 04
- **Title**: Domain Analysis, Entity-Boundary-Control (BCE) Classification, and Domain Class Diagramming
- **Date**: Academic Session 2026

---

## 1. Aim
To perform domain analysis for the Smart Hospital Management System (SHMS), identify real-world conceptual domain classes, classify system components using the Boundary-Control-Entity (BCE) architecture, establish domain constraints and multiplicities, and construct formal Domain Class Diagrams in Mermaid syntax.

---

## 2. Objectives
1. Identify 34+ conceptual domain entities from the functional requirements baseline.
2. Define domain attributes, semantic associations, multiplicities, aggregations, and compositions.
3. Categorize system abstractions into **Entity**, **Boundary**, and **Control** patterns with explicit architectural justifications.
4. Define structural invariants and multiplicity constraints.
5. Create high-level domain models and formal Domain Class Diagrams in Mermaid format.

---

## 3. Documents & Diagrams Created
1. `domain-analysis.md` — Domain entity identification process.
2. `domain-classes.md` — Catalog of 34+ domain entities with attributes and responsibilities.
3. `entity-boundary-control.md` — Architectural BCE pattern classification.
4. `constraints.md` — Domain multiplicity rules and invariants.
5. `domain-model.mmd` — High-level domain concept map.
6. `domain-class-diagram.mmd` — Comprehensive UML Domain Class Diagram script.

---

## 4. Procedure
1. Conducted noun extraction analysis on SRS requirements (`FR-01` to `FR-30`).
2. Filtered candidate nouns into domain entities (`Patient`, `Doctor`, `Appointment`, `MedicalRecord`, `Prescription`, `LabTest`, `Admission`, `Bed`, `Bill`, `Payment`).
3. Classified entities into Entity (persistent state), Boundary (user interface interfaces), and Control (workflow logic orchestration).
4. Modeled relationship semantics (Composition for `Hospital` -> `Department`, `MedicalRecord` -> `Consultation`; Aggregation for `Department` -> `Doctor`; Association for `Patient` -> `Appointment`).

---

## 5. Result
A rigorous Domain Model and BCE classification were formulated and rendered into valid Mermaid class diagrams.

---

## 6. Conclusion
Experiment 4 establishes the object structure and architectural boundary divisions required for detailed object interaction (Experiment 5 & 6) and design class modeling (Experiment 7).
