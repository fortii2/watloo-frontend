# Watloo Frontend

Watloo Frontend is a Telegram Mini App for viewing a University of Waterloo course schedule. It presents the next class, the rest of today's classes, and a grouped weekly schedule using data provided by the Watloo backend.

Open the app through the Telegram bot [@Watloo_bot](https://t.me/Watloo_bot).

## Backend

The corresponding backend project is available at [fortii2/watloo](https://github.com/fortii2/watloo).

## Features

- View today's courses in chronological order.
- See the current or next class with its remaining start or end time.
- Switch to a weekly schedule grouped by date.
- Display each course's time, location, and professor.
- Show loading and API error states.
- Run inside Telegram through the Telegram Apps SDK.

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Telegram Apps SDK
- Lucide React
- pnpm

## Prerequisites

For local development, install:

- Node.js supported by Vite 7
- [pnpm](https://pnpm.io/installation)
- The [Watloo backend](https://github.com/fortii2/watloo) if you want to use a local API

## Run Locally

Clone the repository and install its dependencies:

```bash
git clone https://github.com/fortii2/watloo-frontend.git
cd watloo-frontend
pnpm install
```

Start the backend on `http://localhost:8080`, then run the frontend development server:

```bash
pnpm dev
```

Vite prints the local frontend URL when the server starts. During development, requests to `/api` are proxied to `http://localhost:8080`.

The Telegram SDK may log a warning when the app is opened in a regular browser instead of Telegram. The schedule UI can still be used for local development.

## Configuration

The optional `VITE_API_BASE_URL` variable sets the backend's base URL. It must be a complete URL, including the protocol.

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Sends API requests to a specific backend instead of the current origin. |

For a remote backend, copy the example configuration and adjust the URL if necessary:

```bash
cp .env.example .env.local
```

```dotenv
VITE_API_BASE_URL=https://api.example.com
```

Restart the Vite development server after changing environment variables. Leave this variable unset when using the local Vite proxy.

## Course Schedule API

The frontend requests `GET /api/courses` with the following inputs:

| Input | Description |
| --- | --- |
| `view` query parameter | `day` for the Today view or `week` for the Week view. |
| `X-Telegram-User-Id` header | Identifies the Telegram user whose schedule should be returned. |

The expected response has this shape:

```json
{
  "view": "week",
  "timezone": "America/Toronto",
  "courses": [
    {
      "id": "c_1",
      "name": "ECE 650",
      "location": "E7 3343",
      "professor": "Example Professor",
      "dayOfWeek": 1,
      "date": "2026-09-14",
      "beginTime": "10:00",
      "endTime": "11:20"
    }
  ]
}
```

The current frontend uses a fixed Telegram user ID in `src/App.tsx` for development. That user must already exist in the backend database. Replace this value when testing another user's schedule; it is not a secure authentication mechanism.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `pnpm build` | Type-check the project and create a production build. |
| `pnpm lint` | Run ESLint across the project. |
| `pnpm preview` | Preview the production build locally. |

Before opening a pull request, run:

```bash
pnpm lint
pnpm build
```

## Project Structure

```text
src/
├── components/    Course cards, schedule views, navigation, and header UI
├── lib/           API URL construction and error handling
├── types/         Shared course data types
├── App.tsx        Schedule fetching and top-level application state
├── index.css      Tailwind CSS entry point
└── main.tsx       React and Telegram SDK initialization
```
