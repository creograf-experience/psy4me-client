import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { scale, moderateScale } from 'react-native-size-matters';
import { StyleSheet, Platform } from 'react-native';


import {
  OptionListWrapper,
  PlaceholderText,
  Line
} from '../components';
import { IconContainer } from './IconContainer';
import { colors } from '../constants';


type Props = {};

export class OptionList extends PureComponent<Props> {
  state = {
    selectedOption: this.props.value || 'Выберите...',
    visible: false,
  };

  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = selectedOption => {
    this.setState({
      selectedOption:selectedOption.label,
      visible: false
    });

    this.props.onChange(selectedOption.label);
  }

  onCancel = () => {
    this.setState({ visible: false });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      selectedOption: newProps.value ? newProps.value : 'Выберите...',
    });
  }

  render() {
    const { visible, selectedOption } = this.state;
    const { options, placeholder } = this.props;
    return (
      <OptionListWrapper
        onPress={this.onShow}
      >
        <PlaceholderText style={{textAlign: 'right'}}>
          {selectedOption}
        </PlaceholderText>
        <IconContainer
          name='selectArrowIcon'
          size={10}
        />

        <ModalFilterPicker
          visible={visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={options}
          title={placeholder}
          placeholderText={'Поиск'}
          cancelButtonText={'Отмена'}
          noResultsText={'Нет совпадений'}
          listContainerStyle={styles.listContainerStyle}
          filterTextInputContainerStyle={styles.filterTextInputContainerStyle}
          optionTextStyle={styles.optionTextStyle}
          cancelButtonStyle={styles.cancelButtonStyle}
          cancelButtonTextStyle={styles.cancelButtonTextStyle}
          listViewProps={
            {
              style: styles.listViewStyle,
              renderSeparator: (sectionID, rowID) => {
                return (
                  <Line
                    key={rowID}
                  />
                );
              }
            }
          }
        />
      </OptionListWrapper>
    );
  }
}


OptionList.defaultProps = {
  options: [],
  disabled: false,
};

const styles = StyleSheet.create({
  listContainerStyle: {
    borderRadius: Platform.OS === 'ios' ? 30 : 0,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: colors.colorPrimary,
    flex: 1,
    width: scale(300),
    maxHeight: '70%',
    backgroundColor: colors.background,
    marginBottom: 15
  },

  filterTextInputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.colorPrimary,
  },

  optionTextStyle: {
    flex: 1,
    textAlign: 'left',
    color: colors.textColorPrimary,
    fontSize: moderateScale(16),
  },

  cancelButtonStyle: {
    width: scale(300),
    paddingVertical: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorPrimary,
    borderRadius: scale(20),
  },

  cancelButtonTextStyle: {
    textAlign: 'center',
    fontSize: scale(16),
    color: colors.buttonTextPrimary,
  },

  listViewStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
