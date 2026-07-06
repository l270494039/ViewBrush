/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_SHOW_DEV_BADGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type PikturaDevServerMeta = {
  workspaceName: string;
  workspaceRoot: string;
  host: string;
  port: number;
  pid: number;
  startedAt: string;
  isProduction: boolean;
  disableHmr: boolean;
  hasApiKey: boolean;
};

interface Window {
  __PIKTURA_DEV_SERVER__?: PikturaDevServerMeta;
}
