import { Record } from 'immutable';

class UserDynamicInfoModel extends Record({
  eventId: null,
  isFavorite: null,
  rate: null,
}) {
  static create(userDynamicInfo) {
    return new UserDynamicInfoModel({
      eventId: `${userDynamicInfo.eventId}`,
      isFavorite: userDynamicInfo.isFavorite,
      rate: userDynamicInfo.rate,
    });
  }
}

export default UserDynamicInfoModel;
