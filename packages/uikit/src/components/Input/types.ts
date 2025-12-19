import { ReactElement, InputHTMLAttributes, Ref } from "react";
import { SpaceProps } from "styled-system";

export const scales = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type Scales = typeof scales[keyof typeof scales];

export interface InputProps extends SpaceProps, InputHTMLAttributes<HTMLInputElement> {
  scale?: Scales;
  isSuccess?: boolean;
  isWarning?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export interface InputGroupProps extends SpaceProps {
  scale?: Scales;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  children: JSX.Element;
}
