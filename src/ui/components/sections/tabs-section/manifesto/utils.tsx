import type { FC, ReactNode } from "react";

interface ManifestoSectionProps {
  children: ReactNode;
  emoji: string;
  title: string;
}
export const ManifestoSection: FC<ManifestoSectionProps> = ({ children, emoji, title }) => (
  <section>
    <h4 className="flex items-center gap-2 text-xl font-bold mb-2">
      <span aria-hidden="true">{emoji}</span>
      <span>{title}</span>
    </h4>
    {children}
  </section>
);
