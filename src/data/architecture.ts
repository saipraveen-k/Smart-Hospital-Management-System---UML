import { ComponentItem, DeploymentNode } from '@/types';

export const COMPONENT_ITEMS: ComponentItem[] = [
  {
    id: 'COMP-01',
    name: 'Patient Portal Component',
    type: 'Frontend',
    purpose: 'Provides patient self-service web dashboard for profile management, appointment booking, lab report viewing, and bill payment.',
    responsibilities: [
      'Render self-service patient UI views',
      'Manage client-side session tokens',
      'Submit appointment booking requests',
      'Display digital lab reports and payment receipts'
    ],
    providedInterfaces: ['IPatientPortalUI'],
    dependencies: ['Appointment & OP Subsystem', 'Laboratory Subsystem', 'Billing Subsystem', 'Authentication Service'],
    relatedModules: ['patient-registration', 'appointment-op', 'laboratory', 'billing-payment'],
    relatedClasses: ['PatientRegistrationUI', 'AppointmentBookingUI', 'BillingUI'],
    relatedRequirements: ['FR-01', 'FR-04', 'FR-14', 'FR-21']
  },
  {
    id: 'COMP-02',
    name: 'Reception Module Component',
    type: 'Frontend',
    purpose: 'Provides front-desk workstation interface for walk-in patient registration, desk check-in, queue token printing, and bed allocation.',
    responsibilities: [
      'Process walk-in registrations',
      'Manage daily consultation queue tokens',
      'Assign inpatient ward beds',
      'Issue visitor passes'
    ],
    providedInterfaces: ['IReceptionUI'],
    dependencies: ['Patient Registration Subsystem', 'Appointment & OP Subsystem', 'Inpatient Subsystem'],
    relatedModules: ['patient-registration', 'appointment-op', 'ip-management'],
    relatedClasses: ['CheckInUI', 'AdmissionUI'],
    relatedRequirements: ['FR-01', 'FR-06', 'FR-16']
  },
  {
    id: 'COMP-03',
    name: 'Appointment & OP Subsystem',
    type: 'Core Subsystem',
    purpose: 'Handles doctor slot scheduling, queue management, outpatient check-ins, and token calling.',
    responsibilities: [
      'Manage doctor consulting schedules',
      'Execute slot reservation logic',
      'Maintain real-time outpatient queues',
      'Issue sequential token numbers'
    ],
    providedInterfaces: ['IAppointmentService', 'IQueueService'],
    dependencies: ['Patient Registration Subsystem', 'Notification Service', 'Hospital Database'],
    relatedModules: ['appointment-op'],
    relatedClasses: ['AppointmentController', 'Appointment', 'Queue'],
    relatedRequirements: ['FR-04', 'FR-05', 'FR-06', 'FR-07']
  },
  {
    id: 'COMP-04',
    name: 'Clinical Module Subsystem',
    type: 'Core Subsystem',
    purpose: 'Manages doctor consultation workspace, clinical history review, diagnostic coding, electronic prescriptions, and lab test orders.',
    responsibilities: [
      'Record consultation notes and vitals',
      'Assign ICD-10 diagnosis codes',
      'Generate electronic prescriptions',
      'Order laboratory test requisitions'
    ],
    providedInterfaces: ['IClinicalService'],
    dependencies: ['Patient Registration Subsystem', 'Laboratory Subsystem', 'Pharmacy Subsystem', 'Hospital Database'],
    relatedModules: ['appointment-op', 'laboratory', 'pharmacy-inventory'],
    relatedClasses: ['ConsultationController', 'Consultation', 'Prescription', 'LabTestOrder'],
    relatedRequirements: ['FR-08', 'FR-09', 'FR-10', 'FR-11']
  },
  {
    id: 'COMP-05',
    name: 'Laboratory Subsystem',
    type: 'Core Subsystem',
    purpose: 'Manages pathology and radiology test processing, sample barcode tracking, analyzer result entry, and report approval.',
    responsibilities: [
      'Receive lab test requisitions',
      'Track sample barcode collection',
      'Capture analyzer parameter values',
      'Publish verified lab reports'
    ],
    providedInterfaces: ['ILabService', 'IReportPublisher'],
    dependencies: ['Hospital Database', 'Notification Service'],
    relatedModules: ['laboratory'],
    relatedClasses: ['LaboratoryController', 'LabTestOrder', 'Sample', 'LabReport'],
    relatedRequirements: ['FR-11', 'FR-12', 'FR-13', 'FR-14']
  },
  {
    id: 'COMP-06',
    name: 'Pharmacy & Inventory Subsystem',
    type: 'Core Subsystem',
    purpose: 'Handles prescription verification, drug dispensing, inventory stock decrementing, batch expiration tracking, and low-stock alerts.',
    responsibilities: [
      'Verify digital doctor prescriptions',
      'Dispense medications',
      'Maintain inventory stock levels',
      'Trigger reorder level alerts'
    ],
    providedInterfaces: ['IPharmacyService', 'IInventoryService'],
    dependencies: ['Hospital Database'],
    relatedModules: ['pharmacy-inventory'],
    relatedClasses: ['PharmacyController', 'Medicine', 'InventoryItem'],
    relatedRequirements: ['FR-18', 'FR-19']
  },
  {
    id: 'COMP-07',
    name: 'Inpatient Management Subsystem',
    type: 'Core Subsystem',
    purpose: 'Orchestrates emergency and elective admissions, ward bed allocation, daily treatment plans, and discharge clearance.',
    responsibilities: [
      'Process admission requests',
      'Allocate available ward beds',
      'Track inpatient treatment progress',
      'Execute discharge clearance checks'
    ],
    providedInterfaces: ['IAdmissionService', 'IBedManager'],
    dependencies: ['Billing Subsystem', 'Hospital Database'],
    relatedModules: ['ip-management'],
    relatedClasses: ['AdmissionController', 'Admission', 'Ward', 'Bed'],
    relatedRequirements: ['FR-15', 'FR-16', 'FR-17', 'FR-23']
  },
  {
    id: 'COMP-08',
    name: 'Billing & Payment Subsystem',
    type: 'Core Subsystem',
    purpose: 'Consolidates multi-departmental charges into unified bills, processes multi-channel payments, and generates receipts.',
    responsibilities: [
      'Aggregate consultation, lab, pharmacy, and bed charges',
      'Apply discounts or insurance claims',
      'Invoke Payment Gateway Adapter',
      'Issue computerized payment receipts'
    ],
    providedInterfaces: ['IBillingService', 'IPaymentService'],
    dependencies: ['Payment Gateway Adapter', 'Hospital Database'],
    relatedModules: ['billing-payment'],
    relatedClasses: ['BillingController', 'Bill', 'Payment', 'Receipt'],
    relatedRequirements: ['FR-20', 'FR-21', 'FR-22']
  },
  {
    id: 'COMP-09',
    name: 'Reports & Analytics Component',
    type: 'Core Subsystem',
    purpose: 'Queries operational metrics to compile executive financial revenue, bed occupancy, and patient volume analytics.',
    responsibilities: [
      'Compile daily and monthly revenue reports',
      'Calculate ward bed occupancy rates',
      'Export reports in PDF/Excel format'
    ],
    providedInterfaces: ['IAnalyticsService'],
    dependencies: ['Hospital Database'],
    relatedModules: ['reports-analytics'],
    relatedClasses: ['ReportController', 'AuditLog', 'Bill'],
    relatedRequirements: ['FR-25']
  },
  {
    id: 'COMP-10',
    name: 'Authentication & RBAC Service',
    type: 'Infrastructure',
    purpose: 'Handles user authentication, JWT session token validation, and Role-Based Access Control permission checks.',
    responsibilities: [
      'Authenticate user credentials',
      'Issue secure session tokens',
      'Enforce RBAC permission rules'
    ],
    providedInterfaces: ['IAuthService', 'IRBACService'],
    dependencies: ['Hospital Database'],
    relatedModules: ['security-admin'],
    relatedClasses: ['SecurityController', 'User', 'Role'],
    relatedRequirements: ['FR-27', 'FR-28']
  },
  {
    id: 'COMP-11',
    name: 'Notification Service Component',
    type: 'Infrastructure',
    purpose: 'Asynchronous notification broker dispatching appointment SMS alerts, email receipts, and token call notifications.',
    responsibilities: [
      'Format notification message templates',
      'Dispatch SMS via telecom gateway',
      'Send email receipts via SMTP server'
    ],
    providedInterfaces: ['INotificationService'],
    dependencies: ['External SMS/Email Provider'],
    relatedModules: ['security-admin', 'appointment-op', 'laboratory'],
    relatedClasses: ['NotificationService', 'SMSNotificationAdapter'],
    relatedRequirements: ['FR-26']
  },
  {
    id: 'COMP-12',
    name: 'Audit & Security Service',
    type: 'Infrastructure',
    purpose: 'Logs unalterable append-only audit entries for all clinical and financial state mutations.',
    responsibilities: [
      'Capture user ID, IP, and timestamp for mutations',
      'Persist immutable audit trail entries',
      'Expose audit trail view for compliance'
    ],
    providedInterfaces: ['IAuditLogger'],
    dependencies: ['Hospital Database'],
    relatedModules: ['security-admin'],
    relatedClasses: ['AuditLog', 'SecurityController'],
    relatedRequirements: ['FR-29']
  },
  {
    id: 'COMP-13',
    name: 'Hospital Database Component',
    type: 'Database',
    purpose: 'ACID-compliant relational database storing Master Patient Index, appointments, lab records, pharmacy inventory, and bills.',
    responsibilities: [
      'Provide ACID transactional persistence',
      'Enforce relational integrity constraints',
      'Execute high-speed indexed queries'
    ],
    providedInterfaces: ['IDatabaseService'],
    dependencies: [],
    relatedModules: ['patient-registration', 'appointment-op', 'billing-payment'],
    relatedClasses: ['Patient', 'Doctor', 'Appointment', 'Bill'],
    relatedRequirements: ['FR-01', 'FR-04', 'FR-20']
  },
  {
    id: 'COMP-14',
    name: 'Payment Gateway Adapter',
    type: 'External Gateway',
    purpose: 'External payment processing adapter realizing PaymentProcessor for Credit/Debit card and digital UPI payments.',
    responsibilities: [
      'Encapsulate external banking API handshakes',
      'Process card transactions securely (PCI-DSS)',
      'Handle UPI QR callback verification'
    ],
    providedInterfaces: ['IPaymentProcessor'],
    dependencies: [],
    relatedModules: ['billing-payment'],
    relatedClasses: ['PaymentProcessor', 'CardPaymentProcessor', 'UPIPaymentProcessor'],
    relatedRequirements: ['FR-21']
  },
  {
    id: 'COMP-15',
    name: 'SMS & Email Provider Adapter',
    type: 'External Gateway',
    purpose: 'Third-party communication gateway for sending transactional SMS and email notifications.',
    responsibilities: [
      'Transmit SMS to mobile numbers',
      'Deliver HTML email messages'
    ],
    providedInterfaces: ['ISMSGateway'],
    dependencies: [],
    relatedModules: ['security-admin'],
    relatedClasses: ['SMSNotificationAdapter'],
    relatedRequirements: ['FR-26']
  }
];

