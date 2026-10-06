"use client";

import ThreeDTextReveal from "@/components/portfolio/3d-text-reveal-tw";
import { usePreferences } from "@/components/providers/preferences-provider";

export function ScrollWords() {
  const { copy } = usePreferences();

  return (
    <ThreeDTextReveal
      items={[...copy.words]}
      scrollDistance="150vh"
      perspective={1000}
      radiusOffset={0.36}
      startRotation={-12}
      endRotation={110}
      scrubSmoothing={0.65}
      fontSize="clamp(2.75rem, 8vw, 6rem)"
      fontWeight={900}
      textClassName=""
    />
  );
}
