# Roomzy — Global-Grade Urban Shared Living Platform

<p align="center">
  <strong>Find your space. Find your people.</strong><br>
  India's premium verified shared-living marketplace designed for working professionals, tech nomads, and expats across major tech corridors.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License MIT" />
</p>

---

## 🌟 Overview

**Roomzy** is an ultra-premium shared-living marketplace built with an **Apple-inspired glassmorphism design system** and modern editorial layout. It bridges the gap between verified property hosts and prospective flatmates, eliminating offline broker commissions, arbitrary rent markups, and excessive lock-ins across India's top metropolitan hubs.

Inspired by global design standards (Airbnb Luxe, Linear, Stripe Press, and modern GetSetHome), Roomzy provides a seamless end-to-end rental journey from initial discovery to luggage-only move-in.

---

## ✨ Core Pillars & Platform Features

### 1. 100% Zero Brokerage Policy
- Connect directly with verified flatmates, room owners, and co-living hosts.
- **₹0 commission guarantee** — saving tenants between ₹20,000 to ₹60,000+ upfront on every stay.

### 2. Standard 1-Month Security Deposit
- Replaces the traditional 6 to 10-month deposit demands in Bengaluru, Mumbai, and Delhi-NCR with a standardized **1-month deposit**.
- Preserves liquidity and cash flow for tenants moving into new cities.

### 3. Interactive Move-In Savings Calculator
- Real-time interactive rent slider (₹10,000 to ₹60,000/mo) allowing prospective tenants to dynamically calculate:
  - **Traditional Brokerage Lost**: 1 month's rent commission paid to offline brokers with zero guarantee.
  - **Total Cash Preserved**: Exact cash retained via zero brokerage and 1-month deposit policy (saving up to **₹2,20,000+** upfront).

### 4. Lifestyle Compatibility Scoring
- Algorithmic compatibility scoring (up to 98% match) based on:
  - **Dietary habits**: Pure Vegetarian, Non-Vegetarian Friendly, Vegan.
  - **Smoking & Drinking policies**: Balcony only, strictly non-smoking, social drinker.
  - **Work-From-Home setup**: 300 Mbps dedicated dual-band fiber with UPS battery backup.
  - **Quiet hours & social habits**: Early risers, night owls, pet-friendly spaces.

### 5. Find Together™ Co-Living Group Formation
- An exclusive innovation allowing 2 or 3 verified individuals to team up and lease premium 3BHK/4BHK high-rises directly from owners.
- Unlocks gated society amenities (swimming pool, gym, clubhouse, cook) while saving **40% on monthly rent** (~₹1,44,000 saved per person annually).

### 6. Turnkey Everyday Appliances Showroom
- Every Roomzy managed space is turnkey ready on Day 1:
  - 43" 4K Smart TV with pre-installed OTT streaming apps.
  - Frost-Free 260L Double-Door Refrigerator.
  - Fully Automatic Washing Machine.
  - Microwave & Induction Hob with modular cookware setup.
  - 300 Mbps Dedicated Dual-Band Wi-Fi.
  - Multi-stage RO + UV Water Purifier.
  - Biometric Smart Door Locks & 24/7 Security.

### 7. Privacy-First Locality Radar Mapping
- Interactive radar map displaying approximate neighborhood clusters rather than broadcasting exact apartment numbers publicly.
- Precise residential coordinates and host contact details are shared only after a visit is confirmed.

### 8. Expat & Tech Nomad Friendly Onboarding
- Frictionless digital onboarding supporting foreign visas, passport verification, and remote corporate credentials without requiring local physical guarantors.

---

## 🏛️ Supported Metros & Tech Corridors

| Metro City | Key Tech Corridors & Hubs Covered |
| :--- | :--- |
| **Bengaluru** | Indiranagar, Koramangala, HSR Layout, Bellandur, Whitefield, Electronic City |
| **Mumbai** | Bandra West, Powai, Andheri East, Lower Parel, BKC Corridor |
| **Delhi-NCR** | DLF Cyber City, Sector 62 Noida, Golf Course Extension, CyberHub |
| **Pune** | Viman Nagar, Hinjewadi Phase 1-3, Baner, Kharadi IT Park |
| **Hyderabad** | Gachibowli, HITEC City, Madhapur, Financial District, Kondapur |

---

## 🛠️ Technology Stack

