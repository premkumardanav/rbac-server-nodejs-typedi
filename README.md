# rbac-server-nodejs-typedi

# HIPAA Healthcare RBAC Server

A secure, HIPAA-aligned healthcare backend service built using **Node.js, TypeScript, TypeDI, TypeORM, and PostgreSQL**. The system supports multiple user roles (Admin, Doctor, Nurse), patient management, assignment workflows, and robust authentication.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/premkumardanav/rbac-server-nodejs-typedi.git
   cd rbac-server-nodejs-typedi
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database credentials

4. **Seed database with sample users**

   ```bash
   npm run seed
   ```

   This creates 4 sample users:

   - Admin: `admin@example.com` / `admin@123`
   - Doctor: `doctor@example.com` / `doctor@123`
   - Doctor: `doctor2@example.com` / `doctor@123`
   - Nurse: `nurse@example.com` / `nurse@123`

5. **Start the server**

   ```bash
   npm run dev
   ```

6. **Access Swagger Documentation**
   Open: **http://localhost:3000/docs**

---

## 👨‍💻 Developer Guide

### Directory Structure

```
src/
├── server.ts                 # Main server entry point
├── common/                   # Shared utilities & middlewares
│   ├── middlewares/         # Auth & role middlewares
│   └── utils/               # Helper functions (hashing, etc.)
├── config/                  # Configuration files
│   ├── datasource.ts        # TypeORM database configuration
│   ├── env.ts               # Environment variables
│   └── swagger.ts           # Swagger/OpenAPI configuration
├── database/                # Database migrations & seeds
├── entities/                # TypeORM entities
│   ├── User.ts              # User entity
│   └── Patient.ts           # Patient entity
├── enums/                   # Enums
│   └── UserRole.ts          # User roles
├── modules/                 # Feature modules
│   ├── auth/                # Authentication module
│   ├── admin/               # Admin module
│   ├── doctor/              # Doctor module
│   ├── nurse/               # Nurse module
│   └── patient/             # Patient module
└── scripts/                 # Utility scripts
    └── seed.ts              # Database seeding script
```

### Available Scripts

```bash
# Development
npm run dev              # Start server with hot reload

# Production
npm run build            # Compile TypeScript to JavaScript
npm start                # Run compiled JavaScript

# Database
npm run seed             # Populate database with sample data

# Build
npm run build            # Compile all TypeScript files
```

### Environment Variables

All environment variables are defined in `src/config/env.ts`:

```env
# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=hipaa_healthcare
```

See `.env.example` for the complete template.

### Adding Sample Users

After setting up the database:

```bash
npm run seed
```

This script:

- ✅ Checks if users already exist
- ✅ Creates 4 sample users with different roles
- ✅ Hashes passwords securely using bcrypt
- ✅ Displays credentials for easy testing

### Testing the API

1. **Start the server:**

   ```bash
   npm run dev
   ```

2. **Seed the database:**

   ```bash
   npm run seed
   ```

3. **Login to get token:**

   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@example.com", "password": "admin@123"}'
   ```

4. **Use token in requests:**

   ```bash
   curl -H "Authorization: Bearer <token>" \
     http://localhost:3000/api/protected-endpoint
   ```

5. **View API docs:**
   Open http://localhost:3000/docs in your browser

### Database Schema

The application uses TypeORM to manage the following tables:

- **users**: Stores user accounts with roles (admin, doctor, nurse)
- **patients**: Stores patient information with doctor & nurse assignments

All tables include automatic `createdAt` and `updatedAt` timestamps for audit trails.

### Authentication Flow

1. **Login**: Send email & password to `/auth/login`
2. **Get Token**: Receive JWT token (valid for 1 hour)
3. **Use Token**: Send token in `Authorization: Bearer <token>` header
4. **Access Protected Routes**: Middleware validates token and role

### Best Practices

- ✅ All passwords are hashed with bcrypt
- ✅ JWT tokens expire after 1 hour
- ✅ Role-based access control enforced
- ✅ Timestamps track record modifications
- ✅ Environment variables for sensitive data
- ✅ Swagger documentation for all endpoints

---

## 📚 API Documentation

### Swagger UI

The API documentation is available at `http://localhost:3000/docs` with interactive testing capabilities.

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Testing API Endpoints

#### Login (Public Endpoint)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "password123"
  }'
```

Expected response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Using Token in Requests

Use the returned token in subsequent requests:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/endpoint
```

---

## 🚀 Features

### ✔️ Authentication

- Secure JWT login
- Password hashing with bcrypt
- Strict token lifetime windows (1 hour)

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
- Automatic timestamps for audit trails

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
| Swagger    | API Documentation     |

---

## 📁 Project Structure
