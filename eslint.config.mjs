import { defineConfig, globalIgnores } from 'eslint/config';
import next from '@next/eslint-plugin-next';
import ts from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
export default defineConfig([...ts.configs.recommended,hooks.configs.flat.recommended,{files:['**/*.{ts,tsx,js,mjs}'],plugins:{'@next/next':next},rules:{...next.configs.recommended.rules,...next.configs['core-web-vitals'].rules}},globalIgnores(['.next/**','src/generated/**','.cache/**','next-env.d.ts'])]);
