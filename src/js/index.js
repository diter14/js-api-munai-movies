import router from './router/routes';

document.addEventListener('DOMContentLoaded', async (e) => {
  router();
  // window.addEventListener('DOMContentLoaded', router, false);
  window.addEventListener('hashchange', router, false);
});
