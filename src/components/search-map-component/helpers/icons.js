import categories from './../../../enum/CategoriesEnum';
import images from '../../../theme/images';

const categoryMapIcons = {
  [`${categories.LIVE_SHOWS.id}`]: images.MAP_MARKER_LIVE,
  [`${categories.FESTIVALS.id}`]: images.MAP_MARKER_FESTIVALS,
  [`${categories.GAMING.id}`]: images.MAP_MARKER_GAMING,
  [`${categories.SHOWS_AND_PERFORMANCE.id}`]: images.MAP_MARKER_SHOWS,
  [`${categories.ENTERTAINMENT_ACTIVITIES.id}`]: images.MAP_MARKER_ENTERTAINMENT,
  [`${categories.EXHIBITIONS_AND_BUSINESS.id}`]: images.MAP_MARKER_EXHIBITIONS,
  [`${categories.RESTAURANTS.id}`]: images.MAP_MARKER_RESTAURANTS,
};

export default categoryMapIcons;
