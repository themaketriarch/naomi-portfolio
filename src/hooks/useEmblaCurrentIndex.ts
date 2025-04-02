// hooks/useEmblaCurrentIndex.ts

import { useState, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function useEmblaCurrentIndex(
  emblaApi: EmblaCarouselType | undefined,
  isActive: boolean
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi || !isActive) return;

    const onSelect = () => {
      setIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, isActive]);

  // Ensure Embla syncs to this index if it reinitializes
  useEffect(() => {
    if (!emblaApi || !isActive) return;
    requestAnimationFrame(() => {
      emblaApi.scrollTo(index, true); // jump instantly
    });
  }, [emblaApi, isActive, index]);

  return [index, setIndex] as const;
}
