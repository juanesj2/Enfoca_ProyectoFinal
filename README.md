<p align="center">
  <a href="https://enfoca.alwaysdata.net/" target="_blank">
    <img src="https://raw.githubusercontent.com/juanesj2/proyectoJorge-Laravel/refs/heads/main/public/imagenes/logo_ENFOKA-sin-fondo.ico" width="200" alt="Enfoca logo">
  </a>
</p>

## Sobre el Proyecto

**Enfoca** es una aplicación web que permite a fotógrafos compartir sus trabajos con una comunidad especializada. El objetivo principal es fomentar el aprendizaje, la inspiración y el intercambio, en un entorno amigable y colaborativo. A nivel personal, este proyecto representa un espacio para mi crecimiento como desarrollador.

### Características principales

- 📷 Subir fotografías y compartir tu trabajo.
- ❤️‍🔥 Dar y quitar "likes" a otras publicaciones.
- 💬 Comentar en las fotos de otros y recibir retroalimentación.
- 🎨 **Frontend moderno e interactivo** desarrollado en **React** con **Inertia.js**.
- 🖥️ Interfaz única, atractiva y muy rápida (Single Page Application).
- 🛠️ Back-end sólido y escalable apoyado en Laravel.

## Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

```bash
git clone https://github.com/tuusuario/tuproject.git
cd tuproject
cp .env.example .env
# Luego edita el archivo .env con tus propias variables (DB, MAIL, etc.)
composer install
npm install
php artisan key:generate
php artisan migrate

# Necesitarás dos terminales para correr el entorno de desarrollo:
# Terminal 1 (Backend - Laravel):
php artisan serve

# Terminal 2 (Frontend - React/Vite):
npm run dev
```
