import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    clearMocks: true,
    globals: true,
    include: [
      'tests/**/*.{test,spec}.{ts,tsx}',
    ],
    coverage: { 
        provider: 'v8', 
        reporter: ['text', 'html', 'lcov'], 
        reportsDirectory: 'coverage', 
        include: ['src/**/*.{ts,tsx}'], 
        exclude: ['tests/**', 'src/**/*.d.ts'] 
      }
  }
 
})
