import { ref, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { mostrarDatos } from '../../users/admin/script.js';

export function deleteRow(database, collection) {
  const deleteButtons = document.querySelectorAll(".delete-user-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const id = event.currentTarget.getAttribute("data-id");

      const confirmarBorrado = confirm("¿Estás seguro que deseas borrar este elemento?");

      if (confirmarBorrado) {
        remove(ref(database, `${collection}/${id}`))
          .then(() => {
            console.log("Elemento ha sido borrado exitosamente.");
            mostrarDatos();  // Recarga los datos para reflejar la eliminación
          })
          .catch((error) => {
            console.error("Error al borrar el elemento:", error);
          });
      } else {
        console.log("Borrado cancelado.");
      }
    });
  });
}
