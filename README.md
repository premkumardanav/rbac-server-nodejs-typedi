# rbac-server-nodejs-typedi

# HIPAA Healthcare RBAC Server

A secure, HIPAA-aligned healthcare backend service built using **Node.js, TypeScript, TypeDI, TypeORM, and PostgreSQL**. The system supports multiple user roles (Admin, Doctor, Nurse), patient management, assignment workflows, and robust authentication.

---

## 🚀 Features

### ✔️ Authentication

- Secure JWT login
- Password hashing with bcrypt
- Strict token lifetime windows

### ✔️ Role-Based Access Control (RBAC)

- **Admin**
  - Login
  - Add / Delete Doctor
  - Add / Delete Nurse
  - Delete patient
- **Doctor**
  - Login
  - Add / Edit patient
  - Assign patient to nurse
- **Nurse**
  - Login
  - View assigned patients

---

## 🛡 HIPAA-Aligned Security Highlights

This project architecture follows HIPAA-aware development principles:

- Data minimization
- Role-based data isolation
- No PHI stored in activity logs
- HTTPS recommended for deployment
- Password hashing using bcrypt
- Environment-based secret management
- Audit logging layer ready
- Principle of Least Privilege enforced

> ⚠️ Note: HIPAA compliance depends on infrastructure, BAAs, and operational controls. Source code alone does not certify HIPAA compliance.

---

## 🧱 Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Application runtime   |
| TypeScript | Type-safe development |
| TypeORM    | ORM for PostgreSQL    |
| TypeDI     | Dependency injection  |
| PostgreSQL | Data storage          |
| Express    | Web framework         |
| JWT        | Authentication        |

---

## 📁 Project Structure
