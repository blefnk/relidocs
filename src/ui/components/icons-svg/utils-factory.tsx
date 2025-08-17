import React, { forwardRef, type SVGProps, useId } from "react";

export interface IconBaseProps extends IconReseui, SVGProps<SVGSVGElement> {}

export interface IconReseui {
  borderRadius?: number;
  className?: string;
  color?: string; // background
  glyphColor?: string; // glyph
  size?: number;
  title?: string;
}

export type SvgIcon = "DiscordIcon" | "GithubIcon" | "TwitterIcon" | "YoutubeIcon";

export function createIcon(
  displayName: SvgIcon,
  svgPath: (props: IconBaseProps) => React.ReactNode,
  viewBox = "0 0 24 24",
) {
  const Icon = forwardRef<SVGSVGElement, IconBaseProps>(
    (
      { borderRadius, color = "#5865F2", glyphColor = "#fff", size = "1em", title, ...props },
      ref,
    ) => {
      const titleId = useId();
      const resolvedSize = typeof size === "number" ? `${size}px` : size;

      return (
        <svg
          aria-hidden={title ? undefined : "true"}
          aria-labelledby={title ? titleId : undefined}
          fill="none"
          focusable="false"
          height={resolvedSize}
          ref={ref}
          role={title ? "img" : undefined}
          viewBox={viewBox}
          width={resolvedSize}
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          {title ? <title id={titleId}>{title}</title> : null}
          {svgPath({ borderRadius, color, glyphColor, title, ...props })}
        </svg>
      );
    },
  );
  Icon.displayName = displayName;
  return React.memo(Icon);
}
