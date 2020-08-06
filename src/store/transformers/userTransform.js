import { createTransform } from 'redux-persist';
import { Map } from 'immutable';

const userTransform = createTransform(
  inboundState => ({
    accessToken: inboundState.accessToken,
    userTags: inboundState.userTags.toJS(),
    hasSkippedTagSelection: inboundState.hasSkippedTagSelection,

    email: inboundState.email,
    firstName: inboundState.firstName,
    lastName: inboundState.lastName,
    locale: inboundState.locale,
  }),
  outboundState => ({
    ...outboundState,
    isSigningIn: false,
    signInFailedBecauseOfCredentials: false,
    signInFailedForUnknownError: false,
    signUpData: null,
    isSigningUp: false,
    signUpFailedBecauseOfCredentials: false,
    signUpFailedForUnknownError: false,
    loadingUserDynamicInfo: false,
    userDynamicInfo: Map({}),
    retrieveUserDynamicInfoFailed: false,

    accessToken: outboundState.accessToken,
    userTags: Map(outboundState.userTags),
    hasSkippedTagSelection: outboundState.hasSkippedTagSelection,

    email: outboundState.email,
    firstName: outboundState.firstName,
    lastName: outboundState.lastName,
    locale: outboundState.locale,
  }),
  { whitelist: ['user'] }
);

export default userTransform;
