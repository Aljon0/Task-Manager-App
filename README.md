### Task Manager App

## Introduction

The Task Manager App is a lightweight and efficient task management system developed using React + Vite for the frontend, TailwindCSS for styling, and MongoDB as the backend database, accessed via an API. The application helps users organize tasks effectively with features such as task creation, filtering, and a responsive design optimized for both desktop and mobile devices.

## Problem Statement

Managing daily tasks efficiently is crucial for productivity. Many users struggle with organizing their tasks, prioritizing work, and keeping track of deadlines. Existing solutions are often cluttered or lack customization options. This project aims to provide a streamlined and intuitive interface for managing tasks effectively.

## Objectives
* Develop a task management system that allows users to create, update, delete, and view tasks.

* Implement filtering options to help users quickly find specific tasks.

* Provide a visually appealing and responsive user interface.

* Ensure seamless API integration with a MongoDB backend.

## Technology Stack

### Frontend: React + Vite, TailwindCSS

### Backend: Node.js, Express.js

### Database: MongoDB

### API Communication: RESTful API

### Hosting: Vercel (Frontend), Render/Atlas (Backend & Database)

## Features Implemented

### Task Dashboard

#### - A visually organized dashboard displaying key task statistics and lists.

### Task Management

#### - Users can perform the following actions on tasks:

#### - Create a task with a title, description, due date, priority level, category, and completion status.

#### - Read tasks from the database, displayed in a structured list.

#### - Update task details as needed.

#### - Delete tasks that are no longer needed.

### Filtering

#### - Users can filter tasks based on their category, making it easier to focus on specific types of tasks.

### Responsive Design

#### - Optimized UI for both desktop and mobile, ensuring usability across devices.

### Implementation Details

### Frontend

#### - React hooks (useState, useEffect, useContext) were used for state management.

#### - TailwindCSS was used for a clean and modern UI.

#### - API calls were handled using fetch or axios.

### Backend

#### - Express.js was used to create a RESTful API.
 
#### - MongoDB was used to store task data, with Mongoose for schema management.

#### - CRUD operations were implemented with proper validation and error handling.

### Challenges & Solutions

#### - State Management: Used React Context API to manage task data efficiently.

#### - Database Connection Issues: Optimized MongoDB queries and used environment variables for secure database connection.

#### - API Performance: Implemented pagination and indexing to improve response times.

## Conclusion

- The Task Manager App successfully provides an intuitive and efficient way to manage tasks. The combination of React, TailwindCSS, and MongoDB ensures a smooth user experience with a modern design. Future enhancements could include user authentication, notifications, and recurring tasks for better productivity management.
