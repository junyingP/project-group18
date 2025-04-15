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
    ```env
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
1. Navigate into the rest-api/ directory:
    ```bash
    cd ./rest-api/
2. Install dependencies:
    ```bash
    npm install

## 🐳 Docker Commands

### ▶️ Start the Docker Containers in the development environment

From the root G8-Backend/ directory:

    docker-compose up --build

### ⏹️ Stop All Containers

    docker-compose down

To also remove volumes and reset the database (⚠️ destructive):

    docker-compose down -v

## ➕ Installing Additional Packages

To install a new package for the REST API:

    cd ./rest-api/
    npm install <package-name>

