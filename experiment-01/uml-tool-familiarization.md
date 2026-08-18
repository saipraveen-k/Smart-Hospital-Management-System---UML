# UML Tool Familiarization Report: StarUML & Mermaid.js

This report documents the tools, procedures, and conventions used for creating UML models in this project.

---

## 1. Overview of StarUML
**StarUML** is a commercial desktop UML modeling tool widely used in software engineering education and industry for standard MDA (Model-Driven Architecture) specification.

### 1.1 Project & Model Creation
1. Launch StarUML and select **File -> New Project**.
2. Right-click the Root Model node in Model Explorer to add subsystem packages (e.g. `Patient Management`, `Clinical Management`).

### 1.2 Class Diagram Creation
1. Right-click a package and select **Add Diagram -> Class Diagram**.
2. Drag **Class** elements from the Toolbox onto the canvas.
3. Edit class attributes, operations, and access visibilities (`+` Public, `-` Private, `#` Protected).
4. Select relationship tools (**Association**, **Aggregation**, **Composition**, **Generalization**, **Dependency**) to connect classes with multiplicity labels (`1`, `0..*`, `1..*`).

### 1.3 Use Case Diagram Creation
1. Add a **Use Case Diagram**.
2. Insert **Actors** and **Use Cases** surrounded by a System Boundary box.
3. Connect actors to use cases via Associations, and add `<<include>>` / `<<extend>>` stereotyped dependencies between use cases.

### 1.4 Sequence & Behavioral Diagrams
1. Add **Sequence Diagram** to model message passings between lifelines (`Boundary`, `Control`, `Entity`).
2. Add **Activity Diagram** to chart swimlanes and decision nodes.
3. Add **State Machine Diagram** to capture entity lifecycle state transitions.

---

## 2. Text-Based Diagramming via Mermaid.js

For this laboratory submission, **Mermaid.js** is utilized as the primary text-based diagram representation engine.

### 2.1 Benefits of Mermaid.js
* **Version Control**: Plain-text `.mmd` files allow precise Git versioning, diff tracking, and collaborative editing.
* **Instant Rendering**: Automatically compiles inside Markdown previewers, GitHub UI, and automated documentation pipelines.
* **Deterministic Layout**: Eliminates manual visual layout clutter and ensures clean, repeatable rendering.

### 2.2 Mermaid Diagram Syntax Mapping
| UML Diagram Type | Mermaid Standard Identifier | Key Elements |
| :--- | :--- | :--- |
| **Class Diagram** | `classDiagram` | `class ClassName { -attr: Type \n +method(): Type }` |
| **Sequence Diagram** | `sequenceDiagram` | `Actor->>System: Message()` |
| **Activity Diagram** | `flowchart TD` | `node[Label] --> decision{Decision?}` |
| **State Machine** | `stateDiagram-v2` | `[*] --> State1 \n State1 --> State2 : Event` |
| **Architecture / Package**| `flowchart LR` | `subgraph PackageName \n end` |

---

## 3. Export & Verification Workflow
1. Authored `.mmd` scripts in designated experiment directories.
2. Verified syntax using standard Mermaid parser tooling.
3. Rendered vector diagrams for integration into the final laboratory record.
