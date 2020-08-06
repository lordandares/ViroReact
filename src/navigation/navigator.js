import { Navigation } from 'react-native-navigation';
import routes from './routes';
import Pages from '../enum/Pages';
import { images, colors } from '../theme';

const createPages = (store, provider) => {
  // Register pages
  routes.forEach(route =>
    Navigation.registerComponentWithRedux(route.id, () => route.screen, provider, store)
  );
};

const navigationComponent = (component, options = {}, passProps = {}) => {
  return typeof component === 'string'
    ? { component: { id: component, name: component, options, passProps } }
    : component;
};

const tablessTabComponent = (id, options) => {
  return {
    id,
    name: id,
    options: {
      ...options,
      bottomTabs: {
        visible: false,
      },
      topBar: {
        visible: false,
      },
    },
  };
};

const mainNavigationPages = [
  {
    id: Pages.TODAY,
    title: 'TODAY',
    color: colors.FANTASY,
    subTitle: 'Sed ut perspiciatis unde omnisiste natus error',
  },
  {
    id: Pages.SEARCH,
    // id: Pages.SUPPORT,
    title: 'SEARCH',
    subTitle: 'Sed ut perspiciatis unde omnisiste natus error',
    color: colors.IMAGINE,
  },
  {
    id: Pages.FESTIVITIES,
    title: 'FESTIVITIES',
    subTitle: 'Sed ut perspiciatis unde omnisiste natus error',
    color: colors.EXPLORE,
  },
  {
    id: Pages.FAVORITES,
    title: 'FAVORITES',
    subTitle: 'Sed ut perspiciatis unde omnisiste natus error',
    color: colors.JOY,
  },
];

const getTabIndexByPageName = pageName =>
  mainNavigationPages.findIndex(page => page.id === pageName);

const onboardingNavigation = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [{ component: tablessTabComponent(Pages.ONBOARDING) }],
      },
    },
  });

const loginNavigation = () =>
  Navigation.setRoot({
    root: navigationComponent(Pages.SIGN_IN),
  });

const mainMenuNavigation = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        center: {
          bottomTabs: {
            id: 'BottomTabs',
            options: {
              bottomTabs: {
                elevation: 8,
                titleDisplayMode: 'alwaysShow', // for Android only
              },
            },
            children: mainNavigationPages.map(page => {
              return {
                stack: {
                  children: [
                    {
                      component: tablessTabComponent(page.id, {
                        bottomTab: {
                          text: '',
                          icon: images.SQUARE_ICON,
                        },
                      }),
                    },
                  ],
                },
              };
            }),
          },
        },
      },
    },
  });

const mainNavigation = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Pages.CATEGORIES_RESULT,
              options: {
                topBar: {
                  visible: false,
                  height: 0,
                },
              },
            },
          },
        ],
      },
    },
  });

export {
  createPages,
  onboardingNavigation,
  loginNavigation,
  mainNavigation,
  mainMenuNavigation,
  navigationComponent,
  mainNavigationPages,
  getTabIndexByPageName,
};
