/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-imagetools" />
declare module "astro-imagetools/components";

interface ImportMetaEnv {
	readonly REDIS_REST_ENDPOINT: string;
	readonly REDIS_ACCESS_TOKEN: string;
	readonly UMAMI_WEBSITE_ID: string;
	readonly UMAMI_SCRIPT_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	_restoreTheme: () => void;
	_applyTheme: (_theme?: string, _mode?: string) => void;
	_disableTransitionWhileExecuting: (_function: () => void) => void;
}
