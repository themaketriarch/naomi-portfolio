import { Breakpoint } from "@/types/types";
import { useEffect, useState } from "react";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("base");

  useEffect(() => {
    const mediaQueries = {
      sm: window.matchMedia("(max-width: 639px)"),
      md: window.matchMedia("(min-width: 640px) and (max-width: 767px)"),
      lg: window.matchMedia("(min-width: 768px) and (max-width: 1023px)"),
      xl: window.matchMedia("(min-width: 1024px)"),
    };

    const getCurrent = (): Breakpoint => {
      if (mediaQueries.sm.matches) return "sm";
      if (mediaQueries.md.matches) return "md";
      return "base";
    };

    const update = () => setBreakpoint(getCurrent());

    // Initial check
    update();

    // Add listeners
    Object.values(mediaQueries).forEach((mq) =>
      mq.addEventListener("change", update)
    );

    return () => {
      Object.values(mediaQueries).forEach((mq) =>
        mq.removeEventListener("change", update)
      );
    };
  }, []);

  return breakpoint;
}
