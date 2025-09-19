# 🚀 Mini Dashboard – Zettabyte Technology Inc. (Frontend Developer Test)

This project is a **mini dashboard** built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.  
It was created as part of the **Frontend Developer Test** for **Zettabyte Technology Inc.**.

The goal of this test is to evaluate **UI/UX**, **component reusability**, **state management**, and **animations** — not algorithms.

---

## ✨ Features

- 🏠 **Dashboard Home (`/`)** – Static summary section with animated UI elements
- 📝 **Posts (`/posts`)** – Fetch posts from API, display in reusable **Card components**
  - Dynamic routes `/posts/[id]` for single post details
- 👥 **Users (`/users`)** – Fetch and display users in a responsive **table**
  - On row click → Animated **modal** with user details
- 🔄 **Custom Hook (`useFetch`)** – For API calls with loading + error handling
- 🎨 **Framer Motion Animations**:
  - Animated sidebar
  - Staggered card animations
  - Modal scale + fade transitions
- ⚡ **Error Handling & Demo** – Simulates failed requests with a clear UI error message
- 💾 **Reusable components** – Card, Modal, Table, etc.
- 🌐 **Deployment** – Live demo hosted on **Vercel**

---

## 🛠 Tech Stack

- ⚛️ **Next.js 15 (App Router)**
- 🔷 **TypeScript**
- 🎨 **Tailwind CSS**
- 🎬 **Framer Motion**
- 🧰 **React Hooks (custom `useFetch`)**
- ✅ **Error & Loading states**

---

## 📂 Project Structure

src/
├── app/
│ ├── page.tsx # Dashboard Home
│ ├── posts/
│ │ ├── page.tsx # Posts List
│ │ └── [id]/page.tsx # Post Details
│ ├── users/page.tsx # Users Table + Modal
│
├── components/
│ ├── Card.tsx
│ ├── Modal.tsx
│ ├── Table.tsx
│ └── Layout.tsx
│
├── hooks/
│ └── useFetch.ts # Custom API fetching hook
│
└── styles/
└── globals.css

yaml
Copy code

---

## ⚡ Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/task-dashboard.git
cd task-dashboard
2️⃣ Install dependencies
bash

npm install
# or
yarn install
3️⃣ Run locally

npm run dev
Then visit 👉 http://localhost:3000

🌍 Deployment
This project is deployed on Vercel.
🔗 Live Demo:

🧪 Test Requirements Covered
✔️ Dashboard Home with static + animated content
✔️ Posts page with API fetch + reusable Card component
✔️ Dynamic routes for post details
✔️ Users page with responsive table + animated modal
✔️ Custom useFetch hook for API calls
✔️ Error handling with demo error state
✔️ Clean code, reusable components, Tailwind styling
✔️ Framer Motion animations for Sidebar, Modal, Cards
✔️ Deployed on Vercel with GitHub repo

🔑 Bonus (Optional)
🔐 Also Added Protected Routes
🔐 Basic NextAuth.js (Google login) can be added for a protected /profile page (not required, but supported).

---

⚡ This `README.md` is recruiter-friendly:
- ✅ Clear project explanation
- ✅ Tech stack listed
- ✅ Setup + deploy guide
- ✅ Shows requirements coverage
- ✅ Clean markdown formatting with emojis

Do you also want me to **write a short section on “Intentional Error Handling Demo”** (like how to simulate an error) so they see you followed that requirement too?
```
