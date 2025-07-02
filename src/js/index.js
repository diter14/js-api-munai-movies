import router from './router/routes';
import initGlobalSearch from './views/SearchView.js';
import { $id, navigateBack } from './utils/index.js';

document.addEventListener('DOMContentLoaded', async (e) => {
  router();

  // Initialize global search
  initGlobalSearch();
  
  // Global event for every "back button"
  document.addEventListener('click', (e) => {
    if (e.target.closest('.back-button')) {
      navigateBack();
    }
  });

  // Detect hash changing to navigate to the corresponding page
  // window.addEventListener('DOMContentLoaded', router, false);
  window.addEventListener('hashchange', router, false);
});
