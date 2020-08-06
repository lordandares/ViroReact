import { Record } from 'immutable';

class KioskModel extends Record({
  id: null,
  name: null,
}) {
  static create(kiosk) {
    return new KioskModel({
      id: `${kiosk.id}`,
      name: kiosk.name,
    });
  }
}

export default KioskModel;
