// @ts-check

import eslint from "@eslint/js";
import markdown from "@eslint/markdown";
import tseslint from "typescript-eslint";

/** @type {import("typescript-eslint").Config} */
const config = tseslint.config(
	{
		ignores: [
			"**/.git/",
			"**/.{astro,next}/",
			"**/{node_modules,dist,dist-jsr,dist-npm,tests-runtime}/",
		],
	},
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		files: ["**/*.{js,jsx,md}"],
		...tseslint.configs.disableTypeChecked,
	},
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
		plugins: {},
		rules: {
			"@typescript-eslint/no-unsafe-assignment": "off",
		},
	},
	{
		files: ["**/*.md"],
		plugins: {
			markdown,
		},
		language: "markdown/commonmark",
		rules: {
			"no-irregular-whitespace": "off",
			"markdown/no-html": [
				"error",
				{
					allowed: [
						"a",
						"b",
						"br",
						"sub",
						"Card",
						"CardGrid",
						"details",
						"div",
						"img",
						"p",
						"tr",
						"td",
						"table",
						"picture",
						"source",
						"span",
						"summary",
					],
				},
			],
		},
	},
);

export default config;
