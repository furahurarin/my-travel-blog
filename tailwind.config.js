/** @type {import('tailwindcss').Config} */
module.exports = {
  // スマホやPCのシステム設定（ライト/ダーク）に合わせて自動で切り替える設定
  darkMode: 'media', 

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), // 記事のデザインを整えるプラグイン
  ],
};