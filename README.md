# Task Dashboard

[Live Demo](https://dashboard-app-dun-seven.vercel.app/)

A modern **mini dashboard** built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, featuring reusable components, API integration, animations, and optional authentication using **NextAuth.js**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Animations](#animations)
- [Error Handling & Loading](#error-handling--loading)
- [Setup & Installation](#setup--installation)
- [Scripts](#scripts)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Overview

This dashboard demonstrates a **clean UI-focused frontend project**:

- Fetches and displays data from **JSONPlaceholder API**.
- Supports **posts**, **users**, **todos**, and **comments**.
- Fully responsive and animated using **Framer Motion**.
- Implements reusable **Card** and **Chart** components.
- Optional **protected routes** for authenticated pages via **NextAuth.js**.

---

## Features

- Dashboard overview with stats cards.
- Reusable **Card** components.
- Dynamic routes for posts: `/posts` and `/posts/[id]`.
- Users page with **responsive table** and animated modal.
- API fetching using custom hooks (`useFetch`, `useInfiniteFetch`).
- **Loading spinners** and error messages for API calls.
- **Protected routes** for dashboard pages (optional).
- Smooth **animations** with Framer Motion.
- Fully responsive design using **Tailwind CSS**.

---

## Tech Stack

- **Frontend Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Tailwind Animations
- **Animations:** Framer Motion
- **Authentication (Optional):** NextAuth.js
- **Icons:** Lucide React, React Icons
- **Charts:** Recharts
- **Database (if using Auth):** MongoDB with Mongoose
- **Utilities:** Styled-components, SweetAlert2, Tailwind Merge

---

## Project Structure

```
src/
├── app/
│   ├── api/auth/        # Authentication APIs (SignIn, SignUp, NextAuth)
│   ├── dashboard/       # Dashboard pages, components, charts
│   ├── hook/            # Custom hooks (useFetch, useInfiniteFetch)
│   ├── Routes/          # PrivateRoute component
│   ├── lib/             # Database connection utilities
│   └── modal/           # Mongoose models
├── utils/               # Utility functions
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## Pages & Routes

| Route            | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `/`              | Dashboard home: stats, charts, reload button            |
| `/dashboard/...` | Protected dashboard routes (optional)                   |
| `/posts`         | List of posts fetched from JSONPlaceholder API          |
| `/posts/[id]`    | Dynamic route to view single post details               |
| `/users`         | Users page: table with modal for details                |
| `/setting`       | User Profile Setting page: table with modal for details |
| `/login`         | Login page (if using auth)                              |

---

## Animations

- **Dashboard Header & Cards:** Fade-in and staggered animations
- **Modal Animations:** Scale + opacity transitions
- **Loading Spinner:** Infinite rotation with Framer Motion
- **Buttons & Actions:** Hover and tap animations

---

## Error Handling & Loading

- Shows **LoadingSpinner** while fetching data
- Displays **clear error messages** for failed API requests
- Simulated error handling implemented for testing robustness

---

## Setup & Installation

1. Clone the repository:

```bash
git clone <your-repo-link>
cd task-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Add environment variables:

```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongo_db_connection_string
NEXTAUTH_SECRET=your_secret
```

4. Run the development server:

```bash
npm run dev
```

5. Build for production (skip lint errors):

```bash
npm run build
npm start
```

---

## Scripts

| Script          | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start dev server with Turbopack               |
| `npm run build` | Build production (skip lint with `--no-lint`) |
| `npm start`     | Start production server                       |
| `npm run lint`  | Run ESLint                                    |

---

## Deployment

- **Deployed on Vercel:** [Live Dashboard](https://dashboard-app-dun-seven.vercel.app/)
- **CI/CD:** Push to GitHub → Automatic Vercel deployment
- **Note:** Protected routes require authentication to view full dashboard

---

## Future Improvements

- Complete authentication for all dashboard pages
- Add more charts and analytics
- Implement fully dynamic modals for posts and users
- Enhance error handling and unit tests
- Add pagination for posts and users

---

## Author

**Jahid Hossen**

- Frontend Developer | Passionate about clean UI & reusable components
- GitHub: \[your-github-profile]
- LinkedIn: \[your-linkedin-profile]

---

> 🚀 Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer
