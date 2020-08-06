import { Record, List } from 'immutable';

class ZoneModel extends Record({
  id: null,
  name: null,
  streetName: null,
  amenities: [],
}) {
  static create(zone) {
    return new ZoneModel({
      id: `${zone.id}`,
      name: zone.name,
      zoneNumber: zone.zoneNumber,
      amenities: List(zone.amenities),
    });
  }
}

export default ZoneModel;
