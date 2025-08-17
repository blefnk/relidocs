import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { sourceTemplates } from "~/lib/source";
import { getMDXComponents } from "~/mdx-components";

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = sourceTemplates.getPage(params.slug);

  if (!page) notFound();

  return {
    description: page.data.description,
    title: page.data.title,
  } satisfies Metadata;
}

export async function generateStaticParams() {
  return sourceTemplates.generateParams();
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = sourceTemplates.getPage(params.slug);

  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows to link to other pages with relative file paths
            a: createRelativeLink(sourceTemplates, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}
