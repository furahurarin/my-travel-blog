import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ダークモードはシステムの自動設定に従う (media) か、クラス切り替え (class) か選べますが、
  // 今回はOSの設定に連動させるためデフォルト（media）の挙動を利用します。
  // もし将来トグルボタンを作るなら darkMode: 'class' に変更してください。
  theme: {
    extend: {
      // 必要に応じて色やフォントを拡張
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // 記事本文の自動装飾用
  ],
};

export default config;