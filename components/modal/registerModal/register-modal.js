// script.js
document.addEventListener("DOMContentLoaded", () => {
    fetch('../../componentes/modal/registerModal/register-modal.html')
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML('beforeend', data);
        // Inicializar el modal de Bootstrap si es necesario
        var modal = new bootstrap.Modal(document.getElementById('myModal'));
      })
      .catch(error => console.error('Error loading the modal:', error));
  });
  