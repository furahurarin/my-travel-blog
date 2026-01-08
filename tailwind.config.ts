import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // MicroCMSから注入するHTMLで使うクラスを消さないように指定
    "bg-slate-50", "bg-white", "bg-blue-50", "bg-orange-50", "bg-red-50",
    "text-slate-600", "text-slate-800", "text-slate-900", "text-blue-600", "text-red-600", "text-orange-600",
    "border-slate-200", "border-blue-100", "border-orange-100", "border-l-4",
    "p-6", "rounded-xl", "shadow-sm", "shadow-md", "grid", "grid-cols-1", "md:grid-cols-3", "gap-6",
    "list-disc", "list-decimal", "pl-5", "space-y-2", "text-sm", "leading-relaxed"
  ],
  theme: {
    extend: {
      // プロっぽい配色の定義
      colors: {
        brand: {
          50: "#f0f9ff", // 背景用など（薄い青）
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // メインカラー（スカイブルー寄り）
          600: "#0284c7", // リンク色など
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e", // 濃い文字色
        },
        slate: {
          850: "#1e293b", // 本文の濃いグレー（真っ黒を使わないのがコツ）
        }
      },
      fontFamily: {
        // 日本語を美しく見せるフォント指定
        sans: [
          '"Helvetica Neue"',
          'Arial',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          '"Meiryo"',
          'sans-serif',
        ],
      },
      // 文章の読みやすさ（Typography）の微調整
      typography: {
        DEFAULT: {
          css: {
            color: '#334155', // text-slate-700
            lineHeight: '1.8', // 行間を広めに取る
            h2: {
              color: '#0f172a', // text-slate-900
              fontWeight: '700',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #e2e8f0', // 薄い線
            },
            h3: {
              color: '#1e293b', // text-slate-800
              fontWeight: '600',
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            p: {
              marginBottom: '1.5rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;