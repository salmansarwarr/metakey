import React from "react";
import { PancakeStack, PancakeInput, PancakeLabel } from "./StyledPancakeToggle";
import { PancakeToggleProps, scales } from "./types";

const Stack = PancakeStack as unknown as React.FC<React.PropsWithChildren<{ scale: typeof scales[keyof typeof scales] }>>;

const PancakeToggle: React.FC<React.PropsWithChildren<PancakeToggleProps>> = ({
  checked,
  scale = scales.LG,
  ...props
}) => (
  <Stack scale={scale}>
    <PancakeInput id={props.id || "pancake-toggle"} scale={scale} type="checkbox" {...props} />
    <PancakeLabel scale={scale} checked={checked}>
      <div className="pancakes">
        <div className="pancake" />
        <div className="pancake" />
        <div className="pancake" />
        <div className="butter" />
      </div>
    </PancakeLabel>
  </Stack>
);

export default PancakeToggle;
