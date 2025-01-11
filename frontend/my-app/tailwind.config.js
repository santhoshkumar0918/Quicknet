/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      // Add only the animations you use
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // Disable unused features
  corePlugins: {
    float: false,
    clear: false,
    // Add other unused utilities
  },
} 