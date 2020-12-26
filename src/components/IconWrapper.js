import styled from 'styled-components';

export const IconWrapper = styled.View`
  aspect-ratio: ${props => (props.acpectRatio ? props.acpectRatio : 1)};
  align-items: center;
  justify-content: center;
  margin-left: 10;
  margin-right: 10;
`;
