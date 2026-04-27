# 💼 Career.io – Job Portal Platform

🔗 **Live Site:** [https://careerio-frontend.vercel.app]  
---

## 🚀 Overview

Career.io is a full-stack job portal designed to streamline the hiring process by connecting **job seekers** and **recruiters**. It enables job posting, application management, and profile-based hiring workflows with a focus on performance, scalability, and clean API design.

---

## 🎯 Key Highlights (Why this project matters)

- Designed and built **RESTful APIs** for job and application workflows  
- Implemented **JWT-based authentication & protected routes**  
- Structured backend for **scalable data handling and efficient queries**  
- Managed **real-world hiring workflows** (posting → applying → tracking)  
- Integrated frontend and backend for seamless UX  

---

## ✨ Features

### 👤 For Job Seekers
- Create and manage profiles
- Browse and search job listings
- Apply to jobs
- Track application status

### 🏢 For Recruiters
- Post and manage job listings
- View applicants
- Manage hiring workflow

### 🔐 Authentication & Security
- JWT-based authentication
- Protected API routes
- Role-based access (if implemented, add here)

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Frontend
- Next.js
- React.js
- Redux

### Tools
- Postman (API testing)
- Git & GitHub

---

## 🧠 Backend Architecture (Important for recruiters)

- Built modular REST APIs using Express.js  
- Structured routes, controllers, and models for maintainability  
- Implemented CRUD operations for:
  - Jobs
  - Applications
  - Users  
- Used MongoDB for flexible schema design  
- Handled async operations with proper error handling  

---

## 🔌 API Overview

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST | /api/auth/login | User login |
| POST | /api/auth/register | User registration |
| GET | /api/jobs | Get all jobs |
| POST | /api/jobs | Create job |
| POST | /api/applications | Apply to job |
| GET | /api/applications | Get user applications |

*(Update endpoints based on your actual implementation)*

---

## 📸 Screenshots

### 🏠 Homepage
![Homepage](https://i.postimg.cc/2jLp8KMM/image.png)

### 📄 Job Listings
![Jobs](https://i.postimg.cc/wB4P9XVY/image.png)

### 📥 Application Dashboard
![Applications](https://i.postimg.cc/gJ6Mdfjc/image.png)


---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/career-io.git

# Navigate into project
cd career-io

# Install dependencies
npm install

# Run backend
npm run server

# Run frontend
npm run dev

🔑 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
🚧 Future Improvements
Advanced filtering & search
Notification system
Resume upload & parsing
Admin dashboard
Microservices architecture (future scaling)
🧩 Challenges & Learnings
Designing scalable API structure
Managing authentication securely with JWT
Handling relational data in MongoDB
Syncing frontend state with backend data

👨‍💻 Author
Shahariar Shawon
📧 shahariarshawon.dev@gmail.com
