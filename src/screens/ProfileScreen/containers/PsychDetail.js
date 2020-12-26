import React from 'react';
import {
  Card,
  Avatar,
  // Button,
  Paragraph,
} from 'react-native-paper';

import { Button } from '../../../containers';
import { ButtonWrapper } from '../../SecondQuizScreen/components';
import { strings } from "../../../../locale/i18n";

this.state = {
  psych: {},
};

export const PsychDetail = ({ item }) => {
  const {
    lastName, firstName, middleName, country, phoneMask, email,
  } = item;
  const psychName = `${lastName} ${firstName[0]}. ${middleName[0]}.`;
  return (
    <Card>
      <Card.Title title={psychName} subtitle={country} left={props => <Avatar.Icon {...props} icon="folder" />} />
      <Card.Content>
        <Paragraph>{phoneMask}</Paragraph>
        <Paragraph>{email}</Paragraph>
      </Card.Content>
      <ButtonWrapper>
        <Button
          // disabled={disabled}
          text={strings("yourPsych.BookApp")}
          type="secondary"
          onPress={() => {}}
        />
      </ButtonWrapper>
    </Card>

  );
};

export default PsychDetail;
