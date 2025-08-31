# Book Club App

A minimal full‑stack app for managing authors and books.

## Stack
- Postgres (Docker)
- Backend: Fastify + TypeScript + Prisma
- Frontend: React (Vite) + Tailwind + React Query + RHF + Zod

## Prereqs
- Node 18+
- Docker Desktop

## 1) Start Postgres
```bash
docker compose up -d
```

## 2) Backend
```bash
cd backend
cp .env.example .env
npm i
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
# Server on http://localhost:4000
```

## 3) Frontend
```bash
cd ../frontend
npm i
npm run dev
# App on http://localhost:5173
```

Create `.env` (optional):
```
VITE_API_URL=http://localhost:4000
```
