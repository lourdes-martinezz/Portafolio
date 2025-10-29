# CodeExpress - Portafolio Fullstack (React + Node + MySQL)

Proyecto scaffold listo para desarrollo local y despliegue.

## Estructura
- backend/: Node + Express API
- frontend/: Vite + React + Tailwind frontend
- sql/db.sql: esquema y datos demo

## Instrucciones rápidas (dev)
1. Crear DB: `mysql -u root -p < sql/db.sql` (reemplaza el password bcrypt en admins).
2. Backend: `cd backend && npm i && cp .env.example .env && edit .env` && `npm run dev`
3. Frontend: `cd frontend && npm i && npm run dev`

API base por defecto: http://localhost:4000/api

