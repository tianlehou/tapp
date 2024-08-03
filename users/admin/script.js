// Importaciones necesarias
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../environment/firebaseConfig.js";
import { mostrarModal } from "../../modules/mostrarModal.js";
import { initializeSearch } from "../../modules/searchFunction.js";
import { initScrollButtons } from "../../modules/scrollButtons.js";
import { deleteRow } from "../../modules/tabla/deleteRow.js";
import { addEditEventListeners } from "../../modules/tabla/editRow.js";
import { changeEstadoSelectEvent, changeRoleSelectEvent } from "../../modules/tabla/changeSelectEvent.js";
import "../../modules/downloadToExcel.js"
import "../../auth/signup_Form.js"
import "../../components/modal/registerModal/register-modal.js"

// Constantes y variables de estado
const tabla = document.getElementById("libreria");
const collection = "libreria-de-conductores";
let itemsPerPage = 100;
let currentPage = 1;
let totalPages;

// Función para mostrar los datos en la tabla
export function mostrarDatos() {
  onValue(ref(database, collection), (snapshot) => {
    tabla.innerHTML = ""; // Limpia la tabla

    const data = [];
    snapshot.forEach((childSnapshot) => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    data.sort((a, b) => a.unidad.localeCompare(b.unidad)); // Ordena por nombre

    // Paginación
    totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    let filaNumero = startIndex + 1;

    // Mostrar datos de la página actual
    for (let i = startIndex; i < endIndex; i++) {
      const user = data[i];
      const row = `
        <tr>
          <td class="text-center">${filaNumero++}</td>
          <td class="text-center">${user.unidad}</td>
          <td class="text-center">${user.placa}</td>
          <td class="text-center">${user.nombre}</td>
          <td class="text-center">${user.cedula}</td>
          <td class="text-center">
            <a href="https://wa.me/${user.whatsapp}" target="_blank">
              ${user.whatsapp}
            </a>
          </td>
          <td class="text-center estado-col">
            <div class="flex-container">
              <span>${user.estado}</span>
              <select class="form-select estado-select" data-id="${user.id}">
                <option value="Ninguno" ${user.estado === "Ninguno" ? "selected" : ""}>Ninguno</option>
                <option value="Activo" ${user.estado === "Activo" ? "selected" : ""}>Activo</option>
                <option value="Suspendido" ${user.estado === "Suspendido" ? "selected" : ""}>Suspendido</option>
                <option value="Expulsado" ${user.estado === "Expulsado" ? "selected" : ""}>Expulsado</option>
                <option value="Sin carro" ${user.estado === "Sin carro" ? "selected" : ""}>Sin carro</option>
              </select>
            </div>
          </td>
          <td class="text-center role-col">
            <div class="flex-container">
              <span>${user.role}</span>
              <select class="form-select role-select" data-id="${user.id}">
                <option value="Ninguno" ${user.role === "Ninguno" ? "selected" : ""}>Ninguno</option>
                <option value="Propietario" ${user.role === "Propietario" ? "selected" : ""}>Propietario</option>
                <option value="Conductor" ${user.role === "Conductor" ? "selected" : ""}>Conductor</option>
                <option value="Secretario" ${user.role === "Secretario" ? "selected" : ""}>Secretario</option>
              </select>
            </div>
          </td>
          <td>
            <button class="btn btn-primary edit-user-button" data-id="${user.id}"><i class="bi bi-highlighter"></i></button>
            <button class="btn btn-danger delete-user-button" data-id="${user.id}"><i class="bi bi-eraser-fill"></i></button>
          </td>
          <td class="text-center">${user.email}</td>
        </tr>
      `;
      tabla.innerHTML += row;
    }

    updatePagination(totalPages);
    addEditEventListeners(); // Añade event listeners para edición
    deleteRow(database, collection); // Añade event listeners para eliminación
  });
}

// Función para actualizar la paginación
function updatePagination(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  const prevPageBtn = paginationContainer.querySelector("#prevPage");
  const nextPageBtn = paginationContainer.querySelector("#nextPage");

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  paginationContainer.querySelectorAll(".pageNumber:not(.prev-page):not(.next-page)").forEach(page => page.remove());

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  if (startPage === 1 && totalPages > 2) endPage = 3;
  if (endPage === totalPages && totalPages > 2) startPage = totalPages - 2;

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("pageNumber");
    if (i === currentPage) pageItem.classList.add("active");
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageItem.appendChild(pageLink);

    nextPageBtn.parentElement.before(pageItem);

    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      mostrarDatos();
      updatePagination(totalPages);
    });
  }

  prevPageBtn.removeEventListener("click", handlePrevPage);
  prevPageBtn.addEventListener("click", handlePrevPage);
  nextPageBtn.removeEventListener("click", handleNextPage);
  nextPageBtn.addEventListener("click", handleNextPage);

  document.getElementById("itemsPerPageSelect").addEventListener("change", function () {
    itemsPerPage = parseInt(this.value);
    currentPage = 1;
    mostrarDatos();
    updatePagination(totalPages);
  });
}

function handlePrevPage() {
  if (currentPage > 1) {
    currentPage--;
    mostrarDatos();
    updatePagination(totalPages);
  }
}

function handleNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    mostrarDatos();
    updatePagination(totalPages);
  }
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#showModalButton').addEventListener('click', mostrarModal);
  mostrarDatos();
  initScrollButtons(tabla);
  initializeSearch(tabla);
  changeEstadoSelectEvent(tabla, database, collection);
  changeRoleSelectEvent(tabla, database, collection);
});
