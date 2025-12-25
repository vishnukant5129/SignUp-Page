# Signup/Login Authentication Project

A full-stack authentication system with **React frontend** and **Node.js + Express backend** connected to **MongoDB Atlas**, featuring **password hashing** and **JWT-based authentication**.

---

## 🏗️ Project Structure

backend/
├── config/
│ └── db.js
├── controllers/
│ └── authController.js
├── models/
│ └── user.js
├── routes/
│ └── auth.js
├── utils/
│ └── token.js
├── .env
├── package.json
├── package-lock.json
└── server.js

frontend/
├── src/
│ ├── components/
│ │ ├── SignupForm.jsx
│ │ └── LoginForm.jsx
│ ├── pages/
│ │ ├── Signup.jsx
│ │ └── Login.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── styles.css
└── package.json


---

## ⚡ Features

- User **Signup** with validations:
  - Required fields
  - Email format
  - Password strength
  - Password match
- **Password hashing** with `bcrypt`
- **Login** with JWT token generation
- **Token storage** on frontend (localStorage)
- **MongoDB Atlas** connection for user data storage
- Fully modular **backend** and **frontend** structure

---

## 🛠️ Technologies Used

- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** bcrypt, JSON Web Token (JWT)  
- **Others:** dotenv, cors

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd project-root

#. Backend Setup
cd backend
npm install

PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=yourSecretKey
JWT_EXPIRE=7d

npm run dev

# Frontend Setup
cd frontend
npm install
npm run dev
