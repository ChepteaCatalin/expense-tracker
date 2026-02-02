import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            //TODO: remove this once `optimizePackageImports` is no longer experimental
            {
              name: '@mui/icons-material',
              message:
                'Import specific icons from @mui/icons-material/IconName instead of destructuring from the main package.',
            },
            // TODO: remove this once `optimizePackageImports` is no longer experimental
            {
              name: '@mui/material',
              message:
                'Import specific components from @mui/material/ComponentName instead of destructuring from the main package.',
            },
          ],
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
