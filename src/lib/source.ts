import { loader } from "fumadocs-core/source";
import { intro, libraries, templates } from "@/.source";

// @see https://fumadocs.vercel.app/docs/headless/source-api
export const sourceIntro = loader({
  // it assigns a URL to site pages
  baseUrl: "/intro",
  source: intro.toFumadocsSource(),
});

export const sourceLibraries = loader({
  baseUrl: "/libraries",
  source: libraries.toFumadocsSource(),
});

export const sourceTemplates = loader({
  baseUrl: "/templates",
  source: templates.toFumadocsSource(),
});
