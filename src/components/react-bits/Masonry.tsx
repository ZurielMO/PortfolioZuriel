"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

import { usePreferences } from "@/components/providers/preferences-provider";

export type MasonryItem = {
  id: string;
  img: string;
  alt: string;
  height: number;
};

type MasonryProps = {
  items: MasonryItem[];
  onSelect?: (item: MasonryItem) => void;
  ease?: string;
  duration?: number;
  stagger?: number;
};

const useColumnCount = () => {
  const queries = ["(min-width: 1024px)", "(min-width: 640px)"];
  const values = [3, 2];
  const get = () => {
    if (typeof window === "undefined") return 1;
    const index = queries.findIndex((query) => window.matchMedia(query).matches);
    return index === -1 ? 1 : values[index];
  };
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const media = queries.map((query) => window.matchMedia(query));
    const update = () => setColumns(get());
    update();
    media.forEach((query) => query.addEventListener("change", update));
    return () => media.forEach((query) => query.removeEventListener("change", update));
  }, []);

  return columns;
};

/**
 * Masonry de React Bits, adaptado a esta galería: mismas columnas con GSAP,
 * clic para ampliar la foto en lugar de abrir una liga externa.
 */
export default function Masonry({
  items,
  onSelect,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
}: MasonryProps) {
  const { copy } = usePreferences();
  const columns = useColumnCount();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [ready, setReady] = useState(false);
  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    Promise.all(
      items.map(
        (item) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.src = item.img;
            image.onload = image.onerror = () => resolve();
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const gap = 14;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    const columnHeights = Array.from({ length: columns }, () => 0);

    return items.map((item) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const x = (columnWidth + gap) * column;
      const height = item.height;
      const y = columnHeights[column];
      columnHeights[column] += height + gap;
      return { ...item, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const height = grid.reduce((max, item) => Math.max(max, item.y + item.h), 0);

  useLayoutEffect(() => {
    if (!ready || grid.length === 0) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    grid.forEach((item, index) => {
      const target = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (reduceMotion || hasMounted.current) {
        gsap.to(`[data-key="${item.id}"]`, {
          ...target,
          opacity: 1,
          duration: reduceMotion ? 0 : duration,
          ease,
          overwrite: "auto",
        });
        return;
      }

      gsap.fromTo(
        `[data-key="${item.id}"]`,
        { opacity: 0, x: item.x, y: item.y + 48, width: item.w, height: item.h },
        {
          opacity: 1,
          ...target,
          duration: 0.7,
          ease,
          delay: index * stagger,
        },
      );
    });

    hasMounted.current = true;
  }, [duration, ease, grid, ready, stagger]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: height || undefined }}
    >
      {grid.map((item) => (
        <button
          key={item.id}
          type="button"
          data-key={item.id}
          aria-label={`${copy.enlarge}: ${item.alt}`}
          onClick={() => onSelect?.(item)}
          className="absolute top-0 left-0 overflow-hidden rounded-2xl border border-border/70 bg-card text-left opacity-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.img}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </button>
      ))}
    </div>
  );
}
