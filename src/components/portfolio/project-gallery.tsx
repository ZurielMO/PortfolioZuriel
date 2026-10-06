"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import Masonry, { type MasonryItem } from "@/components/react-bits/Masonry";
import { usePreferences } from "@/components/providers/preferences-provider";

type ProjectGalleryProps = {
  items: MasonryItem[];
  folder: string;
};

export function ProjectGallery({ items, folder }: ProjectGalleryProps) {
  const { copy } = usePreferences();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : items[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current && !dialog.open) dialog.showModal();
    if (!current && dialog.open) dialog.close();
  }, [current]);

  const move = (step: number) => {
    setActive((index) => {
      if (index === null || items.length === 0) return index;
      return (index + step + items.length) % items.length;
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
        <p className="font-heading text-xl font-semibold tracking-tight">
          {copy.galleryEmptyTitle}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {copy.galleryEmptyBefore}{" "}
          <code className="rounded bg-background px-1.5 py-0.5 text-foreground">
            public/images/projects/{folder}
          </code>
          . {copy.galleryEmptyAfter}
        </p>
      </div>
    );
  }

  return (
    <>
      <Masonry
        items={items}
        onSelect={(item) => {
          const index = items.findIndex((entry) => entry.id === item.id);
          setActive(index === -1 ? 0 : index);
        }}
      />

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="w-[min(100%-2rem,60rem)] rounded-2xl border border-border bg-background p-3 text-foreground backdrop:bg-ink/70"
        onClick={(event) => {
          if (event.target === dialogRef.current) setActive(null);
        }}
        onClose={() => setActive(null)}
        onCancel={(event) => {
          event.preventDefault();
          setActive(null);
        }}
      >
        {current ? (
          <figure>
            <div className="flex items-center justify-between gap-3 px-1 pb-3">
              <figcaption id={titleId} className="text-sm leading-relaxed">
                {current.alt}
              </figcaption>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <X className="size-4" />
                <span className="sr-only">{copy.closePhoto}</span>
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.img}
              alt={current.alt}
              className="max-h-[70vh] w-full rounded-xl object-contain bg-card"
            />
            {items.length > 1 ? (
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <ChevronLeft className="size-4" />
                  <span className="sr-only">{copy.prevPhoto}</span>
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <ChevronRight className="size-4" />
                  <span className="sr-only">{copy.nextPhoto}</span>
                </button>
              </div>
            ) : null}
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
