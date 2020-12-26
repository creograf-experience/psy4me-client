import React, { PureComponent } from 'react';
import uuid from 'react-native-uuid';
import { showMessage } from 'react-native-flash-message';
import { scale } from 'react-native-size-matters';
import ActionSheet from 'react-native-actionsheet';
import { ImagePicker, Permissions } from 'expo';

import {
  Button,
  AddButton,
} from '../../../containers';
import { colors } from '../../../constants';
import {
  DocumentFieldWrapper,
  DocumentsWrapper,
  NewDocumentsWrapper,
  BinWrapper,
} from '../components';

import { strings } from "../../../../locale/i18n";


type Props = {};

export class DocumentField extends PureComponent<Props> {
  constructor(props) {
    super(props);

    const { documents, docIDs } = this.props;

    this.state = {
      documents,
      docIDs,
      picked: null,
      deletePressed: false,
      deleted: null,
      disabled: 'auto',
      hasCameraPermission: null,
      hasCameraRollPermission: null,
    };
  }

  componentWillMount() {
    const { documents, docIDs } = this.state;

    if (documents.length === 1) {
      const newDocuments = [...documents, false];
      const newDocIDs = [...docIDs, uuid.v4()];
      this.setState({
        documents: newDocuments,
        docIDs: newDocIDs,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.documents) {
      const { documents, docIDs } = nextProps;
      this.setState({
        documents,
        docIDs,
      });
    }
  }

  addExtraDocument = async () => {
    const { documents, docIDs } = this.state;

    if (!documents.filter(elem => !elem).length) {

      this.setState({
        documents: [...documents, false],
        docIDs: [...docIDs, uuid.v4()],
        deletePressed: false,
      }, () => {
        const { onAdd } = this.props;
        const { documents, docIDs } = this.state;
        onAdd(documents, docIDs);
      });
    } else {
      showMessage({
        message: strings("secondQuiz.noDoc"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  deleteDocument = (id) => {
    const { documents, docIDs } = this.state;
    const index = docIDs.indexOf(id);

    this.setState({ disabled: 'none' });
    setTimeout(() => this.setState({ disabled: 'auto' }), 500);

    if (documents.length > 1) {
      this.setState({
        deleted: index,
      }, () => {
        if (index === documents.length - 1 && index > 1) {
          this.scroll.scrollTo({ x: this.scrollPosition - scale(100) });
        }
        setTimeout(() => {
          this.setState({
            documents: documents.filter((elem, idx) => idx !== index),
            docIDs: docIDs.filter((elem, idx) => idx !== index),
          }, () => {
            const { onAdd } = this.props;
            const { documents, docIDs } = this.state;
            onAdd(documents, docIDs);
          });
        }, 500);
      });
    } else {
      showMessage({
        message: strings("secondQuiz.docRequired"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  addPhoto = (id) => {
    const { docIDs } = this.state;
    this.setState({
      picked: docIDs.indexOf(id),
    }, () => {
      this.ActionSheet.show();
    });
  };

  pickPhoto = async (index) => {
    await this._requestCameraRollPermission();
    const { hasCameraRollPermission } = this.state;
    const { onAdd } = this.props;
    if (hasCameraRollPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [9, 16],
      });

      if (!result.cancelled) {
        const { documents } = this.state;
        const newDocuments = [...documents];
        newDocuments[index] = result.uri;
        this.setState({
          documents: newDocuments,
        }, () => {
          const { documents, docIDs } = this.state;
          onAdd(documents, docIDs);
        });
      }
    }
  };

  takePhoto = async (index) => {
    await this._requestCameraPermission();
    await this._requestCameraRollPermission();
    const { onAdd } = this.props;
    const { hasCameraPermission, hasCameraRollPermission } = this.state;
    if (hasCameraPermission && hasCameraRollPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [9, 16],
        cancelButtonTitle: strings("secondQuiz.cancel"),
      });

      if (!result.cancelled) {
        const { documents } = this.state;
        const newDocuments = [...documents];
        newDocuments[index] = result.uri;
        this.setState({
          documents: newDocuments,
        }, () => {
          const { documents, docIDs } = this.state;
          onAdd(documents, docIDs);
        });
      }
    }
  };

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _requestCameraRollPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraRollPermission: status === 'granted',
    });
  };

  render() {
    const {
      documents,
      deletePressed,
      deleted,
      docIDs,
      disabled,
      picked,
    } = this.state;

    return (
      <DocumentFieldWrapper>
        <DocumentsWrapper>
          <NewDocumentsWrapper
            ref={(ref) => { this.scroll = ref; }}
            showsHorizontalScrollIndicator={false}
            horizontal
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              this.scrollWidth = width;
            }}
            onScroll={(event) => {
              this.scrollPosition = event.nativeEvent.contentOffset.x;
            }}
            onContentSizeChange={width => {
              if (deleted === null) {
                this.scroll.scrollTo({ x: width - this.scrollWidth });
              } else {
                this.setState({
                  deleted: null,
                });
              }
            }}
            pointerEvents={disabled}
          >
            {
              documents.map((document, index) => (
                <AddButton
                  key={docIDs[index]}
                  type="smallMargin"
                  icon="addIcon"
                  image={documents[index]}
                  onPress={() => (
                    deletePressed
                      ? this.deleteDocument(docIDs[index])
                      : this.addPhoto(docIDs[index])
                    )}
                  animated={deletePressed}
                  deleted={deleted === index}
                />
              ))
            }
            <ActionSheet
              ref={(ref) => { this.ActionSheet = ref; }}
              title={strings("firstQuiz.addPhoto")}
              options={[strings("firstQuiz.makePhoto"), strings("firstQuiz.choosePhoto"), strings("firstQuiz.cancel")]}
              cancelButtonIndex={2}
              onPress={(index) => {
                switch (index) {
                case 0:
                  return this.takePhoto(picked);
                case 1:
                  return this.pickPhoto(picked);
                default:
                  return null;
                }
              }}
            />
          </NewDocumentsWrapper>
          <BinWrapper>
            <AddButton
              type="small"
              icon="binIcon"
              onPress={() => this.setState({ deletePressed: !deletePressed })}
              color={deletePressed && colors.errorColor}
            />
          </BinWrapper>
        </DocumentsWrapper>
        <Button
          type="secondary"
          text={strings("secondQuiz.add")}
          onPress={this.addExtraDocument}
        />
      </DocumentFieldWrapper>
    );
  }
}

DocumentField.defaultProps = {};
