# Code's Thinker Backend

Production-ready backend API for the Code's Thinker website. Built using Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

---

## 1. Directory Structure & Architecture

The project follows a modular, layered architecture to ensure clean separation of concerns and ease of maintenance.

```
Code'sThinker Backend/
├── prisma/
│   └── schema.prisma         # Database schema mapping models for tables
├── src/
│   ├── config/
│   │   └── index.ts          # Environment variables parsing & validation
│   ├── controllers/          # Business logic handlers
│   │   ├── admin.ts          # Admin query & download actions
│   │   ├── career.ts         # Job and Internship submissions
│   │   ├── contact.ts        # General contact inquiries
│   │   └── service.ts        # Service request submissions
│   ├── middleware/           # Interceptors & checks
│   │   ├── auth.ts           # Admin api-key authenticator
│   │   ├── errorHandler.ts   # Centralized Express error handler
│   │   ├── schemas.ts        # Zod validation schemas
│   │   ├── upload.ts         # Multer configuration for file uploads
│   │   └── validate.ts       # Request validation parser
│   ├── routes/
│   │   └── api.ts            # Route configuration
│   ├── services/
│   │   └── email.ts          # Nodemailer email notification service
│   ├── utils/
│   │   └── logger.ts         # Console & logging utilities
│   ├── db.ts                 # Database client singleton export
│   └── index.ts              # Express application bootstrap
├── vercel.json               # Serverless routing config for Vercel
├── tsconfig.json             # TypeScript compiler settings
├── package.json              # Dependency manifests
└── README.md
```

---

## 2. Core Coding Conventions & Safety

To keep this codebase maintainable and safe as it grows:

### 🛡️ Input Validation (Zod)
Never parse `req.body` directly inside controllers. Always create a schema in `src/middleware/schemas.ts` and apply it to the route using:
```typescript
router.post('/endpoint', validateRequest(yourSchema), controllerHandler);
```

### 📦 Memory Storage & Binary Security Check
For serverless platforms (Vercel), uploads use `multer.memoryStorage()`. 
*   Always inspect magic binary signatures of uploads in the controller using validation helpers to prevent executable files from entering your database.
*   Store resumes as binary `Bytes` in the database. This eliminates the need for persistent local filesystem folders.

### 🔌 Database Singleton
Prisma client instantiation is confined to `src/db.ts` to prevent open connection pool exhaustion during hot-reloading in development. Always import the default `prisma` export from `../db`.

### 🚨 Centralized Error Handling
Never send error JSON responses from catch blocks. Catch blocks should simply forward the exception to `next(error)` which is caught by the global middleware `src/middleware/errorHandler.ts`. Use the custom helper `AppError(message, status)` for throwing operational errors.

---

## 3. Maintenance Guide

### How to Add a New Form/Model:
1. Open `prisma/schema.prisma` and define your new model.
2. Generate the types and synchronize the database:
   ```bash
   npx prisma db push
   ```
3. Create your Zod validation schema in `src/middleware/schemas.ts`.
4. Build a handler in `src/controllers/` to write records to the database using `prisma.yourModel.create()`.
5. Mount the route inside `src/routes/api.ts`.
