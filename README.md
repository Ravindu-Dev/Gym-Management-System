# 🏋️‍♂️ GMS - Ultimate Gym Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/frontend-React%2019-61dafb.svg)
![SpringBoot](https://img.shields.io/badge/backend-Spring%20Boot%203.2-6db33f.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47a248.svg)

**GMS (Gym Management System)** is a premium, full-stack fitness ecosystem designed for modern gym owners and members. It features a cutting-edge **Glassmorphism UI**, a robust trainer-booking marketplace, and a contactless entry pass system.

---

## ✨ Key Features

### 🌟 Premium Experience
- **Adaptive Dark Mode**: A stunning obsidian-themed interface with glassmorphism effects.
- **Contactless Entry**: Digital Member QR Passes for instant gym access.
- **Interactive Contact**: Integrated with **EmailJS** for direct user-to-admin communication.

### 👤 For Members
- **Membership Management**: Browser and subscribe to tailored gym plans.
- **Trainer Marketplace**: Browse certified trainers, view profiles, and book sessions.
- **Personal Dashboard**: Track your bookings, manage your profile, and access your digital Entry Pass.

### 👟 For Trainers
- **Professional Profiles**: Show off specializations, experience, and certifications.
- **Booking Management**: Accept or reject session requests in real-time.
- **Performance Tracking**: View scheduled and completed sessions.

### 🛡️ For Admins
- **Entry Scanner**: Integrated **Webcam QR Scanner** for member check-ins.
- **Strategic Control**: Manage trainer approvals, equipment inventory, and user analytics.
- **Financial Overview**: Monitor membership subscriptions and revenue growth.

---

## 🛠 Tech Stack

| Backend | Frontend | Aesthetics/Tools |
| :--- | :--- | :--- |
| **Java 17** | **React 19 (Vite)** | **Tailwind CSS** |
| **Spring Boot 3** | **Axios API** | **Glassmorphism Design** |
| **Spring Security** | **React Router 7** | **EmailJS Integration** |
| **MongoDB** | **Recharts** | **Html5-QRCode Scanner** |
| **JWT (Auth)** | **Lucide Icons** | **React-QR-Code** |

---

## 🚀 Installation & Setup

### Prerequisites
- **Java 17+** & **Maven**
- **Node.js 18+** & **npm**
- **MongoDB** (Local or Atlas)

### 1. Backend Setup
```bash
cd backend
mvn spring-boot:run
```
*Server starts on `http://localhost:8080`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Vite server starts on `http://localhost:5173`*

---

## 🔐 Security & Roles
GMS implements strict **JWT-based Authentication** with 3 distinct roles:
1. **ROLE_MEMBER**: Access to bookings, plans, and entry pass.
2. **ROLE_TRAINER**: Manage session requests and professional profiles.
3. **ROLE_ADMIN**: Full system oversight, entry scanning, and trainer approval.

---

## 📂 Project Structure
```text
GMS/
├── backend/            # Spring Boot Application
│   ├── src/main/java/  # Architecture: Controller -> Service -> Repository
│   └── src/resources/  # Configuration & Database properties
└── frontend/           # React 19 Frontend
    ├── src/components/ # Modular Glassmorphism UI Components
    ├── src/services/   # API Integration Layer
    └── src/index.css   # Custom Utility Classes & Design Tokens
```

---

## 📧 Support
For technical support or membership inquiries, visit our **Contact Page** or reach out to:
**support@gms-fitness.com**

---

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](file:///c:/Users/user/Desktop/GMS/LICENSE) file for details.

*Built with ❤️ for the Fitness Community.*
