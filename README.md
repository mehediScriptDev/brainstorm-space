# IdeaVault – Startup Idea Sharing Platform

IdeaVault is a web-based community platform where startup founders, engineers, and creatives collaborate to share, validate, and refine breakthrough business concepts. Designed for fast feedback loops and early-stage validation, the system allows innovators to discover trending ideas, aggregate platform-wide statistics, and gather structural feedback before launching a full product.

**Live Application Demo:** [https://ideavault-platform.vercel.app](https://ideavault-platform.vercel.app)

---

### Core Key Features

*   **SaaS Pitch Board (Full Idea Specs):** Allows builders to publish startup concepts using an extensive spec sheet—defining the target persona, estimated launch budget, core elevator pitch, problem statement, and proposed solution.
*   **Interactive Viability Engine:** A gamified, real-time assessment tool where users can enter a project, toggle market niche parameters, and receive an instant visual viability rating, projected sector size, and structural execution blueprint.
*   **Complete Comments CRUD System:** Encourages community interaction through feedback loops, allowing authenticated builders to post criticism, inline-edit comments, and delete reviews securely in real time.
*   **Global Theme State Controller:** Integrates light and dark themes toggled directly from the navbar, globally adjusting colors and typography variables seamlessly to reduce eye strain.
*   **Secure Auth Flow with State Persistence:** Provides persistent user session caching, custom registration credentials validation, and a profile settings dashboard—ensuring that reloading any protected route maintains the logged-in user state.

---

### Technologies Leveraged

*   **Framework:** Next.js 15+ (App Router)
*   **Language & Logic:** React 19 & JavaScript
*   **Styling & UI Tokens:** Tailwind CSS v4 & daisyUI
*   **State Management:** React Context (LocalStorage Persistence)

---

### Getting Started & Installation

First, clone the client repository, navigate to the folder, and install all package dependencies:

```bash
npm install
```

Start the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your web browser to explore IdeaVault!
