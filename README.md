# Shop System Material

A modern e-commerce landing page built with Next.js and TypeScript. This project showcases a polished product catalog, interactive shopping cart, wishlist sidebar, authentication modal, and responsive design for desktop and mobile.

## Overview

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS / custom utility classes
- **Features:** product grid, product modal, cart sidebar, wishlist, auth modal, responsive layout
- **Data:** local product catalog in `src/data/products.ts`

## Project Structure

- `app/` — Root app structure, global layout, and landing page
- `src/components/` — UI components such as `Navbar`, `Hero`, `ProductCard`, `CartSidebar`, and `WishlistSidebar`
- `src/store/useStore.ts` — client-side state management for cart and wishlist
- `src/types/index.ts` — shared TypeScript interfaces and type definitions
- `src/data/products.ts` — product metadata and sample product data

### Project Tree

```
shop-system-metrerial
├── README.md
├── next.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── public/
│   └── ...
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── AuthModal.tsx
    │   ├── CartSidebar.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── Navbar.tsx
    │   ├── ProductCard.tsx
    │   ├── ProductGrid.tsx
    │   ├── ProductModal.tsx
    │   ├── Stats.tsx
    │   └── WishlistSidebar.tsx
    ├── data/
    │   └── products.ts
    ├── store/
    │   └── useStore.ts
    └── types/
        └── index.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Development Notes

- Modify the landing experience in `src/app/page.tsx` and `src/components/`.
- Update product content in `src/data/products.ts`.
- Use the component library to add new product categories, promotions, or checkout UI.

## Recommended Scripts

- `npm run dev` — run the project locally
- `npm run build` — build for production
- `npm run start` — start the production server after building
- `npm run lint` — run ESLint checks

## Live Demo

Explore the project live: [E-Commerce Shop](https://your-live-demo-url.com)

---

## Deployment

This app is production-ready for static or server deployment. Popular hosting options:

- Vercel
- Netlify
- Render
- Any Node.js-compatible hosting platform

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit changes with clear messages.
4. Open a pull request.

## License

Use this code freely for portfolio, demo, or internal projects. Update the license section as needed for your organization.
