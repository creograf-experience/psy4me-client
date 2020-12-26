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
} from '../../../components';
import { colors } from '../../../constants';
import { View } from 'react-native';


type Props = {}

export class NewCheck extends PureComponent{
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
      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        <View style={{flex:1}}>
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
        </View>

        <View style={{flex:6}}>
          <PlainText>
            {this.props.text}
          </PlainText>
        </View>
      </View>
    );
  }
}


NewCheck.defaultProps = {
  text: 'Text',
  onPress: () => {},
  index: 0,
};