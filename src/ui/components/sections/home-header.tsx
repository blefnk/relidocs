"use client";

import Link from "next/link";
import type { FC } from "react";

import { SOCIAL_LINKS } from "~/lib/constants";
import { useAnime } from "~/lib/hooks/use-anime";
import { Button } from "~/ui/primitives/button";

interface SocialButtonProps {
  href: string;
  icon: FC<{ className?: string }>;
  label: string;
}

const SocialButton: FC<SocialButtonProps> = ({ href, icon: Icon, label }) => (
  <Link href={href} rel="noopener noreferrer" target="_blank">
    <Button aria-label={label} className="brutal-button" size="icon" variant="outline">
      <Icon className="h-5 w-5" />
    </Button>
  </Link>
);

export const HomeHeader: FC = () => {
  const headerRef = useAnime({
    animation: {
      duration: 800,
      easing: "outExpo",
      opacity: [0, 1],
      translateY: [-20, 0],
    },
    targets: ".hero-header",
  });

  const socialRef = useAnime({
    animation: {
      delay: 200,
      duration: 800,
      easing: "outExpo",
      opacity: [0, 1],
      translateX: [20, 0],
    },
    targets: ".hero-social",
  });

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="hero-header" ref={headerRef}>
        <h1
          className="glitch-text mb-2 text-4xl font-bold md:text-5xl"
          data-text="reliverse"
          id="main-title"
        >
          reliverse
        </h1>
        <p className="text-lg text-muted-foreground">js ecosystem modernization movement.</p>
        <p className="text-sm text-muted-foreground">
          focused on clean dx, honest ux, and tools you actually want to use.
        </p>
      </div>
      <nav
        aria-label="social links"
        className="hero-social flex gap-3"
        ref={socialRef}
        role="navigation"
      >
        {SOCIAL_LINKS.map(({ href, icon, label }) => (
          <SocialButton href={href} icon={icon} key={href} label={label} />
        ))}
      </nav>
    </div>
  );
};