export const DEPLOYMENT_NODES: DeploymentNode[] = [
  {
    id: 'NODE-01',
    name: 'Patient Mobile Device / Laptop',
    nodeType: 'Client Device',
    purpose: 'Client device used by patients to access the web portal.',
    hostedComponents: ['Patient Portal UI', 'Web Browser Client'],
    communication: 'HTTPS / TLS 1.3 over Public Internet',
    security: ['TLS 1.3 Encryption', 'OAuth2 / JWT Token Auth']
  },
  {
    id: 'NODE-02',
    name: 'Reception Desk Workstation',
    nodeType: 'Workstation',
    purpose: 'Hospital desktop PC used by front-desk staff for patient registration and check-in.',
    hostedComponents: ['Reception Module UI', 'Barcode Scanner Driver', 'Token Printer Driver'],
    communication: 'HTTPS / TLS 1.3 over Hospital Secure LAN',
    security: ['IP Address Whitelisting', 'RBAC User Credentials']
  },
  {
    id: 'NODE-03',
    name: 'Doctor Consultation Workstation',
    nodeType: 'Workstation',
    purpose: 'Clinical workstation used by doctors during consultations.',
    hostedComponents: ['Clinical Module UI', 'EHR Chart Viewer'],
    communication: 'HTTPS / TLS 1.3 over Hospital Secure LAN',
    security: ['Role-Based Access Control', 'Biometric / Smart Card Login']
  },
  {
    id: 'NODE-04',
    name: 'Laboratory Workstation',
    nodeType: 'Workstation',
    purpose: 'Lab PC connected to automated pathology and biochemistry analyzers.',
    hostedComponents: ['Laboratory UI', 'Analyzer Interface Service', 'Barcode Reader'],
    communication: 'HTTPS / TLS 1.3 over Hospital Secure LAN',
    security: ['Pathologist Signature Key', 'Network Isolation']
  },
  {
    id: 'NODE-05',
    name: 'Pharmacy Workstation',
    nodeType: 'Workstation',
    purpose: 'Pharmacy counter PC used for prescription verification and dispensing.',
    hostedComponents: ['Pharmacy UI', 'Receipt Printer Driver', 'Barcode Reader'],
    communication: 'HTTPS / TLS 1.3 over Hospital Secure LAN',
    security: ['Pharmacist Credential Check', 'Inventory Audit Log']
  },
  {
    id: 'NODE-06',
    name: 'Cashier Workstation',
    nodeType: 'Workstation',
    purpose: 'Billing desk PC connected to POS card reader and thermal invoice printer.',
    hostedComponents: ['Billing UI', 'POS Terminal Service', 'Invoice Printer Driver'],
    communication: 'HTTPS / TLS 1.3 over Hospital Secure LAN',
    security: ['PCI-DSS Compliance', 'Encrypted POS Communication']
  },
  {
    id: 'NODE-07',
    name: 'Admin Workstation',
    nodeType: 'Workstation',
    purpose: 'Administrator workstation for managing system settings and RBAC.',
    hostedComponents: ['Admin Console UI', 'Audit Log Viewer'],
    communication: 'HTTPS / TLS 1.3 over Secure Admin VLAN',
    security: ['Multi-Factor Authentication (MFA)', 'Strict IP Restrict']
  },
  {
    id: 'NODE-08',
    name: 'Hospital Internal Network (LAN/VLAN)',
    nodeType: 'Network',
    purpose: 'High-speed gigabit Ethernet network with dedicated VLAN segmentation.',
    hostedComponents: ['Managed Switches', 'Firewalls', 'Load Balancers'],
    communication: '10 Gbps Fiber Backbone / WPA3 Enterprise Wi-Fi',
    security: ['VLAN Segmentation', 'Intrusion Detection System (IDS)']
  },
  {
    id: 'NODE-09',
    name: 'Reverse Proxy & Load Balancer Server',
    nodeType: 'Server',
    purpose: 'Terminates incoming SSL/TLS connections and distributes traffic across application servers.',
    hostedComponents: ['NGINX / HAProxy Reverse Proxy', 'Web Application Firewall (WAF)'],
    communication: 'HTTP/2 over TLS 1.3',
    security: ['DDoS Protection', 'SSL Offloading']
  },
  {
    id: 'NODE-10',
    name: 'Application Server Cluster',
    nodeType: 'Server',
    purpose: 'Host server node executing Next.js / Node.js application services and business logic.',
    hostedComponents: ['Appointment Subsystem', 'Clinical Subsystem', 'Laboratory Subsystem', 'Pharmacy Subsystem', 'Billing Subsystem'],
    communication: 'Internal gRPC / REST JSON APIs',
    security: ['Container Isolation (Docker/Kubernetes)', 'Strict Environment Variables']
  },
  {
    id: 'NODE-11',
    name: 'Authentication Server',
    nodeType: 'Server',
    purpose: 'Dedicated identity provider managing user accounts, passwords, and JWT tokens.',
    hostedComponents: ['OAuth2 / OpenID Connect Provider', 'Keycloak / Auth0 Service'],
    communication: 'HTTPS / JSON Web Tokens (JWT)',
    security: ['Bcrypt Password Hashing', 'Rate Limiting']
  },
  {
    id: 'NODE-12',
    name: 'Notification Gateway Server',
    nodeType: 'Server',
    purpose: 'Background queue worker server processing asynchronous SMS and email notifications.',
    hostedComponents: ['Redis Task Queue', 'Email / SMS Dispatcher Service'],
    communication: 'AMQP / Redis Pub-Sub',
    security: ['API Key Encryption', 'Queue Retry Circuit Breaker']
  },
  {
    id: 'NODE-13',
    name: 'Master Database Server Cluster',
    nodeType: 'Server',
    purpose: 'Primary relational database cluster storing all application data.',
    hostedComponents: ['PostgreSQL / MySQL Master Node', 'Read Replicas'],
    communication: 'Encrypted Database Protocol (TLS)',
    security: ['AES-256 Data Encryption at Rest', 'Automated Hourly Backups']
  },
  {
    id: 'NODE-14',
    name: 'External Payment Gateway Server',
    nodeType: 'External Service',
    purpose: 'Third-party banking server processing online payments.',
    hostedComponents: ['Razorpay / Stripe / Bank UPI API Gateway'],
    communication: 'HTTPS REST API Calls',
    security: ['PCI-DSS Level 1 Certification', 'HMAC Webhook Signatures']
  },
  {
    id: 'NODE-15',
    name: 'External SMS / Email Gateway',
    nodeType: 'External Service',
    purpose: 'Third-party telecommunication service for sending SMS and email messages.',
    hostedComponents: ['Twilio / SendGrid Gateway'],
    communication: 'REST API via HTTPS',
    security: ['API Token Auth', 'IP Restrictions']
  }
];

