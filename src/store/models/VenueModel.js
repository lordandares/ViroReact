import { Record } from 'immutable';

class VenueModel extends Record({
  id: null,
  name: null,
  streetName: null,
  lat: null,
  lng: null,
  zone: null,
}) {
  static create(venue) {
    return new VenueModel({
      id: `${venue.id}`,
      name: venue.name,
      streetName: venue.streetName,
      lat: venue.lat,
      lng: venue.lng,
      zone: venue.zone,
    });
  }
}

export default VenueModel;
