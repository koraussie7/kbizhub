/// <reference types="vitest/config" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { playwright } from '@vitest/browser-playwright'

// https://vite.dev/config/
export default defineConfig({
  // 루트(`/`) 및 서브도메인(`dashboard.kbizhub.com`) 단독 서빙을 위해 `/`로 설정
  base: '/',
  // 샌드박스 환경에서 node_modules/.vite-temp 쓰기 실패(EPERM) 방지:
  // Vite 캐시를 프로젝트 루트의 .vite-cache 디렉토리로 우회
  cacheDir: path.resolve(__dirname, '.vite-cache'),
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    silent: 'passed-only',
    unstubEnvs: true,
    // sendgo-mcp 는 Node 전용 MCP 서버 — 브라우저 vitest 대상에서 제외한다.
    // (node --test test/smoke.test.mjs 로 별도 실행)
    exclude: ['sendgo-mcp/**', '**/node_modules/**', '**/dist/**'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      // include: ['src/**/*.{js,jsx,ts,tsx}'], // Uncomment to expand the report to all src/**/* so untested modules appear as 0% coverage.
      exclude: [
        'src/components/ui/**',
        'src/assets/**',
        'src/tanstack-table.d.ts',
        'src/routeTree.gen.ts',
        'src/test-utils/**',
        'src/routes/**',
      ],
    },
  },
})
