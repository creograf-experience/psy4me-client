import styled from 'styled-components';


export const HeaderWrapper = styled.View`
  height:60;
  width: 90%;
  align-self: center;
`;

export const LeftHeaderWrapper = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const CentralHeaderWrapper = styled(LeftHeaderWrapper)`
  flex: 2;
  align-items: center;
`;

export const RightHeaderWrapper = styled(LeftHeaderWrapper)`
  align-items: flex-end;
`;
