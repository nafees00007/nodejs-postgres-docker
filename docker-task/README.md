# PostgreSQL Connection App

A simple Node.js application that connects to a PostgreSQL database and displays the connection status in a web UI.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (running locally or remotely)
- npm or yarn package manager

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Configure database connection:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` file with your PostgreSQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=3000
   ```

## Running the Application

### Development Mode

Start the server:
```bash
npm start
```

Or:
```bash
npm run dev
```

The application will start on `http://localhost:3000` (or the port specified in your `.env` file).

Open your browser and navigate to `http://localhost:3000` to see the connection status.

## Building the Application

This application doesn't require a build step as it's a simple Node.js server application. However, if you want to prepare for production:

1. Ensure all dependencies are installed:
```bash
npm install
```

2. The application is ready to run. For production deployment, you may want to:
   - Use a process manager like PM2
   - Set up proper environment variables
   - Configure reverse proxy (nginx, etc.)

## Project Structure

```
docker-task/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore file
├── README.md          # This file
└── public/            # Static files
    ├── index.html     # Main UI page
    ├── style.css      # Styles
    └── app.js         # Client-side JavaScript
```

## API Endpoint

- `GET /api/health` - Checks database connection and returns status

## Troubleshooting

- **Connection failed**: Verify your PostgreSQL credentials in `.env` file
- **Port already in use**: Change the `PORT` value in `.env` file
- **Database not found**: Ensure PostgreSQL is running and the database exists
- **Permission denied**: Check database user permissions

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `postgres` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `PORT` | Server port | `3000` |

