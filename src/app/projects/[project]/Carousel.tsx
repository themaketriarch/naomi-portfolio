"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectControls } from "./ProjectControls";
import { useBreakpoint, useEmblaCurrentIndex } from "@/hooks/index";

import ProjectImage from "./ProjectImage";
import useEmblaCarousel from "embla-carousel-react";
import { LayoutsMap } from "@/types/types";
import {} from "@/hooks/useEmblaCurrentIndex";

interface CarouselProps {
  project: string;
  subtitle?: string;
  images: string[];
}

const layouts: LayoutsMap = {
  HildaTheSeries: {
    base: {
      rows: 3,
      cols: 3,
      spans: {
        0: { colSpan: 2, rowSpan: 1 },
      },
    },
    sm: {
      rows: 10,
      cols: 7,
    },
    md: {
      rows: 21,
      cols: 3,
    },
  },
  InterruptingChicken: {
    base: {
      rows: 5,
      cols: 5,
      spans: {
        0: { colSpan: 3, rowSpan: 2 },
        4: { colSpan: 1, rowSpan: 2 },
        10: { colSpan: 3, rowSpan: 2 },
      },
    },
  },
  TheBobsBurgerMovie: {
    base: {
      rows: 4,
      cols: 5,
      spans: {
        0: { colSpan: 5, rowSpan: 1 },
        2: { colSpan: 2, rowSpan: 2 },
      },
    },
    sm: {
      rows: 10,
      cols: 1,
    },

    md: {
      rows: 3,
      cols: 4,
    },
  },
  TheGhostAndMcGee: {
    base: {
      rows: 1,
      cols: 4,
    },
    sm: {
      rows: 4,
      cols: 1,
    },
    md: {
      rows: 2,
      cols: 2,
    },
  },
  TangledTheSeries: {
    base: {
      rows: 7,
      cols: 5,
      spans: {
        3: { colSpan: 1, rowSpan: 2 },
        4: { colSpan: 1, rowSpan: 2 },
        8: { colSpan: 3, rowSpan: 2 },
        14: { colSpan: 2, rowSpan: 2 },
        16: { colSpan: 1, rowSpan: 2 },
      },
    },
    sm: {
      rows: 7,
      cols: 2,
    },
    md: {
      rows: 5,
      cols: 3,
    },
  },
};

