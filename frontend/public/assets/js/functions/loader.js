export const showContentLoader = (displayOrNo) => {
  const loader = document.querySelector('.table-loader-row');
  if (loader) loader.style.display = displayOrNo ? 'flex' : 'none';
};
