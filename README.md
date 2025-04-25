# Núcleo de Inovação Tecnológica de Farmanguinhos (NIT-Far) Website

## Overview

The **Núcleo de Inovação Tecnológica de Farmanguinhos (NIT-Far)** website is a platform designed to showcase the innovation and technological advancements of Farmanguinhos, a department of Fiocruz dedicated to healthcare innovation and intellectual property management. The website provides information about the organization, its projects, articles, partners, and more.

This project uses modern web development technologies, including **React**, **Styled Components**, **Framer Motion**, and **Django**, to create a responsive, dynamic, and visually appealing user experience.

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
   - Uses SQLite by default but can be configured to use PostgreSQL or MySQL for production.

---

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- npm or yarn
- PostgreSQL or SQLite (optional for production)

### Frontend Setup

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

### Backend Setup

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

### Connecting Frontend and Backend

- Update the `BASE_URL` in `frontend/src/utils/api.ts` to point to your backend server (e.g., `http://localhost:8000/api`).

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
  - SQLite (default) / PostgreSQL (optional)
- **Deployment**:
  - Netlify/Vercel (frontend)
  - Heroku/AWS/DigitalOcean (backend)

---

## Credits

- Designed and developed by [Francisco Florencio and Vitor Guerra].
- Oriented and coordinated by [Jorge Lima de Magalhães and Henrique Koch Chaves].
- Inspired by Figma design guidelines.
