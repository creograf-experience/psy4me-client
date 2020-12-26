import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';

import Attachment from './Attachment';
import SelectPhotoBtn from './SelectPhotoBtn';
import SendMessageBtn from './SendMessageBtn';
import { colors } from '../../../../constants';

class MessageInput extends PureComponent {
  state = {
    message: '',
    image: null,
  };

  placeholders = {
    default: 'Сообщение...',
  };

  render() {
    const {
      message,
      image,
    } = this.state;
    const {
      chat,
      setShouldScroll,
      psychProfile
    } = this.props;

    return (
      <View style={styles.bg}>
        {
        image
          ? (
            <Attachment
              image={image}
              resetAttachment={this.resetAttachment}
            />
          )
          : null
        }

        <View style={styles.container}>
          {
            <View style={{ width: '15%' }}>
              <SelectPhotoBtn
                setAttachment={this.setAttachment}
              />
            </View>
          }

          {
            
            <TextInput
              style={styles.input}
              placeholder={this.placeholders.default}
              multiline
              value={message}
              onChangeText={text => this.setState({ message: text })}
              ref={ref => { 
                this.textInputRef = ref;
                this.props.setTextInputRef(ref);
              }}
            />
          }

          <View style={{ width: '15%' }}>
            {
              <SendMessageBtn
                chat={chat}
                message={message}
                image={image}
                psyshProfile={psychProfile}
                resetContent={this.resetContent}
                setShouldScroll={setShouldScroll}
              />
            }
          </View>

        </View>
      </View>
    );
  }

  resetAttachment = () => this.setState({ image: null });
  resetContent = () => this.setState({ message: '', image: null });
  setAttachment = image => this.setState({ image });
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white'
  },

  container: {
    flexDirection: 'row',
    marginBottom:5,
    marginTop:5
  },

  input: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth:1,
    borderRadius:10,
    borderColor:colors.hintColor,
    fontSize: 15
  },
});

MessageInput.propTypes = {
  chat: PropTypes.object.isRequired,
  setShouldScroll: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(MessageInput);
