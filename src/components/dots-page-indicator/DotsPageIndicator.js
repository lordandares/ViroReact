import React from 'react';
import { times } from 'lodash';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const getDotStyle = props => ({
  width: props.dotDiameter,
  height: props.dotDiameter,
  borderRadius: props.dotDiameter / 2,
});

const getCurrentStepStyle = props => ({
  backgroundColor: props.dotColor,
});

const getOtherStepsStyle = props => ({
  borderColor: props.dotColor,
  borderWidth: props.dotBorderWidth,
});

const getNotFirstMarginStyle = props => ({
  marginLeft: props.dotMargin,
});

export const DotsPageIndicator = props => {
  const { currentStepIndex, totalSteps, style } = props;

  const dotStyle = getDotStyle(props);
  const currentStepIndexStyle = getCurrentStepStyle(props);
  const otherStepsStyle = getOtherStepsStyle(props);
  const notFirstMarginStyle = getNotFirstMarginStyle(props);

  return (
    <View style={[styles.mainView, style]}>
      {times(props.totalSteps, index => (
        <View
          key={index}
          style={[
            dotStyle,
            index === currentStepIndex ? currentStepIndexStyle : otherStepsStyle,
            totalSteps,
            index > 0 ? notFirstMarginStyle : {},
          ]}
        />
      ))}
    </View>
  );
};

DotsPageIndicator.propTypes = {
  ...View.propTypes,
  totalSteps: PropTypes.number.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
  dotDiameter: PropTypes.number.isRequired,
  dotMargin: PropTypes.number.isRequired,
  dotBorderWidth: PropTypes.number.isRequired,
  dotColor: PropTypes.any.isRequired,
};
