/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly APP_URL: string;
	readonly APP_NAME: string;
	readonly COUNTER_API_KEY: string;
	readonly REDIS_CONNECTION_STRING: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
