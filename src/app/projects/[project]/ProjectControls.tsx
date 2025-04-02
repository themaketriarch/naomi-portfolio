"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import {
  PrevButton,
  NextButton,
  PlayPauseButton,
  HomeButton,
  FullscreenButton,
  GridViewButton,
  ProgressDots,
} from "./CarouselButtons";

interface ProjectControlsProps {
  projectTitle: string;
  projectSubtitle?: string;
  images: string[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onDotClick: (index: number) => void;
  isPlaying: boolean;
  onGridToggle: () => void;
  handleFullScreenToggle: () => void;
  isFullScreen: boolean;
  onExitGrid?: () => void;
  isGridView: boolean;
}

export function ProjectControls({
  projectTitle,
  projectSubtitle,
  images,
  currentIndex,
  onPrev,
  onNext,
  onPlayPause,
  onDotClick,
  isPlaying,
  handleFullScreenToggle,
  onGridToggle,
  isFullScreen,
  onExitGrid,
  isGridView,
}: ProjectControlsProps) {
  const breakpoint = useBreakpoint();

  return (
    <div className="absolute bottom-0 w-full z-200000">
      {/* Control Buttons */}

      <div
        className={`flex justify-center pointer-events-auto ${
          breakpoint === "sm"
            ? "gap-2 pb-4"
            : breakpoint === "md"
            ? "gap-3 pb-8"
            : "gap-4 pb-12"
        }`}
      >
        <HomeButton onClick={() => (window.location.href = "/")} />
        <PrevButton onClick={onPrev} />
        <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} />
        <NextButton onClick={onNext} />
        <GridViewButton onClick={onGridToggle} />
        <FullscreenButton
          isFullScreen={isFullScreen}
          isGridView={isGridView}
          onToggle={handleFullScreenToggle}
        />
      </div>

      {/* Progress Dots */}
      <ProgressDots
        count={images.length}
        currentIndex={currentIndex}
        onDotClick={onDotClick}
        exitGrid={onExitGrid}
        breakpoint={breakpoint}
      />

      {/* Project Title & Subtitle */}
      <div
        className={`flex flex-col items-center ${
          breakpoint === "sm" ? "p-4" : "p-8"
        }`}
      >
        <h1
          className={`${
            breakpoint === "sm"
              ? "text-2xl"
              : breakpoint === "md"
              ? "text-3xl"
              : "text-4xl"
          } font-bold`}
        >
          {projectTitle}
        </h1>
        {projectSubtitle && (
          <h2
            className={`${
              breakpoint === "sm" ? "text-base" : "text-xl"
            } mt-2 opacity-80`}
          >
            {projectSubtitle}
          </h2>
        )}
      </div>
    </div>
  );
}
