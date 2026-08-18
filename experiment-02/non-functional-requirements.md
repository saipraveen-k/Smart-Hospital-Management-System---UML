# Non-Functional Requirements (NFR) Specification

This document details the quality attributes, constraints, and non-functional requirements governing the Smart Hospital Management System (SHMS).

---

### NFR-01: Performance Requirements
* **Description**: The system shall process UI search requests (e.g. Patient search) within sub-second response times under peak hospital operational loads.
* **Specification**: Search query latency shall not exceed 2 seconds for 95% of requests.

### NFR-02: Security & Authentication
* **Description**: System access shall require multi-factor or password-authenticated credentials encrypted using industry-standard hashing algorithms (e.g. BCrypt / Argon2).
* **Specification**: All HTTP traffic must use TLS 1.3 encryption. Passwords must never be stored in plain text.

### NFR-03: System Availability
* **Description**: The system shall maintain high operational availability to support 24/7 hospital emergency, admission, and inpatient operations.
* **Specification**: Target system availability shall be 99.9% uptime, excluding scheduled off-peak maintenance windows.

### NFR-04: System Reliability & Fault Tolerance
* **Description**: Database operations must execute within ACID transactional boundaries, ensuring zero data loss during power outages or unexpected server failovers.
* **Specification**: Automatic automated database failover shall restore system state within 5 minutes of primary node failure.

### NFR-05: Usability & User Interface Accessibility
* **Description**: User interfaces shall be optimized for fast data entry by clinical and administrative staff with consistent color schemes, keyboard shortcuts, and minimal clicks.
* **Specification**: Interface designs shall adhere to WCAG 2.1 Level AA accessibility standards.

### NFR-06: Scalability & Load Capacity
* **Description**: The architecture shall support horizontal scaling to accommodate growing patient volumes and additional hospital branch integrations.
* **Specification**: System shall support at least 500 concurrent active user sessions without throughput degradation.

### NFR-07: Maintainability & Modularity
* **Description**: System software shall be structured using standard 3-Layer BCE design patterns and modular component packaging to facilitate software updates.
* **Specification**: Source code documentation and unit test coverage shall maintain a minimum threshold of 80%.

### NFR-08: Data Privacy & Regulatory Compliance
* **Description**: Medical data access shall enforce strict patient confidentiality principles adhering to HIPAA, NABH, and local health data governance regulations.
* **Specification**: Patient medical records must be masked or restricted to attending doctors and authorized staff only.

### NFR-09: Data Integrity & Consistency
* **Description**: Referential integrity constraints shall prevent orphaned records across connected entities (e.g. Prescriptions without valid Doctors, Bills without valid Patients).
* **Specification**: Database foreign keys and application validation logic must reject inconsistent entity relationships.

### NFR-10: Automated Backup & Disaster Recovery
* **Description**: Automated database snapshots and transaction log backups shall be maintained off-site to support recovery in disaster scenarios.
* **Specification**: Recovery Point Objective (RPO) shall be <= 15 minutes; Recovery Time Objective (RTO) shall be <= 2 hours.

### NFR-11: Security Auditability
* **Description**: System shall record comprehensive audit logs for all security-sensitive operations (login failures, role privilege modifications, bill adjustments).
* **Specification**: Audit logs must be tamper-evident, append-only, and retained for a minimum of 7 years.
