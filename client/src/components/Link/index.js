import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";

let LinkButton = props => (
  <Button
    color="primary"
    disableRipple
    component={Link}
    {...props}
    style={{ ...{ minWidth: "initial" }, ...props.style }}
  />
);

export const StyledLink = styled(LinkButton)`
  text-decoration: none !important;
  cursor: pointer;
  padding: 0 !important;
  &:hover {
    background: transparent !important;
  }
  > * {
    padding: 0 !important;
    justify-content: left !important;
  }
`;

export const BaseStyledLink = styled(Link)`
  text-decoration: none;
`;