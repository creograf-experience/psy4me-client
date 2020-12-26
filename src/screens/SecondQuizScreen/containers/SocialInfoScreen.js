import React, { PureComponent } from 'react';

import {
  SocialInfoScreenWrapper,
  HintTextWrapper,
  UntouchableAnswerWrapper as AnswerWrapper,
  ButtonWrapper,
} from '../components';
import {
  Button,
  SingleField,
} from '../../../containers';
import {
  HintText,
} from '../../../components';

import { strings } from "../../../../locale/i18n";

type Props = {};

export class SocialInfoScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);

    const { socialNetworks } = this.props;
    const { vk, facebook, instagram } = socialNetworks;

    this.state = {
      disabled: false,
      socialNetworks: { vk, facebook, instagram },
    };
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { socialNetworks } = this.state;

    onReturn(socialNetworks);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { socialNetworks } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    onChange(socialNetworks);
  };

  handleChangeInput = (fieldName, text) => {
    const { socialNetworks } = this.state;

    this.setState({
      socialNetworks: {
        ...socialNetworks,
        [fieldName]: text,
      },
    });
  };

  render() {
    const { disabled, socialNetworks } = this.state;
    const { vk, facebook, instagram } = socialNetworks;

    return (
      <SocialInfoScreenWrapper>
        <HintTextWrapper>
          <HintText>
            {strings("secondQuiz.social")}
          </HintText>
        </HintTextWrapper>

        <AnswerWrapper>
          <SingleField
            icon="vkIcon"
            placeholder="ВКонтакте"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={vk}
            onChange={text => this.handleChangeInput('vk', text)}
          />
          <SingleField
            icon="facebookIcon"
            placeholder="Facebook"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={facebook}
            onChange={text => this.handleChangeInput('facebook', text)}
          />
          <SingleField
            icon="instagramIcon"
            placeholder="Instagram"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={instagram}
            onChange={text => this.handleChangeInput('instagram', text)}
          />
        </AnswerWrapper>

        <ButtonWrapper>
          <Button
            disabled={disabled}
            text={strings("firstQuiz.next")}
            type="primary"
            onPress={this.onPress}
          />
        </ButtonWrapper>
      </SocialInfoScreenWrapper>
    );
  }
}

SocialInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
