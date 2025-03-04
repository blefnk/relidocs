import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://docs.reliverse.org",
	integrations: [
		starlight({
			title: "Relidocs: Reliverse Docs",
			social: {
				github: "https://github.com/blefnk/relidocs",
				discord: "https://discord.gg/Pb8uKbwpsJ",
				twitter: "https://x.com/blefnk",
			},
			sidebar: [
				{
					label: "👋 Introduction",
					collapsed: true,
					autogenerate: { directory: "intro", collapsed: true },
				},
				{
					label: "🧰 Reliverse CLI and Libraries",
					collapsed: true,
					autogenerate: { directory: "reliverse", collapsed: true },
				},
				{
					label: "🏬 Relivator Next.js Template",
					collapsed: false,
					autogenerate: { directory: "relivator", collapsed: true },
				},
				{
					label: "🏪 Versator Next.js Template",
					collapsed: false,
					autogenerate: { directory: "versator", collapsed: true },
				},
			],
		}),
	],
	redirects: {
		"/prompts/": "/reliverse/prompts/",
		"/cli/": "/reliverse/cli/",
		"/env/": "/relivator/env/",
	},
});
