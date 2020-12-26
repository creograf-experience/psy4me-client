import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  CheckButtonWrapper,
  CheckTextWrapper,
  CheckWrapper,
  CheckBorder,
  PickedCheckBorder,
  PickMark,
  PlainText
} from '../components';
import { colors } from '../constants';

export class CheckButton extends PureComponent {
  state = {
    picked: !!this.props.picked,
  }

  changeCheck = () => {
    var { picked } = this.state;

    this.setState({ picked: !picked })
    this.props.onPress(!picked, this.props.text, this.props.index);
  }

  render() {
    return (
      <CheckButtonWrapper>
        <CheckWrapper>
          {
            this.state.picked
              ? (
                  <PickedCheckBorder
                    onPress={this.changeCheck}
                  >
                    <PickMark />
                  </PickedCheckBorder>
              ) : (
                  <CheckBorder
                    onPress={this.changeCheck}
                  />
              )
          }
        </CheckWrapper>

        <CheckTextWrapper>
          <PlainText>
            {this.props.text}
          </PlainText>
        </CheckTextWrapper>
      </CheckButtonWrapper>
    );
  }
}


CheckButton.defaultProps = {
  text: 'Text',
  onPress: () => {},
  index: 0,
};
