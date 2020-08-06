import Pages from '../enum/Pages';
import AboutSaudi from '../pages/about-saudi';
import Support from '../pages/support';
import ArticleDetail from '../pages/article-detail';
import Onboarding from '../pages/onboarding';
import Today from '../pages/today';
import SearchMap from '../pages/search-map';
import Search from '../pages/search';
import CategoriesResults from '../pages/categories-results';
import Favorites from '../pages/favorites';
import EnableLocation from '../pages/onboarding/enable-location/';
import TurnNotifications from '../pages/onboarding/turn-notifications/';
import PersonalizedList from '../pages/onboarding/personalized-list/';
import ExploreRiyadh from '../pages/onboarding/explore-riyadh/';
import Settings from '../pages/settings';
import Festivities from '../pages/festivities';
import SignIn from '../pages/sign-in/';
import SignUp from '../pages/sign-up/';
import MapFestivities from '../pages/map-festivities/';
import PickUpPassword from '../pages/pick-up-password/';
import EditProfile from '../pages/edit-profile';
import PrivacyPolicy from '../pages/privacy-policy';
import PickInterests from '../pages/pick-interests';
import ForgotPassword from '../pages/forgot-password';

const routes = [
  { id: Pages.ABOUT_SAUDI, screen: AboutSaudi },
  { id: Pages.SUPPORT, screen: Support },
  { id: Pages.ARTICLE_DETAIL, screen: ArticleDetail },
  { id: Pages.ONBOARDING, screen: Onboarding },
  { id: Pages.TODAY, screen: Today },
  { id: Pages.FAVORITES, screen: Favorites },

  { id: Pages.SEARCH_MAP, screen: SearchMap },
  { id: Pages.SEARCH, screen: Search },
  { id: Pages.CATEGORIES_RESULT, screen: CategoriesResults },

  { id: Pages.ENABLE_LOCATION, screen: EnableLocation },
  { id: Pages.TURN_NOTIFICATIONS, screen: TurnNotifications },
  { id: Pages.PERSONALIZED_LIST, screen: PersonalizedList },
  { id: Pages.EXPLORE_RIYADH, screen: ExploreRiyadh },
  { id: Pages.SETTINGS, screen: Settings },
  { id: Pages.EDIT_PROFILE, screen: EditProfile },
  { id: Pages.FESTIVITIES, screen: Festivities },
  { id: Pages.SIGN_IN, screen: SignIn },
  { id: Pages.SIGN_UP, screen: SignUp },
  { id: Pages.PICK_UP_PASSWORD, screen: PickUpPassword },
  { id: Pages.MAP_FESTIVITIES, screen: MapFestivities },
  { id: Pages.PRIVACY_POLICY, screen: PrivacyPolicy },
  { id: Pages.PICK_INTERESTS, screen: PickInterests },
  { id: Pages.FORGOT_PASSWORD, screen: ForgotPassword },
];

export default routes;
