import { createFromSource } from "fumadocs-core/search/server";
import { sourceIntro } from "~/lib/source";

export const { GET } = createFromSource(sourceIntro, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
});
