import styled from 'styled-components';


export const HintTextWrapper = styled.View`
  flex: 1;
  width: 90%;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 10;
  margin-bottom: 15;
`;

export const ButtonWrapper = styled(HintTextWrapper)`
  flex: 2;
  width: null;
`;

export const BottomButtonWrapper = styled(ButtonWrapper)`
  justify-content: flex-end;
`;

export const ButtonPsychWrapper = styled(HintTextWrapper)`
  width: null;
  margin-bottom: 5;
`;

export const HintPsychTextWrapper = styled(HintTextWrapper)`
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 60;
`;