export default function Carousel({ project, subtitle }: CarouselProps) {
  const [images, setImages] = useState<string[]>([]);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [isEmblaReady, setIsEmblaReady] = useState(false);

  // Step 1: Create initialIndex ref BEFORE embla is created
  const initialIndexRef = useRef(0);

  // Step 2: Use `useEmblaCarousel` AFTER initialIndexRef is ready
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndexRef.current,
  });

  // Step 3: Use your custom hook
  const [currentIndex, setCurrentIndex] = useEmblaCurrentIndex(
    emblaApi,
    !isFullScreen
  );

  // Step 4: Keep index in sync with your ref (initially)
  useEffect(() => {
    if (emblaApi) {
      const selected = emblaApi.selectedScrollSnap();
      initialIndexRef.current = selected;
      setCurrentIndex(selected);
    }
  }, [emblaApi, setCurrentIndex]);

  useEffect(() => {
    if (emblaApi) {
      setIsEmblaReady(true);
    }
  }, [emblaApi, currentIndex]);

  useEffect(() => {
    initialIndexRef.current = currentIndex;
  }, [currentIndex]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isExitingFullscreen, setIsExitingFullscreen] = useState(false);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const breakpoint = useBreakpoint();

  const layoutMap = layouts[project];
  const activeLayout = layoutMap?.[breakpoint] ||
    layoutMap?.base || { rows: 3, cols: 3 };
  const spans = activeLayout.spans || {};

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/list-blobs");
      const blobs = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setImages(blobs.map((b: any) => b.pathname));
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      setCurrentIndex((prevIndex) =>
        prevIndex !== newIndex ? newIndex : prevIndex
      );
    };

    emblaApi.on("select", updateIndex);
    updateIndex(); // Sync immediately

    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi, setCurrentIndex]);

  useEffect(() => {
    imageRefs.current = images.map((_, i) => imageRefs.current[i] || null);
  }, [images]);

  useEffect(() => {
    if (!isFullScreen && emblaApi) {
      requestAnimationFrame(() => {
        emblaApi.scrollTo(currentIndex, true); // jump instantly
      });
    }
  }, [isFullScreen, emblaApi, currentIndex]);

  const scrollNext = useCallback(() => {
    if (isFullScreen) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else {
      emblaApi?.scrollNext(true);
    }
  }, [isFullScreen, setCurrentIndex, images.length, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (isFullScreen) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else {
      emblaApi?.scrollPrev(true);
    }
  }, [isFullScreen, setCurrentIndex, images.length, emblaApi]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index, true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      if (emblaApi) {
        const next = (emblaApi.selectedScrollSnap() + 1) % images.length;
        emblaApi.scrollTo(next);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, emblaApi, images.length]);

  const handleFullScreenToggle = () => {
    if (isGridView) return; // Prevent toggle in grid view
    setIsFullScreen((prev) => !prev);
  };

  // const exitFullScreen = () => {
  //   setIsFullScreen(false);

  //   setTimeout(() => {
  //     if (emblaApi && currentIndex != null) {
  //       emblaApi.scrollTo(currentIndex, true); // jump instantly to the same index
  //     }
  //   }, 0);
  // };

  const handleDotClick = (idx: number) => {
    scrollTo(idx);
    setIsFullScreen(false);
    setIsGridView(false);
  };

  const handleGridToggle = () => {
    setIsGridView((prev) => !prev);
  };

  return (
    <div className="embla h-full w-full">
      {/* Main carousel viewport */}

      {isFullScreen && isEmblaReady ? (
        // Fullscreen single image
        <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
          <ProjectImage
            src={`https://<your-project>.vercel-storage.com/${images[currentIndex]}`}
            alt="Fullscreen"
            width={1920}
            height={1080}
            className="max-w-full max-h-full object-contain"
            priority={false}
          />
        </div>
      ) : !isExitingFullscreen ? (
        // Regular Carousel
        <div className="embla__viewport w-full h-full" ref={emblaRef}>
          <div className="embla__container w-full h-full flex relative">
            {images.map((file, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                className="embla__slide w-full h-full flex-[0_0_100%] min-w-0 bg-black flex items-center justify-center"
              >
                <ProjectImage
                  src={`/projects/${project}/${file}`}
                  alt={file}
                  width={1080}
                  height={1080}
                  priority={idx === 0}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Grid View */}
      {isGridView && (
        <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
          <div
            className="w-full h-full grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${activeLayout.cols}, 1fr)`,
              gridTemplateRows: `repeat(${activeLayout.rows}, 1fr)`,
            }}
          >
            {images.map((file, idx) => {
              const span = spans[idx] || {};
              const colSpan = span.colSpan ? `col-span-${span.colSpan}` : "";
              const rowSpan = span.rowSpan ? `row-span-${span.rowSpan}` : "";

              return (
                <div
                  key={idx}
                  onClick={() => {
                    scrollTo(idx);
                    setIsGridView(false);
                  }}
                  className={`relative w-full h-full overflow-hidden cursor-pointer ${colSpan} ${rowSpan}`}
                >
                  <ProjectImage
                    src={`/projects/${project}/${file}`}
                    alt={`Thumbnail ${idx}`}
                    fill
                    width={1080}
                    height={1080}
                    className="absolute inset-0 w-full h-full object-cover"
                    priority={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ProjectControls
        currentIndex={currentIndex ?? 0}
        projectTitle={project}
        projectSubtitle={subtitle}
        images={images}
        onPrev={scrollPrev}
        onNext={scrollNext}
        onPlayPause={togglePlay}
        onDotClick={handleDotClick}
        isPlaying={isPlaying}
        onGridToggle={handleGridToggle}
        isGridView={isGridView}
        isFullScreen={isFullScreen}
        handleFullScreenToggle={handleFullScreenToggle}
        onExitGrid={() => setIsGridView(false)}
      />
    </div>
  );
}
