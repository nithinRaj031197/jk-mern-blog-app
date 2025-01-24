# Blog Application Documentation

## Overview

The blog application is a full-stack project that allows users to create, manage, and view posts. It includes authentication using Google and Facebook OAuth, a secure API backend built with NestJS, and a modern frontend using ReactJS.

---

## Features

- **User Authentication**: Login via Google or Facebook.
- **JWT Authentication**: Backend-secured endpoints with JWT.
- **CRUD Operations**: Users can create, read, update, and delete posts.
- **Public Post Viewing**: Post details are accessible to both logged-in and logged-out users.
- **Responsive Frontend**: Built using ReactJS.
- **Testing**: Comprehensive unit and integration testing.
- **Deployment**: Dockerized applications deployed to AWS (ECR + EKS) using Terraform.

---

## Backend

### Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **Authentication**: PassportJS (Google and Facebook strategies), JWT
- **ORM**: TypeORM
- **Testing**: Jest

### API Endpoints

#### Authentication

- `POST /auth/google` - Google OAuth login
- `POST /auth/facebook` - Facebook OAuth login

#### Posts

- `GET /posts` - Retrieve all posts
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get details of a specific post
- `PUT /posts/:id` - Update a specific post
- `DELETE /posts/:id` - Delete a specific post

### Database Schema Diagram

```plaintext
Users
------------------------------------------------
| Field         | Type        | Description    |
| ------------- | ----------- | -------------- |
| id            | UUID        | Unique user ID |
| googleId      | String      | Google ID      |
| facebookId    | String      | Facebook ID    |
| email         | String      | User email     |
| displayName   | String      | User name      |

Posts
------------------------------------------------
| Field         | Type        | Description    |
| ------------- | ----------- | -------------- |
| id            | UUID        | Unique post ID |
| userId        | UUID        | Author ID      |
| title         | String      | Post title     |
| body          | String      | Post content   |
| createdAt     | Timestamp   | Creation date  |
| updatedAt     | Timestamp   | Last update    |
```

---

## Frontend

### Tech Stack

- **Framework**: ReactJS
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: CSS Modules
- **Testing**: Cypress

### Pages

1. **Login**: Users can sign in using Google or Facebook.
2. **Dashboard**: Displays a list of posts created by the logged-in user.
3. **Create Post**: Allows users to add a new post.
4. **Post Detail**: Displays the title and content of a specific post (publicly accessible).

---

## Installation

### Prerequisites

- Node.js
- PostgreSQL
- AWS CLI configured
- Docker
- Terraform

### Backend Setup

1. Clone the repository.
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Configure `.env` file.
   ```env
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=1h
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FACEBOOK_CLIENT_ID=your_facebook_client_id
   FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
   POSTGRES_URI=postgresql://username:password@localhost:5432/blogdb
   ```
4. Start the backend server.
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend directory.
   ```bash
   cd frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the React development server.
   ```bash
   npm start
   ```

---

## Testing

### Backend

Run unit tests using Jest:

```bash
npm run test
```

### Frontend

Run integration tests using Cypress:

```bash
npm run cypress
```

---

## Deployment

### Dockerization

1. Build Docker images.
   ```bash
   docker build -t blog-backend ./backend
   docker build -t blog-frontend ./frontend
   ```
2. Push images to AWS ECR.

### Deploy with Terraform

1. Initialize Terraform.
   ```bash
   terraform init
   ```
2. Apply the configuration.
   ```bash
   terraform apply
   ```

---

## Future Improvements

- Implement pagination for posts.
- Add role-based access control.
- Improve test coverage to 90%.
- Optimize API performance for large datasets.
- Implement WebSockets for real-time updates.

---

## Contact

For questions or support, contact [Your Name](mailto:your.email@example.com).
