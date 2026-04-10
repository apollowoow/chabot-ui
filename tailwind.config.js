/** @type {import('tailwindcss').Config} */
export default {
  // Your shield against the host system's CSS
  prefix: 'cb', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // CRITICAL for an injectable widget
  corePlugins: {
    preflight: false,
  }
}