import { Record } from 'immutable';

class EventDynamicInfoModel extends Record({
  eventId: null,
  likes: null,
  rate: null,
}) {
  static create(eventDynamicInfo) {
    return new EventDynamicInfoModel({
      eventId: `${eventDynamicInfo.eventId}`,
      likes: eventDynamicInfo.likes,
      rate: eventDynamicInfo.rate,
    });
  }
}

export default EventDynamicInfoModel;
