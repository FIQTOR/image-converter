# ⬛ OptiImage Pro

OptiImage is an elite, browser-based bulk image optimization pipeline. Designed with a strict, minimalist dark UI (inspired by Vercel's Geist design system), it allows developers and creators to resize, compress, and convert batches of images entirely on the client-side.

Your files never leave your device. Zero server dependency, maximum privacy, and lightning-fast execution.

## ✨ Key Features

- **Batch Processing Pipeline:** Upload multiple files at once via drag-and-drop.
- **Per-Image Configuration:** Apply unique settings to individual files or deploy a single configuration to the entire queue.
- **Advanced Optimization Strategies:**
  - **Quality Control:** Adjust compression levels to balance visual fidelity and file size.
  - **Strict Target Size:** Set a maximum KB/MB limit, and let the engine calculate the optimal compression.
  - **Dimension Resizing:** Force exact width and height constraints.
- **Elite Dark Mode UI:** A distraction-free, terminal-inspired interface built for developers.
- **Responsive Architecture:** Fully functional on desktop, tablet, and mobile devices with an adaptive layout.
- **Client-Side Execution:** 100% browser-based processing.

## 🛠 Tech Stack

- **Framework:** React 18 (via [Vite](https://vitejs.dev/))
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** JavaScript (ES6+)

---

## 🚀 Getting Started

Follow these steps to run the OptiImage pipeline on your local environment.

### 1. Initialize Project
If you haven't already created a Vite project, generate one:
```bash
npm create vite@latest opti-image -- --template react
cd opti-image

```

### 2. Install Dependencies

Install Tailwind CSS and Lucide icons:

```bash
# Install core dependencies
npm install

# Install UI Icons
npm install lucide-react

# Install and configure Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

### 3. Configure Tailwind

Update your `tailwind.config.js` to ensure Tailwind scans your React files, and add the custom screen breakpoint for smaller devices (`xs`):

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Added for optimal mobile rendering
      }
    },
  },
  plugins: [],
}

```

Add Tailwind directives to your `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Scrollbar for the dark theme */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

```

### 4. Deploy Local Server

Paste the `Homepage.jsx` code into your `src/App.jsx` (or route it accordingly), then spin up the Vite development server:

```bash
npm run dev

```

---

## 🧠 Upcoming Roadmap (Logic Implementation)

Currently, the UI provides a mock conversion to showcase the flow. To implement the actual engine logic in production, consider integrating the following libraries:

* **[`browser-image-compression`](https://www.npmjs.com/package/browser-image-compression):** For handling the `Target Size` and `Quality` compression strategies locally.
* **[`jszip`](https://www.google.com/search?q=https://www.npmjs.com/package/jszip) & [`file-saver`](https://www.npmjs.com/package/file-saver):** To bundle the processed images into a single `.zip` file when the user clicks "Download ZIP".

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```