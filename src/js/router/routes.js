import { 
  HomePage,
  TrendsPage,
  SearchPage,
  MovieDetailsPage,
  CategoriesPage,
} from '../views/index';

const router = () => {
  const routes = {
    '#trends': () => TrendsPage(),
    '#search': () => SearchPage(),
    '#movie': () => MovieDetailsPage(),
    '#category': () => CategoriesPage(),
  }

  for (const route of Object.keys(routes)) {
		if (location.hash.startsWith(route)) {
			routes[route]();
			return;
		}
	}

  HomePage();
}

export default router;