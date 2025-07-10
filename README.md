# Coin Tracker

A real-time cryptocurrency coin tracker built with Express, Sequelize, MySql, and EJS. Users can add coins, see live updates via Server-Sent Events (SSE), and enjoy rate limiting and daily limits per user.

## Features

- Add new coins with name and price (supports decimals)
- Real-time updates using Server-Sent Events (SSE)
- Beautified price display (doubles large numbers, rounds up small decimals)
- Rate limiting (5 requests/sec per IP)
- Daily limit: 50 coins per user (by IP)
- Backend and frontend validation for price
- Prevents invalid data from being stored

## Installation & Deployment (SQl)

### 2. Clone the repository

```sh
git clone https://github.com/iamsahilshukla/coint-tracker.git
cd coint-tracker/express
```

### 3. Install dependencies

```sh
npm install
```

### 4. Install MySql driver

```sh
npm install mysql2
```

### 5. Configure environment variables

Create a `.env` file or set these in the codebase:

```
DB_HOST=your-pg-host
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASS=your-db-password
DB_DIALECT=mysql
DB_PORT=5432
```

### 6. Build the project

```sh
npm run build
```

### 7. Start the server

```sh
npm start
```

### 8. Open in your browser

- Visit [http://localhost:8000](http://localhost:8000) (locally)

### 9. Hosted Url:- [https://coint-tracker.onrender.com/](https://coint-tracker.onrender.com/) (/web)

## Usage

- Add a coin with a name and price (decimals supported)
- See the latest coins update in real time
- If you exceed 50 coins per day or 5 requests/sec, you'll get an error

## Environment Variables

- `DB_HOST`
- `DB_NAME`
- `DB_USER`
- `DB_PASS`
- `DB_DIALECT` (set to `mysql`)
- `DB_PORT` (default: 5432)
