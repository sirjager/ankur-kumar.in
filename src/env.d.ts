/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-imagetools" />
declare module "astro-imagetools/components";

interface ImportMetaEnv {
	readonly REDIS_REST_ENDPOINT: string;
	readonly REDIS_ACCESS_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
