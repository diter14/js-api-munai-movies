import router from './router/routes';
import initGlobalSearch from './views/SearchView.js';

document.addEventListener('DOMContentLoaded', async (e) => {
  router();
  initGlobalSearch();
  // window.addEventListener('DOMContentLoaded', router, false);
  window.addEventListener('hashchange', router, false);
});
