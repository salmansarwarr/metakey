import { ReactNode } from "react";

export interface BunnyProps {
  position: number;
  iterations: number;
  duration: number;
  children?: ReactNode;
}

export interface FallingBunniesProps {
  size?: number;
  count?: number;
  iterations?: number;
  duration?: number;
}
