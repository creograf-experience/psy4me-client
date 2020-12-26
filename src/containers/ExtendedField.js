import React from 'react';
import PropTypes from 'prop-types';

import {
  ExtendedFieldWrapper,
  ExtendedFieldTitleWrapper,
  ExtendedFieldValueWrapper,
  PlaceholderText,
  PlainText,
  EducationsWrapper,
  DocumentsWrapper,
} from '../components';
import { AddButton } from './AddButton';
import { mediaHost } from '../constants';


const resolveType = (type, value, id, onPress) => {
  switch (type) {
  case 'string':
    return (
      <PlainText>
        {'\n'}
        {value}
      </PlainText>
    );
  case 'stringArray':
    return value.map((elem, index) => (
      <PlainText
        key={index}
      >
        {'\n'}
        {elem}
      </PlainText>
    ));
  case 'psychSelection':
    return value.map(item => (
      <PlainText>
        {'\n'}
        {item.lastName}
      </PlainText>
    ));
  case 'educations':
    return value.map(({ university, specialty, documents }, index) => (
      <EducationsWrapper
        key={index}
      >
        <PlainText
          key={-index}
        >
          {'\n'}
          {index + 1}
          {'. '}
          {university}
          {' / '}
          {specialty}
          {'\n'}
        </PlainText>
        <DocumentsWrapper
          contentContainerStyle={{
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          key={index}
        >
          {
            documents.map((_, docIndex) => (
              <AddButton
                key={docIndex}
                type="small"
                onPress={() => onPress(docIndex)}
                image={`${mediaHost}/psych/${id}/docs/docs${index}_${id}_${docIndex}.jpg`}
              />
            ))
          }
        </DocumentsWrapper>
      </EducationsWrapper>
    ));
  case 'schedule':
    return value.map(({ weekDay, startTime, endTime }, index) => (
      <PlainText
        key={index}
      >
        {'\n'}
        {weekDay}
        :
        {'\n'}
        {`${startTime.toString().length === 1 ? '0' : ''}${startTime}:00-${endTime.toString().length === 1 ? '0' : ''}${endTime}:00`}
      </PlainText>
    ));
  default:
    return null;
  }
};

export const ExtendedField = ({
  title,
  type,
  value,
  id,
  onPress,
}) => (
  <ExtendedFieldWrapper>
    <ExtendedFieldTitleWrapper>
      <PlaceholderText>
        {title}
      </PlaceholderText>
    </ExtendedFieldTitleWrapper>

    <ExtendedFieldValueWrapper>
      {
        resolveType(type, value, id, onPress)
      }
    </ExtendedFieldValueWrapper>
  </ExtendedFieldWrapper>
);
