const $id = (id) => document.getElementById(id);
const navigateBack = () => {
  console.log('Navigating back', window.location.hash);
  window.history.back();
};

export {
  $id,
  navigateBack,
}