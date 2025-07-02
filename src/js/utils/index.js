const $id = (id) => document.getElementById(id);
const navigateBack = () => {
  console.log('Navigating back', window.location.hash);
  window.history.back();
};

function formatDuration(minutes) {
  if (!minutes || isNaN(minutes)) return '-';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm' : ''}`.trim();
}

export {
  $id,
  navigateBack,
  formatDuration,
}