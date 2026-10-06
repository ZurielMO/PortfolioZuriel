"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export interface ThreeDTextRevealProps {
  items: string[];
  className?: string;
  textClassName?: string;
  scrollDistance?: string;
  perspective?: number;
  radiusOffset?: number;
  startRotation?: number;
  endRotation?: number;
  scrubSmoothing?: number;
  fontSize?: string;
  fontWeight?: number;
  gap?: number;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function toPixels(value: string, viewport: number) {
  const match = /^(-?\d+(?:\.\d+)?)(vh|dvh|svh|px)?$/i.exec(value.trim());
  if (!match) return viewport * 2.5;
  const amount = Number(match[1]);
  const unit = (match[2] ?? "px").toLowerCase();
  if (unit === "px") return amount;
  return (amount / 100) * viewport;
}

let measureContext: CanvasRenderingContext2D | null = null;

function measureTextWidth(text: string, font: string) {
  if (typeof document === "undefined") return 0;
  if (!measureContext) {
    measureContext = document.createElement("canvas").getContext("2d");
  }
  if (!measureContext) return 0;
  measureContext.font = font;
  return measureContext.measureText(text).width;
}

const ThreeDTextReveal: React.FC<ThreeDTextRevealProps> = ({
  items = ["Scroll", "To", "Reveal", "3D", "Text"],
  className = "",
  textClassName = "",
  scrollDistance = "300vh",
  perspective = 1000,
  radiusOffset = 0.45,
  startRotation = -80,
  endRotation = 270,
  scrubSmoothing = 1,
  fontSize = "clamp(3rem, 9vw, 7rem)",
  fontWeight = 900,
  gap = 18,
}) => {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const wrapperRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const radiusRef = useRef(0);
  const itemsKey = items.join("\u0001");

  useGSAP(
    (_context, contextSafe) => {
      const wrapper = wrapperRef.current;
      const container = containerRef.current;
      if (reducedMotion || !wrapper || !container || !contextSafe) return;

      let alive = true;

      const layout = contextSafe(() => {
        const width = wrapper.clientWidth;
        const height = wrapper.clientHeight;
        itemsRef.current.length = items.length;
        const nodes = itemsRef.current.filter(
          (node): node is HTMLDivElement => node !== null,
        );
        if (!width || !height || nodes.length === 0) return;

        const sample = getComputedStyle(nodes[0]);
        const baseSize = parseFloat(sample.fontSize) || 48;
        const longest = items.reduce((current, next) =>
          next.length > current.length ? next : current,
        );
        const measured = measureTextWidth(
          longest.toLocaleUpperCase(),
          `${fontWeight} ${baseSize}px ${sample.fontFamily}`,
        );
        const maxWidth = width * 0.88;
        const scale =
          measured > maxWidth && measured > 0 ? maxWidth / measured : 1;
        const fittedSize = baseSize * scale;
        const step = Math.max(gap, 30);
        const stepRadians = (step * Math.PI) / 180;
        const radius = Math.max(
          (fittedSize * 1.2) / Math.sin(stepRadians),
          height * Math.min(radiusOffset, 0.38),
        );
        radiusRef.current = radius;

        gsap.set(container, {
          transformOrigin: "50% 50%",
          force3D: true,
        });

        nodes.forEach((item, index) => {
          const angle = index * step;
          const radians = (angle * Math.PI) / 180;
          gsap.set(item, {
            y: Math.sin(radians) * radius,
            z: Math.cos(radians) * radius,
            rotateX: -angle,
            scale,
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "50% 50%",
            force3D: true,
          });
        });
      });

      const boot = contextSafe(() => {
        if (!alive) return;
        layout();

        const width = wrapper.clientWidth || window.innerWidth;
        const viewport = window.innerHeight;
        const requested = toPixels(scrollDistance, viewport);
        const distance = Math.min(
          Math.max(requested, viewport * 1.15),
          viewport * (width < 768 ? 1.35 : 1.6),
        );
        const step = Math.max(gap, 30);
        const travel = Math.max(
          endRotation - startRotation,
          (items.length - 1) * step + 16,
        );

        gsap.fromTo(
          container,
          {
            rotateX: startRotation,
            z: () => -radiusRef.current,
          },
          {
            rotateX: startRotation + travel,
            z: () => -radiusRef.current,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: `+=${Math.round(distance)}`,
              pin: true,
              pinSpacing: true,
              scrub: width < 768 ? Math.min(scrubSmoothing, 0.45) : scrubSmoothing,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      ScrollTrigger.addEventListener("refreshInit", layout);

      if (document.fonts?.status === "loaded") {
        boot();
      } else {
        void document.fonts?.ready.then(() => {
          if (alive) boot();
        });
      }

      return () => {
        alive = false;
        ScrollTrigger.removeEventListener("refreshInit", layout);
      };
    },
    {
      dependencies: [
        itemsKey,
        scrollDistance,
        radiusOffset,
        startRotation,
        endRotation,
        scrubSmoothing,
        fontSize,
        fontWeight,
        gap,
        reducedMotion,
      ],
      scope: wrapperRef,
    },
  );

  if (reducedMotion) {
    return (
      <section
        className={cn(
          "flex w-full flex-col items-center gap-3 px-6 py-8 text-center",
          className,
        )}
        aria-label={items.join(", ")}
      >
        {items.map((item, index) => (
          <p
            key={`${item}-${index}`}
            className={cn(
              "max-w-full font-black uppercase leading-none",
              textClassName,
            )}
            style={{ fontSize, fontWeight }}
          >
            {item}
          </p>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      className={cn(
        "relative z-0 h-dvh w-full shrink-0 overflow-clip",
        className,
      )}
      style={{
        perspective: `${perspective}px`,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
      aria-label={items.join(", ")}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 text-center"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            ref={(element) => {
              itemsRef.current[index] = element;
            }}
            className={cn(
              "absolute top-1/2 left-1/2 font-black leading-none uppercase whitespace-nowrap",
              textClassName,
            )}
            style={{
              fontSize,
              fontWeight,
              backfaceVisibility: "hidden",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

ThreeDTextReveal.displayName = "ThreeDTextReveal";

export default ThreeDTextReveal;