export const COMPONENT_MERMAID_CODE = `graph TD
    subgraph FrontendLayer ["Presentation & UI Layer"]
        C1["Patient Portal Component"]
        C2["Reception Workstation UI"]
        C3["Clinical Workspace UI"]
    end

    subgraph BusinessLayer ["Business Logic Subsystems"]
        C4["Appointment & OP Subsystem"]
        C5["Clinical Subsystem"]
        C6["Laboratory Subsystem"]
        C7["Pharmacy & Inventory Subsystem"]
        C8["Inpatient Management Subsystem"]
        C9["Billing & Payment Subsystem"]
        C10["Reports & Analytics Component"]
    end

    subgraph InfraLayer ["Core Infrastructure Services"]
        C11["Authentication & RBAC Service"]
        C12["Notification Service"]
        C13["Audit & Security Service"]
    end

    subgraph DataLayer ["Persistence & External Gateways"]
        C14[("Hospital Database")]
        C15["Payment Gateway Adapter"]
        C16["SMS/Email Telecom Gateway"]
    end

    C1 --> C4
    C1 --> C9
    C2 --> C4
    C2 --> C8
    C3 --> C5
    C3 --> C6
    C3 --> C7

    C4 --> C14
    C5 --> C6
    C5 --> C7
    C6 --> C14
    C7 --> C14
    C8 --> C9
    C9 --> C15
    C9 --> C14
    C10 --> C14

    C4 --> C11
    C5 --> C13
    C6 --> C12
    C12 --> C16`;

