# Portofolio - CodeExpress Fullstack (React + Node + MySQL)
Proyecto scaffold listo para desarrollo local y despliegue.

## Estructura
* backend/: Node + Express API
* frontend/: Vite + React + Tailwind frontend
* sql/db.sql: esquema y datos demo

## Instrucciones rápidas (dev)
1. Crear DB:
```powershell
mysql -u root -p < sql/db.sql
```
> Reemplaza el password bcrypt en admins si querés cambiar la contraseña del admin.

2. Backend:
```powershell
cd Portofolio\backend
npm install
copy .env.example .env
# editar .env con tus credenciales
npm run dev
```

3. Frontend:
```powershell
cd ..\frontend
npm install
npm run dev
```

API base por defecto: [http://localhost:4000/api](http://localhost:4000/api)
