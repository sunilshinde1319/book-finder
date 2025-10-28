# 📚 Book Finder: A Modern React Web Application

Book Finder is a responsive, feature-rich web application designed to help users efficiently search, filter, and explore books using the Open Library API. It features a clean, modern UI with a unique "always dark" content design, infinite scrolling for seamless browsing, and a persistent favorites list.

**Live Demo Link:** [https://book-finder-demo-link.vercel.app](https://book-finder-demo-link.vercel.app) 
*(Note: Replace this with your actual Vercel deployment link!)*

---

## ✨ Key Features

*   **Smart Search:** Debounced search bar for finding books by title or author.
*   **Infinite Scroll:** Seamlessly load more books as you scroll down the page.
*   **Advanced Filtering:** Filter results by publication year range, language, subject, or publisher.
*   **Flexible Sorting:** Sort results by publication year (newest/oldest) or by edition count.
*   **Book Details Modal:** Click any book to view a detailed description, subjects, and more in a focused pop-up.
*   **Favorites System:** Add or remove books from a personal "Favorites" list that persists between sessions (uses `localStorage`).
*   **Modern UI/UX:**
    *   Fully responsive design for desktop, tablet, and mobile.
    *   Skeleton loaders for a smoother perceived performance.
    *   "Toast" notifications for clear user feedback on actions.
    *   Built with a unique design where the page has a light theme, but the content cards and modals have a consistent, modern "frosted glass" dark theme.

---

## 🛠️ Technology Stack

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** CSS Modules
*   **Animations:** Framer Motion
*   **API:** Open Library API
*   **Deployment:** Vercel

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/book-finder.git
    cd book-finder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.
