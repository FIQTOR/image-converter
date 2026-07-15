
# OptiImage - Elite Image Processing Pipeline ⚡️

OptiImage is a high-performance, client-side image optimization and conversion tool built with React and Vite. Designed with a sleek, minimalist "Vercel Dark" aesthetic, it empowers developers and users to batch-process images entirely within the browser—ensuring maximum privacy and blazing-fast speeds.

## ✨ Features

- **100% Client-Side Processing:** Your files never leave your device. All optimization happens locally in the browser.
- **Batch Processing:** Drag, drop, and process dozens of images simultaneously.
- **Granular Control:** Configure settings globally or per-image in the queue.
- **Multiple Optimization Strategies:**
  - **Quality:** Adjust compression levels to balance visual fidelity and file size.
  - **Max Size:** Set a strict target file size (KB/MB), and let the engine calculate the optimal compression.
  - **Resize:** Scale images by defining exact pixel dimensions.
- **Extensive Format Support:** Convert to `WEBP`, `JPEG`, `PNG`, `AVIF`, `HEIC`, `TIFF`, `GIF`, and `ICO`.
- **Elite Dark Mode UI:** A distraction-free, developer-centric interface inspired by Geist / Vercel UI.
- **Mobile Responsive:** Fully functional and beautifully adapted for smaller screens.

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 16 or higher) and `npm` installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/FIQTOR/image-converter.git](https://github.com/FIQTOR/image-converter.git)

```

2. Navigate to the project directory:
```bash
cd image-converter

```


3. Install the dependencies:
```bash
npm install

```


*(Note: Ensure you have `lucide-react` installed as it is required for the UI icons).*
4. Start the development server:
```bash
npm start

```


5. Open your browser and visit `http://localhost:5173` to view the application.

## 💡 Usage

1. **Upload:** Drag and drop your image files into the designated drop zone, or click to browse your file system.
2. **Select & Configure:** Click on any file in the queue (left panel) to open its configuration (right panel).
3. **Tweak Settings:** Choose your target format (e.g., WebP) and optimization strategy (Quality, Max Size, or Resize).
4. **Apply to All (Optional):** Click the "Apply to all" icon in the configuration header to sync your current settings across the entire queue.
5. **Deploy:** Click **"Deploy Optimization"** to start processing.
6. **Download:** Once processing is complete, download your optimized assets in a single `.ZIP` file.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/FIQTOR/image-converter/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

```