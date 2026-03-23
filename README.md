<<<<<<< HEAD
# opica
=======
# ArchServices — React + Vite + TypeScript + Tailwind CSS

A full multi-page architectural services platform UI.

## 📁 Project Structure

```
src/
├── components/         # Shared reusable components
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── GoogleButton.tsx
│   ├── Input.tsx
│   └── Navbar.tsx
├── data/
│   └── fakeData.ts     # All fake/mock data
├── pages/              # One file per page
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── CompleteProfilePage.tsx
│   ├── UnderReviewPage.tsx
│   ├── HomePage.tsx
│   ├── ProfilePage.tsx
│   └── DashboardPage.tsx
├── types/
│   └── index.ts        # Shared TypeScript types
├── App.tsx             # Root with simple page router
├── main.tsx
└── index.css
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **TypeScript** — Type safety
- **Tailwind CSS 3** — Utility-first styling

## 📄 Pages

| Page | Route/Key | Description |
|------|-----------|-------------|
| Login | `login` | Sign in with email/password or Google |
| Sign Up | `signup` | Create new account with role selection |
| Complete Profile | `complete-profile` | Upload avatar, set goals |
| Under Review | `under-review` | Account pending approval screen |
| Home | `home` | Dashboard with stats, projects, profile |
| Profile | `profile` | User profile with credentials & security |
| Admin Dashboard | `dashboard` | Admin view with table, KPIs, sidebar |

> Navigation between pages is managed via a simple `useState` router in `App.tsx`.
> A dev navigation bar at the top lets you jump between pages instantly.
>>>>>>> 6006744 (the project first structure)
