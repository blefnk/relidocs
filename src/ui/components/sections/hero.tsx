"use client";

import Image from "next/image";
import type { FC } from "react";

import GlitchyReliverse from "~/img/glitch.png";
import { useAnime } from "~/lib/hooks/use-anime";

export const Hero: FC = () => {
  const contentRef = useAnime({
    animation: {
      delay: 400,
      duration: 800,
      easing: "outExpo",
      opacity: [0, 1],
      translateY: [20, 0],
    },
    targets: ".hero-content",
  });

  const imageRef = useAnime({
    animation: {
      delay: 600,
      duration: 1000,
      easing: "outElastic(1, 0.5)",
      opacity: [0, 1],
      scale: [0.9, 1],
    },
    targets: ".hero-image",
  });

  return (
    <header aria-labelledby="hero-title" className="mb-2" role="banner">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="hero-content" ref={contentRef}>
          <h2 className="typewriter mb-4 text-2xl font-bold" id="hero-title">
            the reliverse commitment
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              imagine a js ecosystem where tools feel alive, loyal, and on your side.
              <br />
              where speed respects your time, clarity respects your mind, and trust respects your
              dreams.
            </p>
            <p>
              no more fighting your stack. no more endless config pain. just code that flows, tools
              that disappear into the background, and a universe that actually gives a damn about
              your flow.
            </p>
            <p>
              this is reliverse: it's a movement to rewrite how we feel about building.
              <br />
              join the commitment. build with soul, not just specs.
            </p>
          </div>
        </div>
        <div className="hero-image vhs-effect" ref={imageRef}>
          <Image
            alt="Reliverse Logo"
            className="brutal-border h-auto w-full"
            height={500}
            placeholder="blur"
            priority
            src={GlitchyReliverse}
            width={500}
          />
        </div>
      </div>
    </header>
  );
};
