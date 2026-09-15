# 🎓 Smart Academic Dashboard

> A web-based academic interaction and management platform designed to improve communication and coordination between students and teachers.

## 📌 Problem Statement

In many academic environments, communication between students and teachers takes place through multiple informal channels such as verbal communication, paper-based submissions, messaging applications, or scattered classroom announcements.

This can result in:

* Difficulty in collecting and organizing student feedback
* Assignments and deadlines being communicated through different channels
* Students finding it difficult to raise academic requests or complaints
* Lack of a centralized platform for student–teacher interaction
* Difficulty for teachers in tracking and reviewing student responses
* Important academic information becoming scattered across different platforms

## 💡 Proposed Solution

The **Smart Academic Dashboard** provides a centralized digital platform for structured interaction between students and teachers.

The system brings important academic activities into a single platform through dedicated modules for:

**Classroom Feedback → Assignment Tracking → Complaints & Requests**

Students can use the platform to access assignments, submit classroom feedback, raise doubts, and submit requests or complaints.

Teachers can use their dashboard to create and manage assignments, review classroom feedback, and view student requests.

---

## 🎯 Objectives

The main objectives of the Smart Academic Dashboard are to:

* Provide a centralized platform for student–teacher interaction
* Digitize classroom feedback collection
* Simplify assignment creation and tracking
* Provide a structured channel for student requests and complaints
* Reduce dependency on informal communication methods
* Improve transparency and organization in academic activities
* Provide separate interfaces for students and teachers
* Store and manage academic interaction data systematically

---

## ✨ Key Features

### 👩‍🎓 Student Dashboard

Students can access academic interaction features through a dedicated dashboard.

* Student login
* Personalized student dashboard
* View assignments
* View assignment questions and deadlines
* Submit classroom feedback
* Raise classroom doubts
* Submit complaints and requests
* Anonymous complaint/request submission

### 👩‍🏫 Teacher Dashboard

Teachers have a dedicated dashboard for managing academic activities and reviewing student interactions.

* Teacher login
* Teacher dashboard
* Create assignments
* Add assignment questions
* Set assignment deadlines
* Manage assignment information
* Review classroom feedback
* View feedback summaries
* View student requests and complaints

---

## 📝 Classroom Feedback

The **Classroom Feedback** module provides a structured method for students to communicate their classroom experience.

### Students can:

* View scheduled classroom sessions
* Submit feedback
* Raise doubts or questions
* Communicate classroom-related concerns

### Teachers can:

* Review submitted feedback
* Monitor student responses
* View feedback summaries
* Identify classroom-related concerns

This helps transform classroom feedback from an informal process into a more organized digital workflow.

---

## 📚 Assignment Tracker

The **Assignment Tracker** helps teachers and students manage assignments in a structured manner.

### Teachers can:

* Create assignments
* Add assignment questions
* Set deadlines
* Manage assignment details

### Students can:

* View available assignments
* View assignment questions
* Check assignment deadlines
* Keep track of academic tasks

This reduces dependency on separate messaging platforms for assignment communication.

---

## 📮 Complaint / Request Box

The **Complaint / Request Box** provides students with a structured channel for communicating academic concerns.

Students can submit:

* Academic requests
* Classroom-related concerns
* Complaints
* Other relevant requests

The system also provides an **anonymous submission option**, allowing students to communicate sensitive concerns while still requiring login access to the platform.

Teachers can access and review submitted requests through their dashboard.

---

## 🔐 Role-Based Access

The application provides separate interfaces based on the user's role.

| Role          | Main Responsibilities                                            |
| ------------- | ---------------------------------------------------------------- |
| 👩‍🎓 Student | View assignments, submit feedback, raise doubts, submit requests |
| 👩‍🏫 Teacher | Create assignments, review feedback, manage requests             |

The login interface allows users to select their appropriate role before accessing the corresponding dashboard.

---

## 🛠️ Technology Stack

### Frontend

* **HTML5** – Structure and page layout
* **CSS3** – Styling and user interface design
* **JavaScript** – Client-side functionality and API communication

### Backend

* **Node.js** – Backend runtime environment
* **Express.js** – Server-side application framework

### Database

* **MySQL** – Relational database for storing application data

### Development Tools

* **Visual Studio Code**
* **Git**
* **GitHub**
* **MySQL**

---

## 🏗️ System Architecture

The application follows a three-layer web application architecture.

```text
┌─────────────────────────────┐
│          Frontend           │
│      HTML + CSS + JS        │
└──────────────┬──────────────┘
               │
               │ HTTP Requests
               ▼
┌─────────────────────────────┐
│           Backend           │
│      Node.js + Express      │
└──────────────┬──────────────┘
               │
               │ Database Queries
               ▼
┌─────────────────────────────┐
│          Database           │
│           MySQL             │
└─────────────────────────────┘
```

