"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { animate, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type FlipDirection = "top" | "bottom" | "left" | "right";
type StaggerOrigin = "first" | "last" | "center" | "random" | number;

export interface ThreeDLetterSwapProps {
  children: ReactNode;
  className?: string;
  frontFaceClassName?: string;
  backFaceClassName?: string;
  flipDirection?: FlipDirection;
  staggerInterval?: number;
  staggerOrigin?: StaggerOrigin;
  duration?: number;
  blur?: boolean;
  blurAmount?: number;
  playOnScroll?: boolean;
  scrollThreshold?: number;
  respectReducedMotion?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

function getStaggerDelay(
  index: number,
  total: number,
  staggerOrigin: StaggerOrigin,
  staggerInterval: number,
) {
  if (staggerOrigin === "first") return index * staggerInterval;
  if (staggerOrigin === "last") return (total - 1 - index) * staggerInterval;
  if (staggerOrigin === "center") {
    const center = Math.floor(total / 2);
    return Math.abs(center - index) * staggerInterval;
  }
  if (staggerOrigin === "random") {
    const randomIndex = Math.floor(Math.random() * total);
    return Math.abs(randomIndex - index) * staggerInterval;
  }
  return Math.abs(staggerOrigin - index) * staggerInterval;
}

function getRotationTransform(direction: FlipDirection) {
  switch (direction) {
    case "top":
      return "rotateX(90deg)";
    case "bottom":
      return "rotateX(-90deg)";
    case "left":
      return "rotateY(-90deg)";
    case "right":
      return "rotateY(90deg)";
  }
}

function getSecondFaceStyle(direction: FlipDirection): CSSProperties {
  switch (direction) {
    case "top":
      return {
        transform: "rotateX(-90deg) translateZ(0.5lh)",
        transformOrigin: "top",
      };
    case "bottom":
      return {
        transform: "rotateX(90deg) translateZ(0.5lh)",
        transformOrigin: "bottom",
      };
    case "left":
      return {
        transform: "rotateY(90deg) translateZ(50%)",
        transformOrigin: "left",
      };
    case "right":
      return {
        transform: "rotateY(-90deg) translateZ(50%)",
        transformOrigin: "right",
      };
  }
}

export default function ThreeDLetterSwap({
  children,
  className,
  frontFaceClassName,
  backFaceClassName,
  flipDirection = "top",
  staggerInterval = 0.05,
  staggerOrigin = "first",
  duration = 0.6,
  blur = false,
  blurAmount = 4,
  playOnScroll = false,
  scrollThreshold = 0.1,
  respectReducedMotion = true,
  onAnimationStart,
  onAnimationComplete,
}: ThreeDLetterSwapProps) {
  const text = typeof children === "string" || typeof children === "number"
    ? String(children)
    : "";

  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = respectReducedMotion && prefersReducedMotion;
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedOnScroll, setHasPlayedOnScroll] = useState(false);
  const animatingRef = useRef(false);

  const words = useMemo(() => {
    const parts = text.split(" ");
    return parts.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== parts.length - 1,
    }));
  }, [text]);

  const playAnimation = useCallback(async () => {
    if (!containerRef.current || animatingRef.current || reduceMotion) return;

    animatingRef.current = true;
    onAnimationStart?.();

    const boxes = containerRef.current.querySelectorAll<HTMLElement>(
      ".letter-3d-swap-char-box",
    );
    const rotation = getRotationTransform(flipDirection);
    const delays = Array.from(boxes).map((_, i) =>
      getStaggerDelay(i, boxes.length, staggerOrigin, staggerInterval),
    );

    await animate(
      boxes,
      {
        transform: rotation,
        ...(blur ? { filter: [`blur(${blurAmount}px)`, "blur(0px)"] } : {}),
      },
      {
        duration,
        delay: (i: number) => delays[i] ?? 0,
        ease: [0.22, 1, 0.36, 1],
      },
    );

    await animate(
      boxes,
      { transform: "rotateX(0deg) rotateY(0deg)", filter: "blur(0px)" },
      { duration: 0 },
    );

    animatingRef.current = false;
    onAnimationComplete?.();
  }, [
    blur,
    blurAmount,
    duration,
    flipDirection,
    onAnimationComplete,
    onAnimationStart,
    reduceMotion,
    staggerInterval,
    staggerOrigin,
  ]);

  useEffect(() => {
    if (!playOnScroll || hasPlayedOnScroll || reduceMotion) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasPlayedOnScroll(true);
          void playAnimation();
          observer.disconnect();
        }
      },
      { threshold: scrollThreshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasPlayedOnScroll, playAnimation, playOnScroll, reduceMotion, scrollThreshold]);

  useEffect(() => {
    if (!playOnScroll && isHovered) {
      void playAnimation();
    }
  }, [isHovered, playAnimation, playOnScroll]);

  if (!text) return null;

  let charIndex = 0;

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex flex-wrap", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word.characters.join("")}-${wordIndex}`} className="inline-flex">
          {word.characters.map((char) => {
            const index = charIndex++;
            return (
              <span
                key={`${char}-${index}`}
                className="letter-3d-swap-char relative inline-block perspective-[1000px]"
                style={{
                  width: char === " " ? "0.35em" : undefined,
                }}
                aria-hidden="true"
              >
                <motion.span
                  className="letter-3d-swap-char-box relative inline-block transform-3d"
                  style={{
                    transform: "translateZ(-0.5lh)",
                  }}
                >
                  <span
                    className={cn(
                      "relative inline-block backface-hidden",
                      frontFaceClassName,
                    )}
                    style={{ transform: "translateZ(0.5lh)" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 inline-flex items-center justify-center backface-hidden",
                      backFaceClassName,
                    )}
                    style={getSecondFaceStyle(flipDirection)}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                </motion.span>
              </span>
            );
          })}
          {word.needsSpace ? <span className="inline-block w-[0.35em]" aria-hidden="true" /> : null}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}