export const DEPLOYMENT_MERMAID_CODE = `flowchart LR
    subgraph ClientZone ["Client & Workstation Tier"]
        N1["Patient Device (Mobile/Laptop)"]
        N2["Reception Workstation"]
        N3["Doctor Workstation"]
        N4["Lab Workstation"]
        N5["Pharmacy Workstation"]
        N6["Cashier Workstation"]
    end

    subgraph NetworkZone ["Hospital Network & Edge"]
        N7["Reverse Proxy & Load Balancer"]
    end

    subgraph AppZone ["Application Server Tier"]
        N8["Application Server Cluster (Next.js / Node)"]
        N9["Authentication Server (JWT / RBAC)"]
        N10["Notification Queue Server"]
    end

    subgraph DataZone ["Database Tier"]
        N11[("Master Hospital Database Cluster")]
    end

    subgraph ExternalZone ["External Provider Cloud"]
        N12["Payment Gateway (Stripe/UPI)"]
        N13["SMS / Email Provider"]
    end

    N1 -- "HTTPS / TLS 1.3" --> N7
    N2 -- "HTTPS / Secure LAN" --> N7
    N3 -- "HTTPS / Secure LAN" --> N7
    N4 -- "HTTPS / Secure LAN" --> N7
    N5 -- "HTTPS / Secure LAN" --> N7
    N6 -- "HTTPS / Secure LAN" --> N7

    N7 --> N8
    N8 --> N9
    N8 --> N10
    N8 --> N11

    N8 -- "HTTPS REST" --> N12
    N10 -- "HTTPS REST" --> N13`;
