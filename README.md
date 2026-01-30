# Cisco Chemicals - Enterprise B2B Manufacturing Platform 🧪

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload-CMS-green?style=for-the-badge&logo=payload)](https://payloadcms.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)

Cisco Chemicals is a high-performance, enterprise-grade B2B platform designed for chemical manufacturing distribution. It combines a robust e-commerce engine with an AI-driven sales assistant and a sophisticated admin command center.

## 🌟 Key Features

### 🤖 RAG-Based AI Assistant

- **Context-Aware Support:** Uses Retrieval-Augmented Generation (RAG) to provide accurate shipping, safety, and pricing data based on real-time inventory.
- **Enterprise Support:** Handles complex bulk quote inquiries automatically.

### 📊 Executive Admin Dashboard

- **Data Visualization:** Interactive Recharts (Area, Donut, Bar) for monitoring sales velocity and quote conversion.
- **Role-Based Access (RBAC):** Granular permissions for Admins and Sales Managers.

### 📄 Intelligent Commerce Flow

- **Dynamic PDF Invoices:** Automated professional invoice generation for every order.
- **Transactional Emails:** Instant notifications via **Resend** when quotes are approved or orders shipped.
- **Bulk Quote System:** Specialized workflow for industrial-scale purchasing.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS 3.0 (Headless)
- **Database:** PostgreSQL (via @payloadcms/db-postgres)
- **AI Integration:** Google Gemini 2.0 Flash (via Vercel AI SDK)
- **Payments:** Stripe Integration
- **Emails:** Resend API
- **Styling:** Tailwind CSS + Shadcn/UI
- **Animations:** Framer Motion

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/cisco_chemical.git
cd cisco_chemical
npm install
```

### 2. Environment Setup

Create a `.env` file in the root:

```env
DATABASE_URI=your_postgres_uri
PAYLOAD_SECRET=your_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Configuration
GEMINI_API_KEY=your_gemini_key

# Payments & Email
STRIPE_SECRET_KEY=your_stripe_key
RESEND_API_KEY=your_resend_key
```

### 3. Run Development

```bash
npm run dev
```

---

*Built with passion for the chemical industry by Cisco Chemical Inc.*