- **Backend & Database**: Supabase (PostgreSQL with Row Level Security, Storage Buckets, GoTrue Auth)
- **Frontend Core**: React 18.3, TypeScript 5.5
- **Build System**: Vite 6.4 (ESM native, sub-second HMR)
- **Styling Architecture**:
  - Tailwind CSS 3.4 with custom design tokens (`obsidian`, `forest`, `ivory`, `amber`, `gold`).
  - Specular Apple-grade glassmorphism utility classes (`.glass-hero-island`, `.glass-luxury`, `.glass-dark`).
  - Architectural dot-matrix patterns (`.bg-dot-grid`, `.bg-dot-grid-dark`).
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans (body copy) & Outfit (editorial headlines)

---

## 📂 Project Architecture

```
roomzy/
├── index.html                   # HTML5 Entrypoint with Google Fonts preload
├── package.json                 # Dependencies & project scripts
├── tailwind.config.js           # Luxury design system tokens & animations
├── vite.config.js               # Vite bundler configuration
├── .gitignore                   # Enterprise git ignore specifications
├── README.md                    # Platform documentation
├── supabase/
│   └── schema.sql               # PostgreSQL tables, RLS policies, storage bucket
└── src/
    ├── main.tsx                 # React DOM root entry
    ├── App.tsx                  # Main router & layout shell
    ├── index.css                # Glassmorphism tokens & atmospheric styles
    ├── types/
    │   └── index.ts             # TypeScript domain models (Listing, User, Filter)
    ├── lib/
    │   └── supabase.ts          # Supabase client singleton
    ├── services/
    │   ├── storageService.ts    # Supabase Storage uploads (roomzy-media bucket)
    │   └── listingService.ts    # Live PostgreSQL queries & mutations
    ├── context/
    │   └── AppContext.tsx       # State management (Supabase Auth & live listings)
    ├── data/
    │   └── mockListings.ts      # Metro localities configuration
    ├── components/
    │   ├── auth/
    │   │   └── AuthModal.tsx    # Supabase Auth gateway (Email, Magic Link, Phone, Google)
    │   ├── layout/
    │   │   ├── Navbar.tsx       # Translucent desktop navigation with search
    │   │   ├── PersonaHeader.tsx# Live announcement bar & metro selector
    │   │   ├── MobileBottomNav.tsx # 5-tab mobile glass navigation
    │   │   ├── LeftRail.tsx     # Compact desktop discovery rail
    │   │   └── Footer.tsx       # Comprehensive footer with metro links
    │   └── marketplace/
    │       ├── FilterSidebar.tsx# Multi-facet filtering & budget sliders
    │       ├── ListingCard.tsx  # Carousel card with verification badges
    │       └── LocalityMap.tsx  # Interactive privacy-first Locality Radar
    └── views/
        ├── LandingPage.tsx      # 14-section editorial homepage with calculator
        ├── MarketplacePage.tsx  # Search results grid with split-screen radar
        ├── ListingDetailPage.tsx# Photo mosaic, breakdown & visit scheduler
        ├── SavedPage.tsx        # Saved favorites & booked visit itineraries
        ├── BusinessPortal.tsx   # Host SaaS portal with Supabase multi-image upload
        ├── AdminPortal.tsx      # Admin KYC review & trust verification desk
        └── OAuthConsentPage.tsx # Supabase OAuth Server authorization consent screen
```

---

## ⚡ Supabase Backend Setup

### 1. Database Schema & Storage Bucket
1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard).
2. Navigate to the **SQL Editor** tab on the left sidebar.
3. Open [`supabase/schema.sql`](supabase/schema.sql) from this repository, copy its contents, paste into the SQL Editor, and click **Run**.
4. This initializes:
   - Tables: `profiles`, `listings`, `scheduled_visits`, `inquiries`
   - Storage Bucket: `roomzy-media` (public) with folder isolation (`properties/`, `avatars/`)
   - Complete Row Level Security (RLS) policies allowing public read and authenticated mutations
   - PostgreSQL trigger to automatically create a user profile on `auth.users` creation.

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=https://knpcnaanzirifithdgbj.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable__CUZ4G-cRJkBGKqaC3tuLA_PCqDKb9A
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **pnpm** (recommended) or **npm**

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:omkar-2109/find-your-roomie.git
cd find-your-roomie

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm run dev
```

Open your browser at `http://localhost:5173` to explore the application.

### Production Build

```bash
# Validate TypeScript and generate production assets
pnpm run build

# Preview production bundle locally
pnpm run preview
```

---

## 🔒 Security & Privacy

- **Aadhaar KYC**: Masked identity verification preventing identity theft while maintaining privacy.
- **Approximate Geolocation**: Exact residential addresses are shielded until mutual tour confirmation.
- **No Broker Harassment**: Direct communication channel without offline brokers sharing phone numbers with third-party telemarketers.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).