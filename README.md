# FleetPro

A dispatcher dashboard for logistics companies. Track shipments, search, sort, and add new ones.

**Live demo:** [[https://YOUR-LIVE-LINK](https://fleetpro-git-main-oromovas-projects.vercel.app/)](https://fleetpro-topaz.vercel.app)

## Features

- Responsive layout (mobile and desktop) with a collapsible mobile menu
- KPI cards: total, in transit, delivered, and delayed shipments
- Shipments table with sorting and pagination (TanStack Table)
- Search by ID, driver, or route, plus a status filter
- "New shipment" form with validation (React Hook Form + Zod)
- Data fetching and caching with loading and error states (TanStack Query)
- Client-side routing between Dashboard and Shipments pages (React Router)
- Accessible UI: semantic HTML, keyboard navigation, visible focus states, ARIA attributes

## Tech stack

React, Vite, Tailwind CSS, React Router, TanStack Query, TanStack Table, React Hook Form, Zod

## Getting started

```bash
git clone https://github.com/YOUR-USERNAME/fleetpro.git
cd fleetpro
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Project structure

```
src/
  api/          fake API that responds with a delay
  components/   reusable UI components
  pages/        Dashboard and Shipments pages
  data/         mock data
```

## Roadmap

- [ ] Drivers page
- [ ] Live map (Leaflet) and WebSocket updates
- [ ] Migrate to TypeScript and Next.js
- [ ] Tests (Jest, React Testing Library)

## Workflow

The project follows a GitFlow-style process: feature branches are merged into `develop` through pull requests, and `main` holds the stable, deployed version.
