import React, { PureComponent } from 'react';
import { Modal } from 'react-native';

import { ContentWrapper, Line, ErrorText } from '../../../components';
import { Header, CheckButton, Button } from '../../../containers';
import { CheckListWrapper, ButtonContainer } from '../components';

import { strings } from "../../../../locale/i18n";


type Props = {};

export class ModalAgreements extends PureComponent<Props> {
  state = {
    firstChosen: false,
    secondChosen: false,
    thirdChosen: false,
  };

  render() {
    var {
      firstChosen,
      secondChosen,
      thirdChosen,
    } = this.state;

    return (
      <Modal
        animationType='slide'
        visible={this.props.visible}
        onRequestClose={this.props.onCancel}
      >
        <ContentWrapper>
          <Header
            leftText={strings("consultation.back")}
            title={strings("agreements.agreeTitle")}
            onLeftPress={this.props.onCancel}
          />
          <CheckListWrapper>
            <CheckButton
              text={strings("agreements.body1")}
              onPress={value => this.setState({ firstChosen: value })}
            />
            <CheckButton
              text={strings("agreements.body2")}
              onPress={value => this.setState({ secondChosen: value })}
            />
            <CheckButton
              text={strings("agreements.body3")}
              onPress={value => this.setState({ thirdChosen: value })}
            />

            <Line />

            <ErrorText>
              {'\n'}{strings("agreements.agreeRequired")}
            </ErrorText>
          </CheckListWrapper>

          <ButtonContainer>
            {
              firstChosen && secondChosen && thirdChosen
                ? <Button
                    type='primary'
                    text={strings("auth.authReg")}
                    onPress={this.props.onButtonPress}
                  />
                : <Button
                    type='secondary'
                    text={strings("auth.authReg")}
                    disabled
                  />
            }
          </ButtonContainer>
        </ContentWrapper>
      </Modal>
    );
  }
}

ModalAgreements.defaultProps = {
  visible: false,
  onCancel: () => {},
}
