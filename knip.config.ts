import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [
    'src/components/ui/**',
    'src/components/layout/app-title.tsx',
    'src/components/learn-more.tsx',
    'src/tanstack-table.d.ts',
    'src/features/shared/queries.ts',
    'src/lib/i18n.ts',
  ],
}

export default config