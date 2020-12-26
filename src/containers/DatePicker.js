import React, { PureComponent } from 'react';
import {
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  Modal,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  OptionListWrapper,
  PlaceholderText,
  DatePickerWrapper,
} from '../components';
import { IconContainer } from './IconContainer';
import { Button } from './Button';
import moment from 'moment';
import 'moment/locale/ru';

type Props = {};

export class DatePicker extends PureComponent<Props> {
  constructor(props) {
    super(props);

    const {
      value,
    } = this.props;

    // const [day, month, year] = value ? value.split('.') : [null, null, null];

    this.state = {
      selectedOption: new Date(value) || new Date(),
      visible: false,
    };

    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date();
  }

  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = () => {
    this.setState({ visible: false });
    moment.locale('ru');
    const formatDate=moment(this.state.selectedOption).format('YYYY-MM-DDT12:00:00');
    this.props.onChange(formatDate);
  }

  onCancel = () => {
    this.setState({ visible: false });
  }

  renderAndroidDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
        minDate: this.minDate,
        maxDate: this.maxDate,
        mode: 'calendar',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        var selectedOption = new Date(year, month, day);
        this.onSelect(selectedOption);
        this.setState({ selectedOption });
        this.onSelect(selectedOption);
      } else {
        this.onCancel();
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  renderIOSDatePicker = () => (
    <Modal
      visible={this.state.visible}
    >
      <DatePickerWrapper>
        {/* <DatePickerIOS
          date={this.state.selectedOption}
          onDateChange={selectedOption => this.setState({ selectedOption })}
          mode="date"
          minimumDate={this.minDate}
          maximumDate={this.maxDate}
        /> */}
        <DateTimePicker
          value={this.state.selectedOption}
          onChange={(event, selectedOption) => this.setState({ selectedOption })}
          mode="date"
          minimumDate={this.minDate}
          maximumDate={this.maxDate}
          locale="ru"
        />
        <Button
          type="primary"
          text="Установить дату"
          onPress={this.onSelect}
        />
      </DatePickerWrapper>
    </Modal>
  );

  render() {
    const { selectedOption, visible } = this.state;
    const day = selectedOption.getDate().toString();
    const month = (selectedOption.getMonth() + 1).toString();
    const year = selectedOption.getFullYear();

    if (visible && Platform.OS === 'android') {
      this.renderAndroidDatePicker();
    }

    return (
      <OptionListWrapper
        onPress={this.onShow}
      >
        <PlaceholderText style={{ textAlign: 'right' }}>
          {`${day.length === 1 ? '0' : ''}${day}.${month.length === 1 ? '0' : ''}${month}.${year}`}
        </PlaceholderText>
        <IconContainer
          name="selectArrowIcon"
          size={10}
        />

        {
          visible && Platform.OS === 'ios' && this.renderIOSDatePicker()
        }
      </OptionListWrapper>
    );
  }
}

DatePicker.defaultProps = {
  onPress: () => {},
};
