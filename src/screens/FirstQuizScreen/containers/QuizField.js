import React from 'react';
import { Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import {
  QuizInputWrapper,
  QuizFieldWrapper,
} from '../components';
import {
  PlaceholderText,
  Line,
  PointerHandlerWrapper,
  ErrorTextAbsolute,
  OptionListWrapper,
  PlainText,
} from '../../../components';
import {
  RadioButton,
  OptionList,
  DatePicker,
  RightAlignedField,
  ExclamationError,
} from '../../../containers';

import { strings } from "../../../../locale/i18n";


const inputTypes = {
  text: (onChange, _, value) => (
    <RightAlignedField
      autoCorrect={false}
      onChange={onChange}
      value={value}
    />
  ),

  email: (onChange, _, value) => (
    <RightAlignedField
      autoCorrect={false}
      autoCapitalize='none'
      keyboardType='email-address'
      onChange={onChange}
      value={value}
    />
  ),

  number: (onChange, _, value) => (
    <RightAlignedField
      keyboardType='number-pad'
      onChange={onChange}
      maxLength={6}
      value={value}
    />
  ),

  phoneNumber: (onChange, _, value) => (
    <RightAlignedField
      keyboardType="number-pad"
      onChange={onChange}
      value={value}
    />
  ),

  list: (onChange, options, value, placeholder) => (
    <OptionList
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder.slice(0, placeholder.length - 1)}
    />
  ),

  datePicker: (onChange, _, value) => (
    <DatePicker
      onChange={onChange}
      value={value}
    />
  ),

  radio: (onChange, _, value) => (
    <RadioButton
      options={[strings("firstQuiz.gender1"), strings("firstQuiz.gender2")]}
      value={value}
      onChange={onChange}
    />
  ),

  empty: () => (
    <OptionListWrapper />
  ),

  immutable: (onChange, options, value) => (
    <PlainText>
      {value}
    </PlainText>
  ),
};

const onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
  if (keyValue === 'Enter') {
    Keyboard.dismiss();
  }
};


export const QuizField = ({
    type,
    placeholder,
    onChange,
    options,
    value,
    error,
  }) => (
  <QuizFieldWrapper activeOpacity={1}>
    <QuizInputWrapper>
      <PointerHandlerWrapper pointerEvents='none'>
        <PlaceholderText>
          {placeholder}
        </PlaceholderText>
      </PointerHandlerWrapper>
      { error && <ExclamationError error={error} /> }
      {inputTypes[type](onChange, options, value, placeholder)}
    </QuizInputWrapper>

    <Line />
  </QuizFieldWrapper>
);

QuizField.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  options: PropTypes.arrayOf(),
  disabled: PropTypes.bool,
};

QuizField.defaultProps = {
  placeholder: 'Text',
  onChange: () => {},
  type: 'empty',
  options: [],
  disabled: false,
};
