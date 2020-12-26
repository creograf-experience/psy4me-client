import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SegmentedControls } from 'react-native-radio-buttons';

import { RadioButtonWrapper } from '../components';
import { colors } from '../constants';

type Props = {};

export class RadioButton extends PureComponent<Props> {
  state = {
    selectedOption: this.props.options[this.props.options.indexOf(this.props.value)],
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onChange(selectedOption);
  }

  render() {
    return (
      <RadioButtonWrapper>
        <SegmentedControls
          tint={colors.colorPrimary}
          backTint={colors.transparentColorPrimary}
          selectedTint={colors.background}
          selectedBackgroundColor={colors.colorPrimary}
          options={this.props.options}
          onSelection={this.handleChange}
          selectedOption={this.state.selectedOption}
          optionContainerStyle={{flex: 1}}
        />
      </RadioButtonWrapper>
    );
  }
}


RadioButton.defaultProps = {
  options: [ 'М', 'Ж' ],
};
