# 🏥 Eldeka Health – Frontend

This is the frontend web application for **Eldeka Health**, a Libyan healthcare company inspired by [Emitac Healthcare](https://emitachealthcare.com). The website includes a dynamic equipment catalog, blog section, and a clean, responsive UI for showcasing medical devices and consumables.

---

## 🔧 Tech Stack

- ⚛️ **React.js** (via Vite)
- 🎨 **Tailwind CSS** (utility-first styling)
- 🔄 **API Ready** (Spring Boot or Supabase)
- 📦 **Axios** (or Supabase client)

---

## 📁 Project Structure

src/ ├── assets/ # Images and logos ├── components/ # Reusable UI components (Navbar, Footer, Cards, etc.) ├── pages/ # Page-level components (Home, Blog, Catalog, etc.) ├── services/ # API clients and utilities ├── styles/ # Custom/global CSS if needed ├── App.jsx # Main application component └── main.jsx # Entry point for the app

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/agreigra/eldakahealth-frontend.git
cd eldakahealth-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
Visit: http://localhost:8080

```

## 🔌 Backend Integration

This frontend is designed to connect with your backend services:

🧠 Spring Boot API: Custom backend managing users, blog posts, and medical equipment.

Update your API base URL in src/services/api.js:

export const API_BASE_URL = 'http://localhost:8080/api'; // or your production backend
🌟 Features

- 🏥 Equipment & Consumables Catalog

- 📝 Blog with Admin/Editor Controls

- 🔐 Authentication (JWT or Supabase)

- 📱 Mobile-Responsive Design

- 🧭 SEO-Friendly & Fast Performance

- 🧰 Easily Extendable Component System

## 🧪 Building for Production

To build an optimized version:

npm run build

To preview locally:

npm run preview
Then deploy the /dist folder to your preferred hosting platform.

🚀 Deployment Options
Vercel

Netlify

Firebase Hosting

GitHub Pages (requires setup)

📄 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute.

🙌 Credits
Built with ❤️ by the EldekaHealth team.

Inspired by Emitac Healthcare Solutions

---

```

```
