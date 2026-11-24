# FleetPro

A dispatcher dashboard for logistics companies. Track shipments and drivers, see in-transit routes on a map, and watch shipment statuses update in real time.

**Live demo:** https://fleetpro-topaz.vercel.app

## Features

- Responsive layout (mobile and desktop) with a collapsible mobile menu
- KPI cards: total, in transit, delivered, and delayed shipments
- Shipments table with sorting and pagination (TanStack Table)
- Search by ID, driver, or route, plus a status filter
- "New shipment" form with validation (React Hook Form + Zod) and city selection from a list
- Drivers page with status and active shipment count
- Interactive map (Leaflet): city markers with shipment counts and routes for in-transit shipments
- Simulated real-time updates: shipment statuses change automatically through a fake WebSocket server
- Data fetching and caching with loading and error states (TanStack Query)
- Shipments persist in the browser (localStorage)
- Client-side routing (React Router)
- Accessible UI: semantic HTML, keyboard navigation, visible focus states, ARIA attributes

## Tech stack

React, Vite, Tailwind CSS, React Router, TanStack Query, TanStack Table, React Hook Form, Zod, Leaflet

## Getting started

```bash
git clone https://github.com/oromova/fleetpro.git
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
  api/          fake API and fake WebSocket (simulated backend)
  components/   reusable UI components
  pages/        Dashboard, Shipments, Drivers, and Map pages
  data/         mock data and city coordinates
```

## Notes

There is no real backend. The API layer in `src/api` simulates network delay and a WebSocket connection, and data is stored in `localStorage`, so each visitor sees their own data. Replacing it with a real API only requires changing the files in that folder.

## Workflow

The project follows a GitFlow-style process: feature branches are merged into `develop` through pull requests, and `main` holds the stable, deployed version.