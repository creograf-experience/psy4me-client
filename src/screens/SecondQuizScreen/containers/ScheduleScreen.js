import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  Button,
} from '../../../containers';
import {
  HintText,
  PlainText,
  LargePlainText,
  BlueBodyText, PointerHandlerWrapper,
} from '../../../components';
import {
  ScheduleScreenWrapper,
  HintTextWrapper,
  AnswerWrapper,
  ButtonWrapper,
  ScheduleWrapper,
  WeekDataWrapper,
  TimeWrapper,
  DaysWrapper,
  InfoWrapper,
  UnpickedDayWrapper,
  PickedDayWrapper,
} from '../components';
import {
  TimePicker,
} from '.';
import { colors } from '../../../constants';

import { strings } from "../../../../locale/i18n";

export class ScheduleScreen extends PureComponent {
  constructor(props) {
    super(props);

    const { schedule } = this.props;
    const {
      weekDay,
      startTime,
      endTime,
    } = schedule[schedule.length - 1];

    this.state = {
      disabled: false,
      schedule: {
        weekDay,
        startTime,
        endTime,
      },
      dayList: schedule,
      visible: true,
    };

    this.shortDays = [
      strings("secondQuiz.sMonday"),
      strings("secondQuiz.sTuesday"),
      strings("secondQuiz.sWednesday"),
      strings("secondQuiz.sThursday"),
      strings("secondQuiz.sFriday"),
      strings("secondQuiz.sSaturday"),
      strings("secondQuiz.sSunday")
    ];

    this.days = [
      strings("secondQuiz.monday"),
      strings("secondQuiz.tuesday"),
      strings("secondQuiz.wednesday"),
      strings("secondQuiz.thursday"),
      strings("secondQuiz.friday"),
      strings("secondQuiz.saturday"),
      strings("secondQuiz.sunday"),
    ];

    this.dayButtons = [
      index => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[0])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[0]}
          </PlainText>
        </UnpickedDayWrapper>
      ),
      index => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[1])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[1]}
          </PlainText>
        </UnpickedDayWrapper>
      ),
      index => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[2])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[2]}
          </PlainText>
        </UnpickedDayWrapper>
      ),
      index => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[3])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[3]}
          </PlainText>
        </UnpickedDayWrapper>
      ),
      index => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[4])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[4]}
          </PlainText>
        </UnpickedDayWrapper>
      ),
      index => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[5])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[5]}
          </PlainText>
        </UnpickedDayWrapper>
      ),
      index => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[6])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[6]}
          </PlainText>
        </UnpickedDayWrapper>
      ),
    ];
  }

  componentWillMount() {
    const { schedule } = this.state;
    const { weekDay } = schedule;

    if (weekDay) {
      const index = this.days.indexOf(weekDay);
      this.dayButtons[index] = () => (
        <PickedDayWrapper
          key={index}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[index]}
          </PlainText>
        </PickedDayWrapper>
      );
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { schedule } = this.state;
    const { weekDay } = schedule;
    const newWeekDay = nextState.schedule.weekDay;

    if (weekDay !== newWeekDay) {
      const index = this.days.indexOf(weekDay);
      const newIndex = this.days.indexOf(newWeekDay);

      this.dayButtons[newIndex] = () => (
        <PickedDayWrapper
          key={newIndex}
        >
          <PlainText
            key={newIndex}
          >
            {this.shortDays[newIndex]}
          </PlainText>
        </PickedDayWrapper>
      );

      this.dayButtons[index] = () => (
        <UnpickedDayWrapper
          key={index}
          onPress={() => this.onPick(this.days[index])}
        >
          <PlainText
            key={index}
          >
            {this.shortDays[index]}
          </PlainText>
        </UnpickedDayWrapper>
      );
    }
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { dayList } = this.state;

    onReturn(dayList);
  }

  onPick = (weekDay) => {
    const { schedule } = this.state;

    this.setState({
      schedule: {
        ...schedule,
        weekDay,
      },
    });
  };

  onPress = () => {
    const { onChange } = this.props;
    const { dayList } = this.state;
    const { weekDay } = dayList[0];
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (weekDay) {
      onChange(dayList);
    } else {
      showMessage({
        message: strings("secondQuiz.schedule"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  onAddDay = () => {
    const { onAdd } = this.props;
    const {
      schedule,
      dayList,
    } = this.state;
    const { weekDay } = schedule;

    const newDayList = [...dayList];

    if (weekDay) {
      // if (dayList.map(day => day.weekDay).indexOf(weekDay) >= 0) {
      //   showMessage({
      //     message: strings("secondQuiz.alreadySchedule"),
      //     type: 'danger',
      //     backgroundColor: colors.errorColor,
      //   });
      // } else 
      if (this.state.schedule.endTime <= this.state.schedule.startTime) {
        showMessage({
          message: strings("secondQuiz.wrongTime"),
          type: 'danger',
          backgroundColor: colors.errorColor,
        });
      }
      else {
        newDayList[newDayList.length - 1] = schedule;
        newDayList.push({
          weekDay: null,
          startTime: 0,
          endTime: 23,
        });

        this.setState({
          schedule: {
            weekDay: null,
            startTime: 0,
            endTime: 23,
          },
          dayList: newDayList,
        });
        onAdd(newDayList);
      }
    } else {
      showMessage({
        message: strings("secondQuiz.dayChoice"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const {
      disabled,
      schedule,
      visible,
      dayList,
    } = this.state;
    const {
      weekDay,
      startTime,
      endTime
    } = schedule;

    return (
      <ScheduleScreenWrapper
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <AnswerWrapper
          activeOpacity={1}
          style={{
            width: '100%',
          }}
        >
          <PointerHandlerWrapper
            style={{ justifyContent: 'center' }}
          >
            <HintTextWrapper>
              <HintText>
                {strings("secondQuiz.addTime")}
              </HintText>
            </HintTextWrapper>

            {
              dayList[0].weekDay !== null && (
                <BlueBodyText
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  {strings("secondQuiz.addedDays")}
                </BlueBodyText>
              )
            }

            <BlueBodyText
              style={{
                alignSelf: 'flex-start',
                marginHorizontal: '8%',
              }}
            >
              {
                dayList.map((day, index) => (day.weekDay && (
                  `\n${index + 1}. ${day.weekDay} ${day.startTime}:00-${day.endTime}:00.`
                )))
              }
            </BlueBodyText>

            <ScheduleWrapper>
              <WeekDataWrapper>
                <DaysWrapper>
                  {
                    this.dayButtons.map((day, index) => (
                      day(index)
                    ))
                  }
                </DaysWrapper>
                <InfoWrapper>
                  <PlainText>
                    {`${weekDay || ''} ${(startTime !== null && endTime) ? (`${startTime}:00 - ${endTime}:00`) : ''}`}
                  </PlainText>
                </InfoWrapper>
              </WeekDataWrapper>
              <TimeWrapper>
                <LargePlainText>
                  {strings("secondQuiz.from")}
                </LargePlainText>
                <TimePicker
                  index={0}
                  hour={startTime}
                  startTime={startTime}
                  endTime={endTime}
                  visible={visible}
                  onChange={(time) => {
                    this.setState({
                      schedule: {
                        ...schedule,
                        startTime: time,
                      },
                      visible: false,
                    }, () => {
                      this.setState({
                        visible: true,
                      });
                    });
                    this.forceUpdate();
                  }}
                />
                <LargePlainText>
                  {strings("secondQuiz.to")}
                </LargePlainText>
                <TimePicker
                  index={1}
                  hour={endTime}
                  startTime={startTime}
                  endTime={endTime}
                  visible={visible}
                  onChange={(time) => {
                    this.setState({
                      schedule: {
                        ...schedule,
                        endTime: time,
                      },
                      visible: false,
                    }, () => {
                      this.setState({
                        visible: true,
                      });
                    });
                    this.forceUpdate();
                  }}
                />
              </TimeWrapper>
            </ScheduleWrapper>
            <Button
              disabled={disabled}
              text={strings("secondQuiz.saveDay")}
              type="secondary"
              onPress={this.onAddDay}
            />
          </PointerHandlerWrapper>
        </AnswerWrapper>

        <ButtonWrapper>
          <Button
            disabled={disabled}
            text={strings("secondQuiz.findSpec")}
            type="primary"
            onPress={this.onPress}
          />
        </ButtonWrapper>
      </ScheduleScreenWrapper>
    );
  }
}

ScheduleScreen.defaultProps = {};
