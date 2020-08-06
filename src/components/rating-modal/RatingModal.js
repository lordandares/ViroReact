import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { main, text } from './style';
import Icon from '../icon';
import CloseButton from '../close-button';
import GeneralButton from '../general-button';
import TranslationEnum from '../../enum/TranslationEnum';
import { translate } from '../../utils/Translator';
import { colors } from '../../theme';

export const RatingModal = ({
  isVisible,
  closeHandler,
  event,
  ratingInProgress,
  rateEvent,
  locale,
  token,
  ratingAndUpdateFailed,
  resetRatingAndUpdateFailure,
}) => {
  const [rating, setRating] = useState(event.userRate || 0);

  const onStarPress = newRating => {
    if (ratingAndUpdateFailed) {
      resetRatingAndUpdateFailure();
    }
    setRating(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const key = `star-icon-${i}`;
      stars.push(
        <Icon
          key={key}
          name={rating >= i ? 'STAR_FILL' : 'STAR'}
          size={28}
          color={colors.FANTASY}
          containerStyle={main.star}
          onPress={() => onStarPress(i)}
          disabled={ratingInProgress || !!event.userRate}
        />
      );
    }
    return stars;
  };

  const closeModal = () => {
    if (ratingAndUpdateFailed) {
      resetRatingAndUpdateFailure();
    }
    setRating(event.userRate || 0);
    closeHandler();
  };

  return (
    <Modal isVisible={isVisible} style={main.modal}>
      <View style={main.modalContainer}>
        <CloseButton disabled={ratingInProgress} onPress={closeModal} style={main.closeButton} />
        <Text style={text.titleText}>{translate(TranslationEnum.YOUR_RATING)}</Text>
        <Text style={text.messageText}>{translate(TranslationEnum.YOUR_RATING_MESSAGE)}</Text>
        <View style={main.starsContainer}>{renderStars()}</View>
        <View style={main.errorContainer}>
          <Text style={text.errorMessage}>
            {ratingAndUpdateFailed ? translate(TranslationEnum.SOMETHING_WENT_WRONG_TRY_AGAIN) : ''}
          </Text>
        </View>

        <GeneralButton
          loading={ratingInProgress}
          style={main.button}
          onPress={() =>
            rateEvent({
              eventId: event.id,
              rate: rating,
              token,
              locale,
            })
          }
          text={translate(TranslationEnum.SAVE)}
          disabled={ratingInProgress || !!event.userRate || rating === 0 || ratingAndUpdateFailed}
        />
      </View>
    </Modal>
  );
};

RatingModal.propTypes = {
  isVisible: PropTypes.bool,
  closeHandler: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  ratingInProgress: PropTypes.bool.isRequired,
  rateEvent: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  token: PropTypes.any.isRequired,
  ratingAndUpdateFailed: PropTypes.bool.isRequired,
  resetRatingAndUpdateFailure: PropTypes.func.isRequired,
};

RatingModal.defaultProps = {
  isVisible: false,
};
