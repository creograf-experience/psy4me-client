import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';
import uuid from 'react-native-uuid';

import {
  HintText,
  PointerHandlerWrapper,
  PlaceholderText,
  ErrorText,
  BlueBodyText,
} from '../../../components';
import {
  Button,
  ExtraField,
} from '../../../containers';
import {
  AnswerWrapper,
  HintTextWrapper,
  ButtonWrapper,
  EducationInfoScreenWrapper,
} from '../components';
import {
  DocumentField,
} from '.';
import { colors } from '../../../constants';

import { strings } from "../../../../locale/i18n";


type Props = {}

export class EducationInfoScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);

    const { educations } = this.props;
    const {
      university,
      specialty,
      documents,
      docIDs,
    } = educations[educations.length - 1];

    this.state = {
      disabled: false,
      education: {
        university,
        specialty,
        documents,
        docIDs,
      },
      educationList: educations,
      errors: {
        universityError: null,
        specialtyError: null,
        documentsError: null,
      },
    };
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { educationList } = this.state;

    onReturn(educationList);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { educationList } = this.state;

    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (educationList[0].university) {
      this.setState({
        errors: {
          universityError: null,
          specialtyError: null,
          documentsError: null,
        },
      });

      onChange(educationList);
    } else {
      showMessage({
        message: strings("secondQuiz.educationRequired"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  onAddEducation = () => {
    const { education, educationList } = this.state;
    const newEducations = [...educationList];
    const { university, specialty, documents } = education;
    const { onAdd } = this.props;


    if (university.trim() && specialty.trim() && documents.filter(elem => elem).length > 0) {
      newEducations[newEducations.length - 1] = education;
      newEducations.push({
        university: '',
        specialty: '',
        documents: [false, false],
        docIDs: [uuid.v4(), uuid.v4()],
      });

      this.setState({
        educationList: newEducations,
        education: {
          university: '',
          specialty: '',
          documents: [false, false],
          docIDs: [uuid.v4(), uuid.v4()],
        },
        errors: {
          universityError: null,
          specialtyError: null,
          documentsError: null,
        },
      });

      onAdd(newEducations);
    } else {
      this.setState({
        errors: {
          universityError: !university.trim() ? strings("firstQuiz.required") : null,
          specialtyError: !specialty.trim() ? strings("fisrtdQuiz.required") : null,
          documentsError: documents.filter(elem => elem).length === 0,
        },
      });
      showMessage({
        message: strings("secondQuiz.fillAll"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  handleChangeInput = (fieldName, text) => {
    const { education } = this.state;

    this.setState({
      education: {
        ...education,
        [fieldName]: text,
      },
    });
  };

  render() {
    const {
      disabled,
      education,
      errors,
      educationList,
    } = this.state;
    const {
      university,
      specialty,
      documents,
      docIDs,
    } = education;
    const { universityError, specialtyError, documentsError } = errors;

    return (
      <EducationInfoScreenWrapper
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <AnswerWrapper
          style={{ width: '95%' }}
          activeOpacity={1}
        >
          <PointerHandlerWrapper
            style={{ justifyContent: 'flex-start' }}
          >
            <HintTextWrapper>
              <HintText>
                {strings("secondQuiz.fillEducation")}
              </HintText>
            </HintTextWrapper>

            {
              educationList[0].university !== '' && (
                <BlueBodyText
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  {strings("secondQuiz.chosenEducation")}
                </BlueBodyText>
              )
            }

            <BlueBodyText
              style={{
                marginHorizontal: '5%',
              }}
            >
              {
                educationList.map((educ, index) => (educ.university && educ.specialty && (
                  `\n${index + 1}. ${educ.university}, ${educ.specialty}.`
                )))
              }
            </BlueBodyText>
            <ExtraField
              value={university}
              placeholder={strings("secondQuiz.university")}
              keyboardType="default"
              onChange={text => this.handleChangeInput('university', text)}
              error={universityError}
            />
            <ExtraField
              value={specialty}
              placeholder={strings("secondQuiz.spec")}
              keyboardType="default"
              onChange={text => this.handleChangeInput('specialty', text)}
              error={specialtyError}
            />
            <PlaceholderText
              style={{
                alignSelf: 'center',
                marginTop: 20,
              }}
            >
              {strings("secondQuiz.docPhoto")}
            </PlaceholderText>
            {documentsError && <ErrorText>{strings("secondQuiz.docRequired")}</ErrorText>}
          </PointerHandlerWrapper>
          <DocumentField
            documents={documents}
            docIDs={docIDs}
            onAdd={(newDocuments, newDocIDs) => this.setState({
              education: {
                ...education,
                documents: newDocuments,
                docIDs: newDocIDs,
              },
            })}
          />
          <Button
            disabled={disabled}
            text={strings("secondQuiz.saveEducation")}
            type="secondary"
            onPress={this.onAddEducation}
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
      </EducationInfoScreenWrapper>
    );
  }
}

EducationInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
