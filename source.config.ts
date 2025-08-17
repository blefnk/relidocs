import { defineDocs } from "fumadocs-mdx/config";

export const intro = defineDocs({
  dir: "content/intro",
});

export const libraries = defineDocs({
  dir: "content/libraries",
});

export const templates = defineDocs({
  dir: "content/templates",
});

/* export default defineConfig({
  mdxOptions: {
    // ...MDX options
    remarkPlugins: [
      // ...remark plugins for structured data
    ],
  },
}); */
