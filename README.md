# project-group18
The project is for the course Web Development Advanced Concepts

# G8-Backend

This is the backend for the G8 project, built with Node.js and Express, and containerized with Docker. It includes a REST API, a WebSocket server, and a MySQL database.

## 📦 Prerequisites

### 1. Install Docker

Download and install Docker Desktop:
👉 https://www.docker.com/products/docker-desktop/

### 2. Create .env file

Inside the root G8-Backend/ directory, create a .env file with the following content:

    # MySQL
    MYSQL_ROOT_PASSWORD=*****
    MYSQL_DATABASE=lawnmower

    # Database connection for services
    DB_HOST=mysql
    DB_USER=root
    DB_PASSWORD=*****
    DB_NAME=lawnmower

## 🚀 Starting and Stopping the Project

### ✅ Initial Setup

#### 1. Navigate into the rest-api/ directory:

    cd ./rest-api/

#### 2. Install dependencies:

    npm install

## 🐳 Docker Commands

### ▶️ Start the Docker Containers in the development environment

From the root G8-Backend/ directory:

    docker-compose up --build

### ⏹️ Stop All Containers

    docker-compose down

To also remove volumes and reset the database (⚠️ destructive):

    docker-compose down -v

## 📂 Database

### 📁 Migrations & Seeds

This project uses Knex.js to manage database migrations and seed data.

Make sure the database is running via Docker before executing any of the following commands

#### 💡 Note: Make sure to run the following commands inside the rest-api folder:

    cd ./rest-api/

### 📦 Running Migrations

    npm run migrate

### 🧱 Rolling Back Migrations

    npm run rollback

### 🌱 Seeding the Database

    npm run seed

## ➕ Installing Additional Packages

To install a new package for the REST API:

    cd ./rest-api/
    npm install <package-name>

