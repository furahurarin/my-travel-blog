import type { Config } from "tailwindcss";

const config: Config = {
  // ▼▼▼ 追加: これでOSの設定を無視し、手動でクラスを付けない限りダークモードになりません ▼▼▼
  darkMode: 'class', 

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ▼▼▼ ブランドカラー (ANA風トリトンブルー & モヒカンブルー) ▼▼▼
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00a9e0', // 明るい空色
          600: '#0055a4', // メインの濃い青
          700: '#003f7d', // さらに濃い青
          800: '#002a54', // 深海のような紺
          900: '#0c4a6e',
        },
        // ▼▼▼ アクセントカラー (旅の夕日) ▼▼▼
        accent: {
          500: '#f97316', // オレンジ
          600: '#ea580c',
        }
      },
      fontFamily: {
        // 日本語フォント(Noto Sans JP)を優先
        sans: ['var(--font-noto-sans-jp)', 'Inter', 'sans-serif'],
      },
      // ▼▼▼ 記事本文(prose)のデザインカスタマイズ ▼▼▼
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            // リンクの色をブランドカラーにする
            a: {
              color: theme('colors.brand.600'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.brand.700'),
                textDecoration: 'underline',
              },
            },
            // h2見出し: 下線デザイン
            'h2': {
              color: theme('colors.gray.800'),
              borderBottomWidth: '2px',
              borderBottomColor: theme('colors.brand.200'),
              paddingBottom: '0.5rem',
              marginTop: '2em',
            },
            // h3見出し: 左線デザイン
            'h3': {
              color: theme('colors.gray.800'),
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.brand.500'),
              paddingLeft: '0.75rem',
              marginTop: '1.5em',
            },
            // 箇条書きの点をブランドカラーにする
            'ul > li::marker': {
              color: theme('colors.brand.500'),
            },
            // 引用（Blockquote）のデザイン
            'blockquote': {
              borderLeftColor: theme('colors.brand.200'),
              color: theme('colors.gray.600'),
              backgroundColor: theme('colors.brand.50'),
              padding: '1rem',
              fontStyle: 'normal',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;