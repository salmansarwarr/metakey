import { StyledAnimatedIconComponent, StyledIconContainer } from "./styles";
import { IconComponentType } from "./types";

const StyledAnimatedIconComponentWithChildren =
  StyledAnimatedIconComponent as unknown as React.ComponentType<
    React.ComponentProps<typeof StyledAnimatedIconComponent> & { children?: React.ReactNode }
  >;

const StyledIconContainerWithChildren =
  StyledIconContainer as unknown as React.ComponentType<
    React.ComponentProps<typeof StyledIconContainer> & { children?: React.ReactNode }
  >;

const AnimatedIconComponent: React.FC<React.PropsWithChildren<IconComponentType>> = ({
  icon,
  fillIcon,
  color = "textSubtle",
  activeColor = "secondary",
  activeBackgroundColor,
  isActive = false,
  ...props
}) => {
  const IconElement = icon;
  const IconElementFill = fillIcon;
  return IconElement ? (
    <StyledAnimatedIconComponentWithChildren isActive={isActive} hasFillIcon={!!IconElementFill} {...props}>
      <StyledIconContainerWithChildren activeBackgroundColor={activeBackgroundColor}>
        <IconElement color={color} />
      </StyledIconContainerWithChildren>
      {!!IconElementFill && (
        <StyledIconContainerWithChildren activeBackgroundColor={activeBackgroundColor} {...props}>
          <IconElementFill color={activeColor} />
        </StyledIconContainerWithChildren>
      )}
    </StyledAnimatedIconComponentWithChildren>
  ) : null;
};

export default AnimatedIconComponent;
