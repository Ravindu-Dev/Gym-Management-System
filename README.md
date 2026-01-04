# Gym Management System (GMS)

A full-stack web application for managing gym memberships, equipment, and user subscriptions.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Membership Management**: Create and manage membership plans
- **Equipment Tracking**: Admin panel for managing gym equipment
- **Subscription Management**: Users can subscribe to membership plans
- **Responsive UI**: Modern React frontend with Tailwind CSS

## Tech Stack

### Backend
- Spring Boot 3.2.1
- MongoDB
- JWT Authentication
- Spring Security

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios for API calls

## Prerequisites

- Java 17 (JDK)
- Apache Maven (for building the backend)
- MongoDB (running on localhost:27017)
- Node.js 18+
- npm

### Installing Prerequisites

1. **Java 17**: Download and install from [Adoptium](https://adoptium.net/) or [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

2. **Apache Maven**: Download from [maven.apache.org](https://maven.apache.org/download.cgi) and add to PATH

3. **MongoDB**: Download and install from [mongodb.com](https://www.mongodb.com/try/download/community)

4. **Node.js**: Download from [nodejs.org](https://nodejs.org/)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. The application is already compiled. To run:
   ```bash
   # If using Maven wrapper (if available)
   ./mvnw spring-boot:run

   # Or if Maven is installed globally
   mvn spring-boot:run
   ```

3. The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:5173` (or similar port shown in console)

## Default Data

The application comes with pre-configured membership plans:
- **Basic**: $29.99/month - Access to basic gym facilities
- **Premium**: $49.99/month - Full access to all facilities and classes
- **Annual**: $499.99/year - Year-long membership with all benefits

## Usage

1. **Registration**: Users can register for a new account
2. **Login**: Authenticate with username/password
3. **Browse Plans**: View available membership plans
4. **Subscribe**: Subscribe to membership plans
5. **Admin Panel**: Admin users can manage equipment and view system status

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Membership
- `GET /api/membership/plans` - Get all membership plans
- `POST /api/membership/plans` - Create new plan (Admin only)
- `POST /api/membership/subscribe/{planId}` - Subscribe to plan
- `GET /api/membership/my-subscriptions` - Get user's subscriptions

### Equipment
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Add new equipment (Admin only)
- `DELETE /api/equipment/{id}` - Delete equipment (Admin only)

## Security

- JWT tokens are stored in localStorage
- Role-based access control (USER, ADMIN)
- CORS enabled for frontend-backend communication

## Development

### Building for Production

```bash
# Backend
cd backend
mvn clean package

# Frontend
cd frontend
npm run build
```

## Troubleshooting

1. **MongoDB Connection**: Ensure MongoDB is running on localhost:27017
2. **Port Conflicts**: Backend runs on port 8080, frontend on 5173
3. **CORS Issues**: CORS is configured to allow all origins in development

## Project Structure

```
GMS/
├── backend/
│   ├── src/main/java/com/gms/backend/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── security/
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.jsx
    └── package.json
