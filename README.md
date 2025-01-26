# User Management Application

## Features
- List all users
- View user details
- Add and edit users
- Validations on frontend and backend

## Technology Stack
- Frontend: Next.js
- Backend: Node.js with Express
- Database: MongoDB
- Containerization: Docker

## Prerequisites
- Docker
- Node.js
- MongoDB

## Setup
1. Clone the repository.
2. Create a `.env` file in the `backend` folder with the following variables:
  MONGO_URI=mongodb://mongo:27017/users PORT=5000
  and in frontend .env file 
  NEXT_NODE_ENV=production
  NEXT_PUBLIC_API_URL=localhost:5000
3. Run the application using Docker:
  docker-compose up --build
4. After Build just up the container 
  docker-compose up -d
4. Access the application:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/users`

