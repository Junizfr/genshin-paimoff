const alertContainer = document.getElementById('alert-container');

export function showAlert(type, message) {
  switch (type) {
    case 'success':
      alertContainer.innerHTML = `<div class="alert alert-success">${message}</div>`;
      break;
    case 'error':
      alertContainer.innerHTML = `<div class="alert alert-error">${message}</div>`;
      break;
    default:
      break;
  }
}
