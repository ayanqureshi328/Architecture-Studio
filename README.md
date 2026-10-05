# FORMA Architecture Studio

A single-page portfolio for FORMA, with a horizontally browsable project gallery and a MongoDB-backed inquiry form.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to a local or hosted MongoDB connection string.
3. Start the frontend and API with `npm run dev`.
4. Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

The API listens on port 4000. Without `MONGODB_URI`, the portfolio still loads, but inquiry submissions return an unavailable message. `GET /api/health` reports the database connection state.
