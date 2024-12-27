# School App - Dockerized Microservices Architecture

Welcome to the **School App Repository**! This project demonstrates a microservices-based app designed to manage student data and calculate class fees. Using Docker Compose, we showcase how services communicate and persist data effectively.

---

## Architecture Overview

The app consists of two microservices:

1. **Accounts Microservice (accounts-ms):**
   - Provides monetary insights.
   - Combines data from other services and calculates total class fees.

2. **Students Microservice (students-ms):**
   - Handles CRUD operations for student data.

### Data Persistence
A shared Docker volume (`school-app-data`) ensures data persistence across containers. It stores two JSON files:

- **fees.json:** Contains class-wise fee structures.
- **students.json:** Contains student details like name, ID, and class.

---

## Workflow

1. Users request fee collection details for a specific class from **accounts-ms**.
2. **accounts-ms:**
   - Fetches student details from **students-ms**.
   - Reads the class fee from `fees.json`.
   - Combines the data and calculates the total fee.
3. **students-ms** handles read and write operations for `students.json`.

![Application archtiture](https://github.com/dev-danish-javed/docker-demo-app/blob/main/app%20architecture.png?raw=true)

---

## Docker Compose Configuration

### Services

#### **Accounts Microservice**
- **Image:** `accounts-ms:v1`
- **Ports:** `8080:8080`
- **Environment Variable:** `STUDENTS_MS_URL=http://students-ms:8181`
- **Volume:** `school-app-data:/app/data/accounts-ms`
- **Network:** `school-app-network`

#### **Students Microservice**
- **Image:** `students-ms:v1`
- **Ports:** `8181:8181`
- **Volume:** `school-app-data:/app/data/students-ms`
- **Network:** `school-app-network`

### Volumes
- `school-app-data`: A shared volume for persisting data.

### Networks
- `school-app-network`: A bridge network connecting both microservices.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Docker
- Docker Compose

### Steps to Run the App

1. Clone the repo:
   ```bash
   git clone [https://github.com/your-repo-url.git](https://github.com/dev-danish-javed/docker-demo-app/)
   ```
2. Navigate to the project directory:
   ```bash
   cd docker-demo-app
   ```
3. Build and start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Verify the services are running:
   - **Accounts-MS**: [http://localhost:8080](http://localhost:8080)
   - **Students-MS**: [http://localhost:8181](http://localhost:8181)
5. Interact with the app using API endpoints or a UI client like Postman.
6. **Find the postman collection attached**
