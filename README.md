# Coin Tracker

A real-time cryptocurrency coin tracker built with Express, Sequelize, MySQL, and EJS. Users can add coins, see live updates via Server-Sent Events (SSE), and enjoy rate limiting and daily limits per user.

## Features

- Add new coins with name and price (supports decimals)
- Real-time updates using Server-Sent Events (SSE)
- Beautified price display (doubles large numbers, rounds up small decimals)
- Rate limiting (5 requests/sec per IP)
- Daily limit: 50 coins per user (by IP)
- Backend and frontend validation for price
- Prevents invalid data from being stored

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/iamsahilshukla/coint-tracker.git
   cd coint-tracker/express
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure the database:**

   - Make sure you have MySQL running.
   - Edit `config/config.json` with your MySQL credentials.
   - The app will auto-create the database tables on first run.

4. **Build the project:**

   ```sh
   npm run build
   ```

5. **Start the server:**

   ```sh
   npm start
   ```

6. **Open in your browser:**
   - Visit [http://localhost:8000](http://localhost:8000)

## Usage

- Add a coin with a name and price (decimals supported)
- See the latest coins update in real time
- If you exceed 50 coins per day or 5 requests/sec, you'll get an error