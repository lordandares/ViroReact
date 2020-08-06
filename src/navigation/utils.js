import { Navigation } from 'react-native-navigation';

const tabsIndex = {
  TODAY: 0,
  SEARCH: 1,
  FESTIVITIES: 2,
  FAVORITES: 4,
};

const navigateToTab = tabIndex =>
  Navigation.mergeOptions('BottomTabs', {
    bottomTabs: {
      currentTabIndex: tabIndex,
    },
  });

export const navigateToSearchPage = () => navigateToTab(tabsIndex.SEARCH);

export const navigateToFestivitiesPage = () => navigateToTab(tabsIndex.FESTIVITIES);
