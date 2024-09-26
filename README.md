# Secure Authentication System

## Project Overview

This project is a robust secure authentication system built with Next.js. It features user registration, login functionality, and multi-factor authentication to ensure the highest level of security for user accounts.

## Features

- User registration with secure password hashing
- User login with JWT (JSON Web Token) authentication
- Multi-factor authentication (MFA) for enhanced security
- Responsive and user-friendly interface
- Server-side rendering with Next.js for improved performance and SEO

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated applications
- **React**: A JavaScript library for building user interfaces
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine
- **PostgreSQL**: An open-source relational database
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **bcrypt**: A library to help hash passwords
- **jsonwebtoken**: An implementation of JSON Web Tokens
- **speakeasy**: A library for two-factor authentication
- **qrcode**: A QR code generator

## Development Environment

- **Operating System**: Windows
- **Code Editor**: [Your preferred code editor, e.g., Visual Studio Code]
- **Version Control**: Git
- **Package Manager**: npm

## Project Structure

- **src/components**: Contains reusable UI components
- **src/pages**: Contains Next.js pages
- **src/utils**: Contains utility functions
- **src/styles**: Contains global styles
- **src/types**: Contains TypeScript types
- **src/lib**: Contains library code
- **src/hooks**: Contains custom hooks


## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your PostgreSQL database
4. Create a `.env` file and add your database URL and JWT secret:

```
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
```

5. Start the development server: `npm run dev`

