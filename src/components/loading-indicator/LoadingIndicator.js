import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const LoadingIndicator = props => {
  const { style, ...otherProps } = props;
  return <ActivityIndicator style={[styles.container, style]} {...otherProps} />;
};

LoadingIndicator.propTypes = {
  style: PropTypes.object,
};

LoadingIndicator.defaultProps = {
  style: {},
};

export default LoadingIndicator;
