
# Workflow Builder UI – Frontend Assignment

This project is a **Frontend-only Workflow Builder UI** built as part of the **Full Stack Intern (Frontend Heavy)** assignment.

The application allows users to visually create and manage workflows using different types of nodes such as Action, Branch (Condition), and End nodes.

---

## 🚀 Live Demo
👉 Add your deployed link here  
Example: https://workflow-builder-ui-one.vercel.app/

---

## 📂 GitHub Repository
👉 Add your GitHub repo link here  
Example: https://github.com/Sumitkmt946/Workflow-Builder-UI

---

## 🛠 Tech Stack

- React (Functional Components & Hooks)
- JavaScript
- CSS (No UI libraries used)


---

## 📌 Features

### 1. Workflow Canvas
- Starts with a default **Start** node
- Displays workflow in a structured vertical flow
- Nodes are visually connected to represent flow

### 2. Node Types
- **Action Node**  
  - Represents a single task  
  - Allows only one outgoing connection

- **Branch (Condition) Node**  
  - Represents decision logic (e.g., If / Else)  
  - Supports multiple outgoing branches (True / False)

- **End Node**  
  - Final node in the workflow  
  - No outgoing connections

### 3. User Interactions
- Add new nodes (Action / Branch / End)
- Edit node title/label
- Delete nodes (except Start node)
- Automatic reconnection of workflow after node deletion
- Dynamic state management using JavaScript objects

---

## 💾 State Management
- Entire workflow is managed using a **JSON-based data structure**
- State updates handled using React Hooks

---

## ⭐ Bonus Features
- Save button to log the complete workflow structure to the console

---

## 📦 Installation & Setup

1. Clone the repository
```bash
git remote add origin https://github.com/Sumitkmt946/Workflow-Builder-UI.git
````

2. Navigate to project directory

```bash
cd workflow-builder-ui
```

3. Install dependencies

```bash
npm install
```

4. Start development server

```bash
npm start
```

---

## 📤 Deployment

The project can be deployed on:

* Vercel
* Netlify

---

## 📝 Notes

* This is a **frontend-only assignment**
* No backend or database is used
* Focus is on UI, state management, and workflow logic

---

## 👤 Author

**Sumit Kumawat**

---

Thank you for reviewing this assignment 🙂

```


```
