import React from "react";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";

import { colors } from "../constants";

const SpinnerWrapper = styled.View`
  flex: 9;
  justify-content: center;
  align-items: center;
`;

export const Spinner = ({ size, color,backgroundColor }) => (
  <SpinnerWrapper style={{backgroundColor:backgroundColor}}>
    <ActivityIndicator size={size} color={color} />
  </SpinnerWrapper>
);

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
};

Spinner.defaultProps = {
  size: "large",
  color: colors.colorPrimary,
  backgroundColor:colors.background
};