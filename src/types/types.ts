import { breakpoints } from "@/constants/breakpoints";

export type Layout = {
  rows: number;
  cols: number;
  spans?: {
    [index: number]: { colSpan?: number; rowSpan?: number };
  };
};

export type LayoutsMap = {
  [projectName: string]: {
    base: Layout;
  } & {
    [key in Breakpoint]?: Layout;
  };
};

export type Breakpoint = (typeof breakpoints)[number]["name"] | "base";
