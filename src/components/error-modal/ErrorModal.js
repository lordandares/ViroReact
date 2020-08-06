import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { main, text } from './style';
import { CloseButton } from '../close-button/CloseButton';
import Icon from '../icon';
import { colors } from '../../theme';

export const ErrorModal = props => (
  <Modal isVisible={props.isVisible} style={main.errorModal}>
    <View style={main.errorModalContainer}>
      <View style={main.errorModalCloseButtonContainer}>
        <CloseButton onPress={props.closeHandler} />
      </View>
      <Icon name="ALERT" color={colors.RED_DARKER} size={50} />
      <Text style={text.errorModalTitle}>{props.title}</Text>
      <Text style={text.errorModalBody}>{props.body}</Text>
    </View>
  </Modal>
);

ErrorModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.any.isRequired,
  body: PropTypes.any.isRequired,
  closeHandler: PropTypes.func.isRequired,
};
