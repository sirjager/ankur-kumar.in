module.exports = {
	root: true,
	env: {
		node: true,
		"astro/astro": true,
		browser: true,
		es2021: true,
	},
	extends: [
		"prettier",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:qwik/recommended",
		"plugin:astro/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
		ecmaVersion: 2021,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["@typescript-eslint", "astro"],
	overrides: [
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			rules: {
				"qwik/jsx-key": "off",
			},
		},
	],
	rules: {
		"@typescript-eslint/triple-slash-reference": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-this-alias": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"prefer-spread": "off",
		"no-case-declarations": "off",
		"no-console": "off",
		"@typescript-eslint/consistent-type-imports": "warn",
		"@typescript-eslint/no-unnecessary-condition": "warn",
		quotes: ["error", "double"],
		"react/no-unknown-property": [0],
		"no-unused-vars": [1, {args: "after-used", argsIgnorePattern: "^_"}],
		"linebreak-style": ["error", "unix"],
		"require-jsdoc": "off",
		"@typescript-eslint/no-unused-vars": [
			"error", // 2
			{args: "after-used", argsIgnorePattern: "^_"},
		],
	},
};
