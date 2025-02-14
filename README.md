# **MERN Stack Social Media Application**

This is a full-stack social media application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to register, log in, create posts, like posts, add comments, and perform CRUD operations on their posts.

---

## **Features**

### **Backend (Node.js + Express.js)**

1. **User Authentication**:

   - User registration with email, username, and password.
   - User login with username and password.
   - Forgot password functionality with email reset link.
   - JWT-based authentication for secure API access.

2. **Post Management**:

   - Create, read, update, and delete (CRUD) posts.
   - Like posts and add comments to posts.
   - Fetch all posts or a single post by its ID.

3. **Security**:
   - Password hashing using `bcryptjs`.
   - Protected routes using JWT middleware.

### **Frontend (React.js)**

1. **User Interface**:

   - User registration and login pages.
   - Forgot password page.
   - Dashboard to view all posts.
   - Single post view with likes and comments.

2. **Functionality**:

   - Create, update, and delete posts.
   - Like posts and add comments.
   - Logout functionality.

3. **Styling**:
   - Modern and responsive UI using **TailwindCSS**.

---

## **Technologies Used**

### **Backend**

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Nodemailer**: For sending password reset emails.
- **Bcryptjs**: For password hashing.

### **Frontend**

- **React.js**: JavaScript library for building the user interface.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.
- **TailwindCSS**: Utility-first CSS framework for styling.

---

## **Installation**

### **Prerequisites**

- Node.js and npm installed on your machine.
- MongoDB installed or a MongoDB Atlas connection string.

### **Steps**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rakibul-wdp/mern-social-media.git
   cd mern-social-media
   ```

2. **Install backend dependencies**:

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**:

   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     EMAIL=your_email@gmail.com
     EMAIL_PASSWORD=your_email_password
     ```

5. **Start the backend server**:

   ```bash
   cd ../backend
   npm start
   ```

6. **Start the frontend development server**:

   ```bash
   cd ../frontend
   npm start
   ```

7. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`.

---

## **API Endpoints**

### **Authentication**

- **POST `/api/auth/register`**: Register a new user.
- **POST `/api/auth/login`**: Log in a user.
- **POST `/api/auth/forgot-password`**: Send a password reset link to the user's email.

### **Posts**

- **GET `/api/posts`**: Fetch all posts.
- **GET `/api/posts/:id`**: Fetch a single post by ID.
- **POST `/api/posts`**: Create a new post.
- **PUT `/api/posts/:id`**: Update a post by ID.
- **DELETE `/api/posts/:id`**: Delete a post by ID.
- **POST `/api/posts/:id/like`**: Like a post.
- **POST `/api/posts/:id/comment`**: Add a comment to a post.

---

## **Folder Structure**

```
mern-social-media-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── README.md
└── .gitignore
```

---
