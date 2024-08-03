import { ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../environment/firebaseConfig.js";

// Función para mostrar el modal de edición con los datos del usuario
export function showEditModal(user) {
    const modal = document.getElementById("editUserModal");
    const unidadInput = modal.querySelector("#editUnidad");
    const placaInput = modal.querySelector("#editPlaca");
    const nombreInput = modal.querySelector("#editNombre");
    const cedulaInput = modal.querySelector("#editCedula");
    const whatsappInput = modal.querySelector("#editWhatsapp");
    const emailInput = modal.querySelector("#editEmail");

    // Rellenar el formulario con los datos del usuario
    unidadInput.value = user.unidad;
    placaInput.value = user.placa;
    nombreInput.value = user.nombre;
    cedulaInput.value = user.cedula;
    whatsappInput.value = user.whatsapp;
    emailInput.value = user.email;

    // Guardar el ID del usuario en el formulario
    modal.dataset.userId = user.id;

    // Mostrar el modal
    modal.style.display = "block";
}

// Función para ocultar el modal de edición
export function hideEditModal() {
    const modal = document.getElementById("editUserModal");
    modal.style.display = "none";
}

// Función para actualizar los datos del usuario en Firebase Realtime Database
export function saveUserEdits() {
    const modal = document.getElementById("editUserModal");
    const userId = modal.dataset.userId;

    const updatedUser = {
        unidad: modal.querySelector("#editUnidad").value,
        placa: modal.querySelector("#editPlaca").value,
        nombre: modal.querySelector("#editNombre").value,
        cedula: modal.querySelector("#editCedula").value,
        whatsapp: modal.querySelector("#editWhatsapp").value,
        email: modal.querySelector("#editEmail").value
    };

    update(ref(database, `users/${userId}`), updatedUser)
        .then(() => {
            alert("Datos actualizados correctamente.");
            hideEditModal();
        })
        .catch((error) => {
            alert("Error al actualizar los datos: " + error.message);
        });
}
