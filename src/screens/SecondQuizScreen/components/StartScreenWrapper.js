import styled from 'styled-components';

export const StartScreenWrapper = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

export const ConsultInfoScreenWrapper = styled(StartScreenWrapper)`
  justify-content: flex-end;
`;

export const PsychoHelpScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const DepressionInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const MedicineInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const AdditionalInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const WorkingStyleScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const SocialInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;
