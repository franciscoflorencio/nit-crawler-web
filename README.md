# Núcleo de Inovação Tecnológica de Farmanguinhos (NIT-Far) Website

## Overview

The **Núcleo de Inovação Tecnológica de Farmanguinhos (NIT-Far)** website is a platform designed to showcase the innovation and technological advancements of Farmanguinhos, a department of Fiocruz dedicated to healthcare innovation and intellectual property management. The website provides information about the organization, its projects, articles, partners, and more.

This project uses modern web development technologies, including **React**, **Styled Components**, **Framer Motion**, and **Django**, to create a responsive, dynamic, and visually appealing user experience. The project is fully dockerized using Docker Compose with **PostgreSQL** for the backend database.

---

## Features

### Frontend (React)

1. **Homepage**

   - A welcoming section with animations using `framer-motion`.
   - Information about Farmanguinhos and its mission.
   - A horizontal carousel showcasing partner logos or images.

2. **Dynamic Pages**

   - **About Us**: Provides detailed information about the NIT-Far and its goals.
   - **Articles**: Displays a list of articles dynamically fetched from the backend.
   - **Projects**: Displays a list of ongoing or completed projects, also fetched from the backend.

3. **Responsive Design**

   - The website is fully responsive and adapts to different screen sizes (desktop, tablet, mobile).

4. **Admin Panel**

   - Administrators can add, edit, or delete articles and projects via the Django Admin interface without modifying the frontend code.

5. **Styling**
   - Styled using **Styled Components** for modular and reusable styles.
   - Consistent theming with colors, typography, and spacing inspired by Figma designs.

---

### Backend (Django)

1. **API Endpoints**

   - `/api/articles/`: Fetches a list of articles.
   - `/api/projects/`: Fetches a list of projects.

2. **Models**

   - **Article**: Contains fields like title, content, image URL, and creation date.
   - **Project**: Contains fields like title, description, image URL, and creation date.

3. **Admin Interface**

   - Built-in Django Admin allows easy management of articles and projects.

4. **Database**
   - Uses SQLite in bare local runs and **PostgreSQL** when running with Docker Compose.

---

## Setup Instructions

### Run with Docker (recommended)

This repository ships with a Docker Compose stack that starts PostgreSQL, the Django backend and the React frontend.

1. Requirements
   - Docker Engine and Docker Compose v2
   - Your user added to the `docker` group (optional):
     ```zsh
     getent group docker || sudo groupadd docker
     sudo usermod -aG docker "$USER"
     newgrp docker
     systemctl is-active docker || sudo systemctl start docker
     ```

2. Start the stack
   ```zsh
   cd /home/vitor/Projects/fiocruz/nit-crawler-web
   docker compose up -d --build
   ```

3. Create a Django superuser (optional)
   ```zsh
   docker compose exec backend python manage.py createsuperuser
   ```

4. Access
   - Frontend (Vite dev server): http://localhost:5173
   - Backend API root: http://localhost:8000/api/
   - Django Admin: http://localhost:8000/admin/

5. Configuration via environment
   - Backend reads configuration from environment variables. In Docker Compose, these are set for you. You can override them in `backend/.env`.
     - `DEBUG` (default True)
     - `SECRET_KEY`
     - `ALLOWED_HOSTS` (comma-separated)
     - `DB_ENGINE=django.db.backends.postgresql` (Compose sets this when using Postgres)
     - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (Compose provides defaults)
     - `CORS_ALLOWED_ORIGINS` (comma-separated; Compose sets `http://localhost:5173`)
   - Frontend reads `VITE_API_BASE_URL` (Compose sets `http://localhost:8000/api`).

6. What happens on container start
   - The backend entrypoint waits for PostgreSQL to be ready, runs `makemigrations` and `migrate`, then starts the dev server on `0.0.0.0:8000`.

### Manual setup (without Docker)

- Node.js (v16+)
- Python (v3.8+)
- npm or yarn
- PostgreSQL or SQLite

### Frontend Setup (manual)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the frontend at `http://localhost:5173`.

### Backend Setup (manual)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Create a superuser for the admin panel:
   ```bash
   python manage.py createsuperuser
   ```
6. Start the development server:
   ```bash
   python manage.py runserver
   ```
7. Access the backend API at `http://localhost:8000/api/` and the admin panel at `http://localhost:8000/admin/`.

8. Optional: configure Postgres manually
    - Set the following environment variables before running the server:
       ```zsh
       export DB_ENGINE=django.db.backends.postgresql
       export DB_HOST=localhost
       export DB_PORT=5432
       export DB_NAME=nit_db
       export DB_USER=nit_user
       export DB_PASSWORD=nit_pass
       ```

### Connecting Frontend and Backend

- The frontend uses `VITE_API_BASE_URL` to reach the backend. In Docker Compose this is already set to `http://localhost:8000/api`.
- If running manually, you can set it when starting Vite:
   ```zsh
   VITE_API_BASE_URL=http://localhost:8000/api npm run dev
   ```

---

## Troubleshooting

- Permission denied to Docker daemon (Linux): ensure your user is in the `docker` group and the service is running:
   ```zsh
   getent group docker || sudo groupadd docker
   sudo usermod -aG docker "$USER"
   newgrp docker
   systemctl is-active docker || sudo systemctl start docker
   ```
- Container backend fails to start before DB: the entrypoint already waits for Postgres, but check `docker compose logs backend` for details.
- CORS issues: set `CORS_ALLOWED_ORIGINS` in backend env or adjust Compose.
- Celery/Redis: settings currently point to `redis://localhost:6379/0`. If you plan to run Celery in containers, add a `redis` service to Compose and change URLs to `redis://redis:6379/0`.

---

## Deployment

1. **Frontend**

   - Build the React app:
     ```bash
     npm run build
     ```
   - Deploy the `dist` folder to a static hosting service (e.g., Netlify, Vercel, or AWS S3).

2. **Backend**

   - Use a production-ready database like PostgreSQL or MySQL.
   - Deploy the Django app to a cloud platform (e.g., Heroku, AWS Elastic Beanstalk, or DigitalOcean).

3. **Environment Variables**
   - Store sensitive information (e.g., API keys, database credentials) in `.env` files or environment variables.

---

## Additional Notes

- **Animations**: The homepage and other sections use `framer-motion` for smooth animations.
- **Responsive Design**: The website is optimized for mobile, tablet, and desktop screens.
- **Accessibility**: Semantic HTML and ARIA attributes are used where applicable to ensure accessibility.
- **Future Enhancements**:
  - Add user authentication for restricted content.
  - Implement search functionality for articles and projects.
  - Integrate a CMS for easier content management.

---

## Technologies Used

- **Frontend**:
  - React (TypeScript)
  - Styled Components
  - Framer Motion
  - Axios (for API calls)
  - Vite (build tool)
- **Backend**:
  - Django
  - Django REST Framework
   - SQLite (manual) / PostgreSQL (Docker Compose)
- **Deployment**:
  - Netlify/Vercel (frontend)
  - Heroku/AWS/DigitalOcean (backend)

---

## Credits

- Designed and developed by [Francisco Florencio and Vitor Guerra].
- Oriented and coordinated by [Jorge Lima de Magalhães and Henrique Koch Chaves].
- Inspired by Figma design guidelines.
