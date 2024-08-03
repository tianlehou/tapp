document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById("nav-header-container");

    fetch("../../components/nav-header/nav-header.html")
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
            // Si estás usando Bootstrap, inicializa los dropdowns después de cargar el contenido
            const dropdowns = document.querySelectorAll('.dropdown-toggle');
            dropdowns.forEach(dropdown => {
                new bootstrap.Dropdown(dropdown);
            });
        })
        .catch(error => console.error('Error al cargar el encabezado:', error));
});
