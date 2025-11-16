claude.ai README.md# DevOps Multi-Container Application

## 🏗️ Architecture Overview

This project demonstrates production-grade DevOps practices using Docker containerization.

### System Architecture
┌─────────────────────────────────────────────────────────┐
│                     Host Machine                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Docker Engine (host80)                  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Custom Bridge Network               │  │  │
│  │  │         (devops-network)                    │  │  │
│  │  │                                             │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │  │
│  │  │  │  Nginx   │  │  Node.js │  │PostgreSQL│  │  │  │
│  │  │  │  :80     │→ │  :3000   │→ │  :5432   │  │  │  │
│  │  │  └──────────┘  └──────────┘  └──────────┘  │  │  │
│  │  │       │             │              │        │  │  │
│  │  │       │             │              │        │  │  │
│  │  │  Bind Mount    No Volume    Named Volume   │  │  │
│  │  │  (config)                   (persistence)   │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
## 🎯 DevOps Concepts Implemented

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

Node.js + PostgreSQL + Nginx (Dockerized App)

This project demonstrates a simple full-stack application where a Node.js server connects to a PostgreSQL database and displays the connection status in a UI. Everything runs using Docker Compose with separate services for Node.js, PostgreSQL, and Nginx.

📁 Files & Their Purpose
1. server.js

Main Node.js backend file.

Loads environment variables using dotenv.

Creates PostgreSQL connection using pg (Pool).

Exposes /api/health endpoint to test DB connection.

Serves static frontend files from /public.

2. public/

Frontend UI folder.

index.html → UI page.

style.css → Styling & animation (spinner, success/error colors).

app.js → Calls API /api/health every 10 sec and updates UI.

3. .env

Stores environment variables:

DB_HOST=db
DB_PORT=5432
DB_NAME=
DB_USER=
DB_PASSWORD=

4. docker-compose.yml

Defines 3 services:

app → Node.js container

db → PostgreSQL 15 container

nginx → Reverse proxy for app

Also creates shared network and Postgres volume.

5. Dockerfile

Multi-stage build (builder → runtime).

Installs dependencies, copies files, and runs Node.js app.

6. nginx.conf

Proxies requests from port 80 to Node app on port 3000.

🔗 How the Connection Works (Simple Explanation)

User visits the browser → http://localhost

Nginx receives the request on port 80.

Nginx forwards the request internally to:
→ app:3000 (Node.js container)

Node.js receives the request:

For static files, it serves /public/index.html

For /api/health, it connects to PostgreSQL

PostgreSQL (db container) runs separately and the Node app connects using:

host: db
port: 5432
user: DB_USER
password: DB_PASSWORD
database: DB_NAME


Node.js tries to run SELECT NOW():

If success → Sends success JSON

If fail → Sends error JSON

Frontend (app.js) receives the response every 10 seconds and updates the UI:

Green for success

Red for failure

🔀 Project Flow (Step-By-Step)
1️⃣ User opens website

→ Browser hits Nginx (port 80)

2️⃣ Nginx acts as reverse proxy

→ Sends request to Node.js app (port 3000)

3️⃣ Node.js receives /api/health

→ Reads .env to get DB credentials
→ Connects to PostgreSQL

4️⃣ PostgreSQL responds

→ Node.js returns JSON status

5️⃣ Frontend updates UI

→ Shows success/error with timestamp
→ Repeats check every 10 seconds

🚀 Run the Project
Start services
docker compose up --build

Access app
http://localhost

✔️ Health Check API

GET /api/health
Returns:

status (success/error)

message

database timestamp

error (if failed)
