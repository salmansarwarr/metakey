import React from "react";
import StyledProgress, { Bar } from "./StyledProgress";
import ProgressBunnyWrapper from "./ProgressBunnyWrapper";
import { ProgressBunny } from "../Svg";
import { ProgressProps, variants, scales } from "./types";

const stepGuard = (step: number) => {
  if (step < 0) {
    return 0;
  }

  if (step > 100) {
    return 100;
  }

  return step;
};

const Progress: React.FC<React.PropsWithChildren<ProgressProps>> = ({
  variant = variants.ROUND,
  scale = scales.MD,
  primaryStep = 0,
  secondaryStep = null,
  showProgressBunny = false,
  useDark = true,
  children,
}) => {
  // Ensure StyledProgress accepts children in its props typing
  const Container = StyledProgress as unknown as React.ComponentType<
    React.PropsWithChildren<{ $useDark: boolean; variant: typeof variants[keyof typeof variants]; scale: typeof scales[keyof typeof scales] }>
  >;
  const BunnyWrapper = ProgressBunnyWrapper as unknown as React.ComponentType<
    React.PropsWithChildren<React.ComponentProps<typeof ProgressBunnyWrapper>>
  >;

  return (
    <Container $useDark={useDark} variant={variant} scale={scale}>
      {children || (
        <>
          {showProgressBunny && (
            <BunnyWrapper style={{ left: `${stepGuard(primaryStep)}%` }}>
              <ProgressBunny />
            </BunnyWrapper>
          )}
          {(Bar as any)({ $useDark: useDark, primary: true, style: { width: `${stepGuard(primaryStep)}%` } })}
          {secondaryStep ? (Bar as any)({ $useDark: useDark, style: { width: `${stepGuard(secondaryStep)}%` } }) : null}
        </>
      )}
    </Container>
  );
};

export default Progress;
