# Habit Flow Client

This is the **client-side application** for the Habit Flow web app — a modern, responsive, and interactive **habit tracking platform** that allows users to create, manage, and track daily habits, build streaks, and monitor productivity. This client implements all core requirements and advanced features, including an analytics dashboard and habit insights.

---

## **Live Site**

Access the deployed client here: `https://habit-flows-here.netlify.app`

---

## **Features**

### **Core Features**

- **User Authentication**
  - Email/password login & registration
  - Google login
  - Protected routes for private habit operations

- **CRUD Operations for Habits**
  - Add, update, delete habits
  - Mark habits as complete
  - Real-time streak calculation

- **Home Page**
  - Hero banner/slider with typewriter and animation effects
  - Featured habits section (dynamic, latest 6 public habits)
  - Why build habits section with benefits cards
  - Extra custom sections with animations

- **Public Habits**
  - Browse all public habits
  - Search by title or keyword
  - Category-based filtering (Morning, Work, Fitness, Evening, Study)

- **Habit Details**
  - Detailed view of habits including description, category, progress, streak badge, and creator info

### **Advanced Features**

- **Analytics Dashboard**
  - Weekly progress charts using Recharts
  - Streak growth visualization

- **UI & UX Enhancements**
  - Framer Motion animations for sections and interactions
  - Lottie animations for task completions
  - React tooltips for habit details
  - SweetAlert2 / React Hot Toast for notifications

- **Theme Support**
  - Light/Dark mode toggle

- **Responsive Design**
  - Mobile, tablet, and desktop optimized
  - Consistent typography, spacing, and grid layouts

- **Image Upload & Display**
  - Optional image upload for habits (ImgBB integration)

- **Performance & Optimizations**
  - Axios for API requests
  - Optimized React rendering
  - Keen-slider for smooth hero carousel

---

## **Installation & Development**

1. Clone the repository:

```bash
git clone https://github.com/samibyte/habit-flow-client.git
cd habit-flow-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your Firebase config and API base URL:

```env
VITE_API_URL=<your-server-api-base-url>
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

4. Start development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

6. Preview production build:

```bash
npm run preview
```

---

## **Technologies Used**

- **React 19** – Frontend library
- **Vite** – Development & build tool
- **TailwindCSS & DaisyUI** – Styling and UI components
- **Firebase** – Authentication & user management
- **Axios** – API calls
- **Framer Motion** – Animations
- **React Hot Toast & SweetAlert2** – Notifications
- **React Tool Tip** – Tooltip
- **Recharts** – Analytics charts
- **Keen Slider** – Hero slider
- **Lucide-react** – Icons
- **React Router v7** – Routing

---

## **Notable Features / Highlights**

- Fully functional SPA with **persistent login** on refresh
- Custom animations and interactive UI
- Advanced analytics dashboard
- Category-based search and filtering
- Real-time habit streak updates
- Responsive and polished design
- Toast-based notifications for all actions

---

## **License**

MIT License

---

**Happy Habit Building!**
