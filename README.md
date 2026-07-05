# Payment Reconciliation Dashboard (GeoSafety)

A modern, high-performance web dashboard built to automate the reconciliation of bank transactions against service contracts. The application ingests bank data (from Bank of Georgia API) and matches it against expected monthly company payments.

## 🚀 Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State & Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/v5)
- **Validation:** [Zod](https://zod.dev/)
- **Backend & DB:** [Supabase](https://supabase.com/) (PostgreSQL)

## 📦 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Baqari-Fruidze/Payment-Comparison-Dashboard.git
cd Payment-Comparison-Dashboard
npm install
```

### 2. Environment Variables

Create a `.env` file in the root of your project and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup (Supabase)

The database schema and starting data are included in the repository. Run these files in your Supabase SQL Editor in the following order:

1. `seed_schema.sql` - Creates the `companies`, `contracts`, and `bank_transactions` tables.
2. `seed_transactions.sql` - Populates the database with 89 un-matched bank transactions (April-June 2026).

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

---

## about project

The matching logic is implemented using supabase rpc, because it is more eficient, also avoids extra calculationsin client side.also handling edge cases is much easier in postgre sql. for pagination,sorting and filtering i used zod for validations. stricly written types, no any eslint rules were ignored. for auth i used @supabase/ssr.
