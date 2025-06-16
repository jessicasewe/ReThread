# ♻️ ReThread

ReThread is a modern web application focused on sustainable fashion, product management, and data visualization. Built with Next.js, TypeScript, and Tailwind CSS, it integrates with a Drupal backend to fetch and display products, articles, and data visualizations. The project is structured for scalability, maintainability, and ease of development.

---

## 📁 Project Structure

```
[`.env.local`](.env.local )
.gitignore
[`components.json`](components.json )
[`next-env.d.ts`](next-env.d.ts )
[`next.config.mjs`](next.config.mjs )
[`next.config.ts`](next.config.ts )
[`package.json`](package.json )
[`postcss.config.mjs`](postcss.config.mjs )
[`README.md`](README.md )
[`tailwind.config.ts`](tailwind.config.ts )
[`tsconfig.json`](tsconfig.json )
.next/
app/
components/
data/
hooks/
lib/
public/
types/
```

### 🗂️ Key Directories & Files

- **app/**  
  Contains Next.js app directory structure, including pages, layouts, API routes, and static assets.
  - `app/products/page.tsx`: Server component for the Products page, fetches product data from Drupal.
  - `app/articles/`: Article-related pages and logic.
  - `app/api/`: API routes, e.g., `/api/test-drupal` for backend integration.

- **components/**  
  Reusable UI components and feature modules.
  - `components/products/`: Product listing, filtering, and modal components.
  - `components/articles/`: Article list and detail components.

- **data/**  
  Static or fallback data used throughout the app.

- **hooks/**  
  Custom React hooks for data fetching and state management.
  - `use-products.ts`: Filtering and searching products.
  - `use-articles.ts`: Fetching articles from the API.
  - `use-navigation-routes.ts`: Navigation route definitions.

- **lib/**  
  Utility libraries and backend integration logic.
  - `drupal-api.ts`: Handles communication with the Drupal backend.
  - `transform-products.ts`: Transforms Drupal product data into app-friendly format.

- **public/**  
  Static files and images.

- **types/**  
  TypeScript type definitions for products, articles, etc.

- **.next/**  
  Next.js build output (auto-generated, should not be edited manually).

- **⚙️ Configuration Files**  
  - `.env.local`: Environment variables (e.g., Drupal API URL, credentials).
  - `next.config.mjs` / `next.config.ts`: Next.js configuration.
  - `tailwind.config.ts`: Tailwind CSS configuration.
  - `postcss.config.mjs`: PostCSS configuration.
  - `tsconfig.json`: TypeScript configuration.

---

## ✨ Features

- **🛍️ Product Management**: Fetches and displays products from a Drupal backend, with filtering and search.
- **📰 Articles**: Lists and displays articles, also fetched from Drupal.
- **📊 Data Visualization**: Dedicated section for visualizing sustainability data.
- **🔑 Admin & Editor Routes**: Navigation structure supports admin/editor dashboards.
- **🛟 Fallback Data**: Uses fallback data if the backend is unavailable.
- **🧩 Custom Hooks**: Encapsulated logic for fetching and managing data.

---

## 🚀 Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Configure environment**
   - Copy `.env.local.example` to `.env.local` and set the required variables (e.g., `NEXT_PUBLIC_DRUPAL_API`, `DRUPAL_USERNAME`, `DRUPAL_PASSWORD`).

3. **Run the development server**
   ```sh
   npm run dev
   ```

4. **Build for production**
   ```sh
   npm run build
   npm start
   ```

---

## 📝 Notes

- The project expects a running Drupal backend with JSON:API enabled.
- For development, SSL certificate errors are ignored for local Drupal instances.
- All API and transformation logic is centralized in the [`lib/`](lib/) directory.

---

## 📄 License

MIT
