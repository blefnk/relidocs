"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface UseAnimeProps {
  animateOnMount?: boolean;
  animation?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  delay?: number;
  duration?: number;
  easing?: string;
  targets: string;
}

export const useAnime = ({
  animateOnMount = true,
  animation = {},
  delay = 0,
  duration = 800,
  easing = "outExpo",
  targets,
}: UseAnimeProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof animate>[]>([]);

  useEffect(() => {
    if (!elementRef.current) return;

    // Clear previous animations
    for (const anim of animationRef.current) {
      anim.pause();
    }

    if (animateOnMount) {
      const defaultAnimation = {
        delay,
        duration,
        easing,
        opacity: [0, 1],
        translateY: [20, 0],
        ...animation,
      };

      const anim = animate(targets, defaultAnimation);
      animationRef.current = [anim];
    }

    return () => {
      // Cleanup animations on unmount
      for (const anim of animationRef.current) {
        anim.pause();
      }
    };
  }, [targets, animateOnMount, animation, duration, delay, easing]);

  return elementRef;
};
