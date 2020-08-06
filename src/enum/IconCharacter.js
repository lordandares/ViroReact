import colors from '../theme/colors';
import categories from './CategoriesEnum';

/**
 * Icons chars
 *
 */
export default {
  HEART: '\ue918',
  HEART_FILL: '\ue917',
  STAR_FILL: '\ue916',
  CROSS: '\ue910',
  ENTERTAINMENT: '\ue911',
  FESTIVALS: '\ue912',
  GAMING: '\ue913',
  LIVE_SHOWS: '\ue914',
  SEARCH: '\ue915',
  PROFILE: '\ue90e',
  SHOW: '\ue90d',
  RESTAURANT: '\ue90c',
  MARKER: '\ue90b',
  CAR: '\ue90a',
  CLOCK: '\ue909',
  CALENDAR: '\ue908',
  TICKET: '\ue907',
  SHARE: '\ue906',
  MORE: '\ue905',
  MARKER_FILL: '\ue904',
  BELL: '\ue903',
  CHEVRON_LEFT: '\ue902',
  CHEVRON_RIGHT: '\ue90f',
  STAR: '\ue901',
  NOTIFICATION: '\ue91a',
  ALERT: '\ue919',
  SETTINGS: '\ue91b',
  MENU: '\ue921',
  YOUTUBE: '\ue920',
  WHATSAPP: '\ue91f',
  TWITTER: '\ue91e',
  INSTAGRAM: '\ue91d',
  FACEBOOK: '\ue91c',

  //  Weather icons
  SUN: '\ue900',
  SUN_CLOUDS: '\ue927',
  CLOUDS: '\ue922',
  MIST: '\ue923',
  RAIN: '\ue924',
  SNOW: '\ue925',
  STORM: '\ue926',
};

export const categoryIcons = {
  [`${categories.LIVE_SHOWS.id}`]: { color: colors.INSPIRE, icon: 'LIVE_SHOWS' },
  [`${categories.FESTIVALS.id}`]: { color: colors.TASTE, icon: 'FESTIVALS' },
  [`${categories.GAMING.id}`]: { color: colors.JOY, icon: 'GAMING' },
  [`${categories.SHOWS_AND_PERFORMANCE.id}`]: {
    color: colors.FANTASY,
    icon: 'SHOW',
  },
  [`${categories.ENTERTAINMENT_ACTIVITIES.id}`]: {
    color: colors.SPEED,
    icon: 'ENTERTAINMENT',
  },
  [`${categories.EXHIBITIONS_AND_BUSINESS.id}`]: {
    color: colors.IMAGINE,
    icon: 'CAR',
  },
  [`${categories.RESTAURANTS.id}`]: {
    color: colors.EXPLORE,
    icon: 'RESTAURANT',
  },
};

export const viewAllIcon = { color: colors.GREY_MEDIUM, icon: 'MORE' };

// https://openweathermap.org/weather-conditions
export const weatherIcons = {
  '01d': { icon: 'SUN' },
  '02d': { icon: 'SUN_CLOUDS' },
  '03d': { icon: 'CLOUDS' },
  '04d': { icon: 'CLOUDS' },
  '09d': { icon: 'RAIN' },
  '10d': { icon: 'RAIN' },
  '11d': { icon: 'STORM' },
  '13d': { icon: 'SNOW' },
  '50d': { icon: 'MIST' },
};
