"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  PauseIcon,
  HomeIcon,
  ArrowsPointingOutIcon,
  Squares2X2Icon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface ProgressDotsProps {
  count: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  exitGrid?: () => void; // optional for fallback
  breakpoint: "sm" | "md" | "base";
}

interface FullscreenButtonProps {
  isFullScreen: boolean;
  isGridView: boolean;
  onToggle: () => void;
}

type ButtonProps = {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
};

export function PrevButton({ onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all`}
      aria-label="Previous image"
    >
      <ArrowLeftIcon className="w-6 h-6 text-white" />
    </button>
  );
}

export function NextButton({ onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all`}
      aria-label="Next image"
    >
      <ArrowRightIcon className="w-6 h-6 text-white" />
    </button>
  );
}

export function PlayPauseButton({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? (
        <PauseIcon className="w-6 h-6 text-white" />
      ) : (
        <PlayIcon className="w-6 h-6 text-white" />
      )}
    </button>
  );
}

export function HomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
      aria-label="Home"
    >
      <HomeIcon className="w-6 h-6 text-white" />
    </button>
  );
}

export function FullscreenButton({
  isFullScreen,
  isGridView,
  onToggle,
}: FullscreenButtonProps) {
  const Icon = isFullScreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon;

  return (
    <button
      onClick={!isGridView ? onToggle : undefined}
      disabled={isGridView}
      className={`rounded-full p-3 transition-all ${
        isGridView
          ? "bg-black/30 cursor-not-allowed opacity-50"
          : "bg-black/50 hover:bg-black/70"
      }`}
      aria-label="Toggle Fullscreen"
    >
      <Icon
        className={`w-6 h-6 ${isGridView ? "text-gray-400" : "text-white"}`}
      />
    </button>
  );
}

export function GridViewButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
      aria-label="Grid view"
    >
      <Squares2X2Icon className="w-6 h-6 text-white" />
    </button>
  );
}

export function DotButton({ onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} hover:scale-110 transition-all`}
      aria-label="Go to slide"
    />
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute rounded-xl bottom-4 left-32 right-32  h-3 bg-gray-800/50">
      <div
        className="h-full rounded-xl bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ProgressDots({
  count,
  currentIndex,
  onDotClick,
  exitGrid,
  breakpoint,
}: ProgressDotsProps) {
  const progress = (currentIndex / (count - 1)) * 100;

  return (
    <div
      className={`relative ${breakpoint === "sm" ? "mx-16" : "mx-32"} ${
        breakpoint === "sm" ? "mt-2 mb-4" : "mt-4 mb-8"
      } h-6`}
    >
      {/* Progress bar background */}
      <div
        className={`absolute inset-y-1.5 left-0 right-0 bg-gray-800/50 rounded-xl ${
          breakpoint === "sm" ? "h-2" : "h-3"
        } z-0`}
      />

      {/* Progress fill */}
      <div
        className={`absolute inset-y-1.5 left-0 bg-blue-500 rounded-xl ${
          breakpoint === "sm" ? "h-2" : "h-3"
        } transition-all duration-300 z-100`}
        style={{ width: `${progress}%` }}
      />

      {/* Dots */}
      <div className="relative flex justify-between items-center h-full z-2000">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              onDotClick(index);
              exitGrid?.();
            }}
            className={`${
              breakpoint === "sm" ? "w-4 h-4" : "w-5 h-5"
            } rounded-full transition-all border-2 ${
              index <= currentIndex
                ? "bg-blue-500 border-white"
                : "bg-pink-300 border-pink-300 hover:bg-pink-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
