import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { baseOptions } from "~/app/layout.config";
import { sourceLibraries } from "~/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={sourceLibraries.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
