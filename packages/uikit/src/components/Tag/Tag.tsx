import React from "react";
import { scales, TagProps } from "./types";
import { StyledTag } from "./StyledTag";

const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({ startIcon, endIcon, children, ...props }) => (
  <StyledTag {...props}>
    {React.isValidElement(startIcon) && (
      <span style={{ marginRight: "0.5em" }}>{startIcon}</span>
    )}
    {children}
    {React.isValidElement(endIcon) && (
      <span style={{ marginLeft: "0.5em" }}>{endIcon}</span>
    )}
  </StyledTag>
);

/* eslint-disable react/default-props-match-prop-types */
Tag.defaultProps = {
  variant: "primary",
  scale: scales.MD,
  outline: false,
};

export default Tag;
