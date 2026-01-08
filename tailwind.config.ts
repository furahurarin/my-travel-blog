import type { Config } from "tailwindcss";

const config: Config = {
  // ▼ OSの設定を無視し、手動で'dark'クラスを付けない限りライトモードを維持します
  darkMode: 'class', 

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ANA風のブランドカラー設定
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00a9e0', // 明るい空色
          600: '#0055a4', // メインの濃い青
          700: '#003f7d', // さらに濃い青
          800: '#002a54',
          900: '#0c4a6e',
        },
        accent: {
          500: '#f97316', // オレンジ（旅の夕日）
          600: '#ea580c',
        }
      },
      // プロ級の透明感・浮遊感を出すカスタムシャドウ
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 85, 164, 0.1), 0 2px 4px -1px rgba(0, 85, 164, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 85, 164, 0.15), 0 4px 6px -2px rgba(0, 85, 164, 0.1)',
      },
      fontFamily: {
        // 日本語フォントを優先
        sans: ['var(--font-noto-sans-jp)', 'Inter', 'sans-serif'],
      },
      // ▼ 記事本文(prose)の読みやすさを徹底追求したカスタマイズ
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'), // 真っ黒を避け、読みやすい濃いグレーに
            lineHeight: '1.8',              // 行間を黄金比（1.7〜1.9）に設定
            fontSize: '1.05rem',
            p: {
              marginTop: '1.6em',           // 段落間の余白を十分に確保
              marginBottom: '1.6em',
            },
            // リンクのデザイン
            a: {
              color: theme('colors.brand.600'),
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': {
                color: theme('colors.brand.700'),
                textDecoration: 'underline',
              },
            },
            // 見出しのデザイン
            'h2': {
              color: theme('colors.gray.900'),
              borderBottomWidth: '2px',
              borderBottomColor: theme('colors.brand.200'),
              paddingBottom: '0.5rem',
              marginTop: '2.5em',
              marginBottom: '1.2em',
              fontWeight: '700',
            },
            'h3': {
              color: theme('colors.gray.900'),
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.brand.500'),
              paddingLeft: '0.75rem',
              marginTop: '2em',
              marginBottom: '1em',
              fontWeight: '700',
            },
            // 箇条書き
            'ul > li::marker': {
              color: theme('colors.brand.500'),
            },
            // 引用（Blockquote）
            'blockquote': {
              borderLeftColor: theme('colors.brand.200'),
              color: theme('colors.gray.600'),
              backgroundColor: theme('colors.brand.50'),
              padding: '1.5rem',
              borderRadius: '0.5rem',
              fontStyle: 'normal',
              fontWeight: '400',
              quotes: 'none',
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