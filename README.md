# 📚 mutualbook-design(DesignSurvey) – MutualBook Onboarding App

**mutualbook-design
** is the onboarding system for **MutualBook**, a purpose-driven networking platform connecting students and professionals based on shared goals and communities. This full-stack TypeScript project uses Supabase for data, Drizzle ORM for schema management, and Resend for secure, branded email delivery.

## 🚀 Tech Stack
- React 18 + TypeScript + Tailwind CSS
- Node.js + Express (API server)
- Supabase (PostgreSQL) + Drizzle ORM
- Resend (email service)
- Vite, tsx, dotenv, cross-env

## 🧪 Running Locally
```bash
git clone https://github.com/yourusername/DesignSurvey.git
cd DesignSurvey
npm install

# Create a .env file based on .env.example, then:
npm run db:push     # optional: sync schema to Supabase
npm run dev         # start the dev server
```

## 📁 Structure
- `client/` – React frontend (optional)
- `server/` – Express backend + email routes
- `shared/` – Drizzle schema & types
- `.env` – your secrets (not committed)

## ✅ Features
- Magic link email onboarding via Resend
- Drizzle-based typed PostgreSQL schema
- Supabase Auth & Database integration
- Modular Express API with typed routing

## 🔒 Notes
- Don't commit `.env`. Use `.env.example`.
- Emails are sent from `onboarding@my.mutualbook.com`
- Database hosted on Supabase with pooled connection

## ✍️ Author
Made with 💜 by [@jeeban101](https://github.com/jeeban101) – powered by MutualBook