The frontend communicates with the Node.js backend through HTTP requests. The backend handles application logic and communicates with the MySQL database.

---

## 🔄 Application Workflow

```text
                    ┌───────────────┐
                    │     Login     │
                    └───────┬───────┘
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
        ┌──────────────┐          ┌──────────────┐
        │    Student   │          │    Teacher   │
        │   Dashboard  │          │   Dashboard  │
        └──────┬───────┘          └──────┬───────┘
               │                         │
       ┌───────┼────────┐        ┌───────┼─────────┐
       ▼       ▼        ▼        ▼       ▼         ▼
   Feedback Assignments Requests Assignments Feedback Requests
       │       │        │        │       │         │
       └───────┴────────┴────────┴───────┴─────────┘
                            │
                            ▼
                       ┌─────────┐
                       │  MySQL  │
                       │Database │
                       └─────────┘
```

---

## 📂 Project Structure

```text
Smart-Academic-Dashboard/
│
├── index.html
├── student-dashboard.html
├── teacher-dashboard.html
│
├── assignment.html
├── teacher-assignment.html
│
├── feedback.html
├── teacher-feedback.html
│
├── complaint.html
├── teacher-requests.html
│
├── css/
│   ├── style.css
│   ├── dashboard.css
│   ├── assignment.css
│   ├── feedback.css
│   ├── complaint.css
│   ├── teacher-dashboard.css
│   ├── teacher-assignment.css
│   ├── teacher-feedback.css
│   └── teacher-requests.css
│
├── js/
│   ├── script.js
│   ├── dashboard.js
│   ├── assignment.js
│   ├── feedback.js
│   ├── complaint.js
│   ├── teacher-dashboard.js
│   ├── teacher-assignment.js
│   ├── teacher-feedback.js
│   └── teacher-requests.js
│
├── backend/
│   ├── index.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> **Note:** `node_modules` is intentionally excluded from version control using `.gitignore`. Dependencies can be recreated using `npm install`.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/)
* MySQL
* Visual Studio Code
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/singarambhuvanakruthi/Smart-Academic-Dashboard.git
```

Navigate into the project directory:

```bash
cd Smart-Academic-Dashboard
```

### 2. Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

### 3. Configure the Database

Make sure MySQL is installed and running.

Create the required database and tables according to the application's database configuration.

The repository includes:

```text
.env.example
```

Use this file as a reference for creating your local environment configuration.

> **Security:** Never upload real database passwords, API keys, or other sensitive credentials to GitHub.

### 4. Start the Backend

From the `backend` directory:

```bash
npm start
```

The backend server runs locally on:

```text
http://localhost:5000
```

### 5. Run the Frontend

Open the project in **Visual Studio Code** and launch the frontend using the **Live Server** extension.

The frontend communicates with the backend through HTTP API requests.

---

## 🖥️ Application Modules

| Module               | Student | Teacher |
| -------------------- | :-----: | :-----: |
| Login                |    ✅    |    ✅    |
| Dashboard            |    ✅    |    ✅    |
| View Assignments     |    ✅    |    —    |
| Create Assignments   |    —    |    ✅    |
| Assignment Deadlines |    ✅    |    ✅    |
| Submit Feedback      |    ✅    |    —    |
| Review Feedback      |    —    |    ✅    |
| Raise Doubts         |    ✅    |    —    |
| Submit Requests      |    ✅    |    —    |
| View Requests        |    —    |    ✅    |
| Anonymous Requests   |    ✅    |    —    |

---

## 🔒 Security Considerations

The project follows basic development practices such as:

* Excluding `node_modules` from version control
* Keeping environment-specific configuration separate
* Providing `.env.example` instead of publishing sensitive environment files
* Separating frontend and backend responsibilities

For production deployment, additional security measures such as secure authentication, password hashing, authorization middleware, input validation, HTTPS, and database security should be implemented.

---

## 🌱 Future Enhancements

The system can be further expanded with:

* Admin dashboard
* Advanced role-based authorization
* Assignment submission and grading
* Notifications and reminders
* Email notifications
* Real-time teacher–student communication
* Advanced feedback analytics
* Attendance management
* Academic performance analytics
* File and document uploads
* Enhanced authentication and security
* Search and filtering across academic records
* Cloud deployment

---

## 🎓 Project Purpose

The Smart Academic Dashboard was developed as an academic software project to explore the development of a full-stack web application and understand how frontend interfaces, backend services, APIs, and relational databases work together.

The project provides practical experience in:

* Frontend development
* Backend development
* REST API communication
* Database integration
* Role-based application design
* Git and GitHub
* Web application architecture
* Software project organization

---

## 📄 License

This project is intended for academic and educational purposes.
