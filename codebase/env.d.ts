/// <reference types="vite/client" />

// https://vitejs.dev/guide/env-and-mode.html

interface ImportMetaEnv {
  readonly APP_START: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
