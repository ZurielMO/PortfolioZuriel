"use client";

import Image from "next/image";

import { usePreferences } from "@/components/providers/preferences-provider";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const POSES = {
  "de-pie": {
    src: "/images/avatar-de-pie.png",
    width: 1024,
    height: 950,
  },
  "brazos-cruzados": {
    src: "/images/avatar-brazos-cruzados.png",
    width: 443,
    height: 951,
  },
  senalando: {
    src: "/images/avatar-senalando.png",
    width: 705,
    height: 951,
  },
} as const;

type AvatarPose = keyof typeof POSES;

type AvatarFigureProps = {
  pose: AvatarPose;
  className?: string;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
};

export function AvatarFigure({
  pose,
  className,
  sizes,
  priority = false,
  decorative = false,
}: AvatarFigureProps) {
  const { copy } = usePreferences();
  const { src, width, height } = POSES[pose];

  return (
    <Image
      src={src}
      alt={decorative ? "" : `${copy.avatarAlt} ${siteConfig.name}`}
      aria-hidden={decorative || undefined}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={cn(
        "h-auto w-auto select-none",
        "animate-avatar-float motion-reduce:animate-none",
        className,
      )}
    />
  );
}
