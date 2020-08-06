import { Record, List, Map } from 'immutable';
import TagModel from './TagModel';
import { createEntityMap } from '../../utils/entityUtils';

class EventModel extends Record({
  audience: null,
  category: null,
  description: null,
  endDate: null,
  findNearKiosk: null,
  id: null,
  imageCarousel: List([]),
  imageSponsors: List([]),
  imageHero: {},
  kidsAllowed: null,
  likes: null,
  name: null,
  priceFrom: null,
  priceTo: null,
  rate: null,
  searchKeywords: null,
  startDate: null,
  tags: Map({}),
  ticketingUrl: null,
  ticketsOnGate: null,
  times: List([]),
  typeOfEvent: null,
  urlToEvent: null,
  userFavorite: null,
  venue: null,
  distance: null,
  isFavorite: null,
  userRate: null,
  specialNotes: null,
}) {
  static create(event) {
    return new EventModel({
      audience: event.audience,
      category: `${event.category}`,
      description: event.description,
      endDate: event.endDate,
      findNearKiosk: event.findNearKiosk,
      id: `${event.id}`,
      imageCarousel: List(event.imageCarousel),
      imageSponsors: List(event.imageSponsors),
      imageHero: event.imageHero,
      kidsAllowed: event.kidsAllowed,
      likes: event.likes,
      name: event.name,
      priceFrom: event.priceFrom,
      priceTo: event.priceTo,
      rate: event.rate,
      searchKeywords: event.searchKeywords,
      startDate: event.startDate,
      tags: createEntityMap(event.tags, TagModel),
      ticketingUrl: event.ticketingUrl,
      ticketsOnGate: event.ticketsOnGate,
      times: List(event.times),
      typeOfEvent: event.typeOfEvent,
      urlToEvent: event.urlToEvent,
      userFavorite: event.userFavorite,
      venue: `${event.venue}`,
      distance: event.distance,
      isFavorite: event.isFavorite,
      userRate: event.userRate,
      specialNotes: event.specialNotes,
    });
  }
}

// eslint-disable-next-line func-names
EventModel.prototype.setDistance = function(distance) {
  return this.set('distance', distance);
};

// eslint-disable-next-line func-names
EventModel.prototype.setLikes = function(likes) {
  return this.set('likes', likes);
};

// eslint-disable-next-line func-names
EventModel.prototype.setRate = function(rate) {
  return this.set('rate', rate);
};

// eslint-disable-next-line func-names
EventModel.prototype.setIsFavorite = function(isFavorite) {
  return this.set('isFavorite', isFavorite);
};

// eslint-disable-next-line func-names
EventModel.prototype.setUserRate = function(userRate) {
  return this.set('userRate', userRate);
};

export default EventModel;
