# Security Policy

## Supported Versions

The following versions of GMS are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0.0 | ❌ No              |

## Reporting a Vulnerability

We take the security of our users and their data seriously. If you have found a security vulnerability in the Gym Management System, please help us by reporting it responsibly.

### How to Report
Please do **not** report security vulnerabilities via public GitHub issues. Instead, please send an email to:
**security@gms-fitness.com**

Please include the following information in your report:
- **Type of issue** (e.g., XSS, SQLi, Auth Bypass)
- **Component affected** (e.g., Backend Auth, Frontend Dashboard)
- **Steps to reproduce** the vulnerability
- **Potential impact**

### Our Commitment
Upon receiving a report, we will:
1. Acknowledge the receipt of your report within 48 hours.
2. Provide an estimated timeline for a fix.
3. Notify you once the vulnerability has been patched.

## Security Features in GMS

GMS is built with a "Security First" approach:

### 1. Authentication & Authorization
- **JWT (JSON Web Tokens)**: All requests are authenticated using secure, signed tokens.
- **RBAC (Role-Based Access Control)**: Strict separation between `ADMIN`, `TRAINER`, and `MEMBER` roles at both the API and UI levels.
- **Password Hashing**: Industry-standard encryption for user credentials stored in the database.

### 2. API Security
- **CORS Protection**: Configured to restrict cross-origin requests to trusted sources.
- **Input Validation**: Server-side validation for all incoming data to prevent injection attacks.
- **Secure Defaults**: Spring Security is configured with secure defaults to protect against common web vulnerabilities like CSRF.

### 3. Frontend Security
- **Protected Routes**: React Router guards prevent unauthorized access to private pages.
- **State Management**: Sensitive data is cleared upon logout.
- **XSS Prevention**: React's built-in escaping mechanisms protect against Cross-Site Scripting.

---
*Thank you for helping us keep the GMS community safe.*
