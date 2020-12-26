import React, { PureComponent } from 'react';
import {Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { moderateScale } from 'react-native-size-matters';

import {
  TimePickerWrapper,
} from '../components';


type Props = {};

export class TimePicker extends PureComponent<Props> {
  constructor(props) {
    super(props);

    const {
      hour,
      startTime,
      endTime,
    } = this.props;

    this.state = {
      hour: hour || 0,
      startTime,
      endTime,
    };

    this.makeTimeList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //this.makeTimeList(nextProps);

    if (nextProps) {
      const {
        index,
        startTime,
        endTime,
      } = nextProps;

      this.setState({
        hour: index ? endTime : startTime,
      });
    }
  }

  makeTimeList = (nextProps) => {
    const {
      index,
      startTime,
      endTime,
    } = nextProps || this.props;

    this.time = [];

    if (!index) {
      for (let nextHour = 0; nextHour < endTime; nextHour += 1) {
        let hourString;
        if (nextHour.toString().length === 1) {
          hourString = `0${nextHour}`;
        } else {
          hourString = `${nextHour}`;
        }

        const timeString = `${hourString}:00`;
        this.time.push({
          label: timeString,
          value: timeString,
        });
      }
    } else {
      for (let nextHour = startTime + 1; nextHour < 24; nextHour += 1) {
        let hourString;
        if (nextHour.toString().length === 1) {
          hourString = `0${nextHour}`;
        } else {
          hourString = `${nextHour}`;
        }

        const timeString = `${hourString}:00`;
        this.time.push({
          label: timeString,
          value: timeString,
        });
      }
    }
  };

  render() {
    const { hour } = this.state;
    let hourString;

    if (hour.toString().length === 1) {
      hourString = `0${hour}`;
    } else {
      hourString = `${hour}`;
    }

    return (
      <TimePickerWrapper
        onPress={() => this.picker.togglePicker()}
        style={[(Platform.OS === 'android') ? {paddingHorizontal: 10, paddingVertical: 7} : null]}
      >
        <RNPickerSelect
          onValueChange={(time) => {
            if (time) {
              const { onChange } = this.props;
              const newHour = parseInt(time.slice(0, 2), 10);
              const { startTime, endTime, index } = this.state;

              onChange(newHour);

              this.setState({
                hour: newHour,
                startTime: !index ? newHour : startTime,
                endTime: index ? newHour : endTime,
              //}, this.makeTimeList);
            });
            }
          }}
          style={{
            inputIOS: {
              fontSize: moderateScale(18),
            },
            inputAndroid: {
              fontSize: moderateScale(20),
              paddingRight: 29,
              paddingLeft: 6,
            },
          }}
          placeholder={{}}
          hideIcon
          value={`${hourString}:00`}
          ref={(ref) => {
            this.picker = ref;
          }}
          useNativeAndroidPickerStyle={false}
          items={this.time}
        />
      </TimePickerWrapper>
    );
  }
}

TimePicker.defaultProps = {};
