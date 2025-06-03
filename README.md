# Project Management Dashboard

This is a **React + TypeScript** project using **Vite**, **RTK Query**, **Bootstrap**, and a **feature-based architecture**.

## 🔧 Features

- 🔐 Role-based access control (`admin`, `project_manager`, `team_member`)
- 📁 Feature-based folder structure for better scalability
- 🚀 RTK Query for data fetching and caching
- 🎯 Bootstrap UI with clean responsive design
- 📊 Conditional dashboards (analytics, team metrics, personal tasks)
- 🔍 Project filtering by team and assignment
- ✏️ Edit access control for Admin/PMs of specific teams

## 🗂️ Architecture (Feature-based)

```
src/
│
├── app/                # Store configuration
├── components/         # Shared reusable components
├── features/           # Main feature modules
│   ├── auth/           # Authentication & user state
│   ├── project/        # Project-related API, pages, components
│   └── dashboard/      # Role-based dashboard views
├── hooks/              # Custom reusable hooks (e.g. useRole)
├── layouts/            # App layout components
├── routes/             # Protected and role-based routes
└── types/              # Global TypeScript types
```

## 🚀 Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Run the development server

```
npm run dev
```

### 3. Build for production

```
npm run build
```

### 4. Preview production build

```
npm run preview
```

## 🔐 Roles & Access

| Role             | Access                                                                 |
|------------------|------------------------------------------------------------------------|
| `admin`          | All projects, analytics, edit access                                   |
| `project_manager`| Team-specific projects, performance metrics, edit access               |
| `team_member`    | Only assigned projects, personal task-focused dashboard                |

## 📌 Notes

- You must be logged in to access protected routes.
- Only admins and PMs can edit projects, and PMs can only edit their team's projects.
- Projects can be filtered by team if you're an admin.

---

MIT © 2025
