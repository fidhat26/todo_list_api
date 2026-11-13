# To-Do List REST API — Backend

## 1. Project Overview

This project is the backend of a To-Do List application built using Node.js, Express.js, and MongoDB. It provides REST API endpoints for creating, retrieving, updating, and deleting tasks.

The API also supports task completion status updates, input validation, error handling, and integration with a React frontend.

## 2. Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- Git and GitHub
- Render for deployment
- Postman for API testing


## 3. Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Atlas account or another accessible MongoDB database
- Postman for testing the API
- A code editor such as Visual Studio Code

## 4. Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/fidhat26/todo_list_api.git
cd express-todo
```

Replace the placeholder with your actual GitHub repository URL and folder name.

### Step 2: Install dependencies

```bash
npm install
```

If CORS is not already included in the project dependencies, install it using:

```bash
npm install cors
```

### Step 3: Configure environment variables

Create a `.env` file in the backend root directory if you want to run the backend locally using environment variables.

Add the following:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

Do not commit the `.env` file or share database credentials publicly.

The application reads `MONGODB_URI` from the environment. If you use a local `.env` file, install `dotenv` and load it at the beginning of `index.js` with:

```javascript
require('dotenv').config();
```

Install dotenv if needed:

```bash
npm install dotenv
```

For deployment, configure `MONGODB_URI` in the Render service's environment variables. Render provides the port through `process.env.PORT`.

### Step 4: Start the backend

```bash
npm start
```

The server connects to MongoDB before accepting requests.

The application runs on the configured port, or port 3000 locally by default.


## 5. Deployment

The backend is deployed on Render:

https://todo-list-api-qfvh.onrender.com

To deploy changes, commit and push the updated source code to the connected GitHub repository. Check the Render deployment logs to confirm that the server starts and connects to MongoDB successfully.

## 6. Challenges Faced and Solutions

### Challenge 1: Organizing the backend

Initially, the API logic needed to be organized into separate files.

**Solution:** Separated the application into models, services, controllers, and routes to improve readability and maintainability.

### Challenge 2: Missing service module during deployment

Render initially reported that it could not find `../services/taskService`.

**Solution:** Checked the project folder structure, corrected the file location or naming, and redeployed the application.

### Challenge 3: Connecting React to the backend

The React frontend could not access the deployed API because the browser blocked requests due to CORS.

**Solution:** Installed the CORS package and configured the Express backend to allow requests from the React development origin.

### Challenge 4: Validating requests and handling errors

Invalid task titles and task IDs needed appropriate responses.

**Solution:** Added input validation, task ID checks, not-found responses, and centralized error-handling middleware.

## 7. Future Improvements

- Add a dedicated server-side task search endpoint.
- Add authentication and user-specific task lists.
- Add pagination for large task collections.
- Add automated API tests.

## 8. Conclusion

This project demonstrates the development and deployment of a REST API using Node.js, Express.js, and MongoDB. Its modular structure, validation, error handling, and CORS configuration allow it to integrate with a React frontend.
