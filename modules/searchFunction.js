// searchFunction.js
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../environment/firebaseConfig.js";

export function findAndSearch(tabla) {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const collection = "libreria-de-conductores"; // La colección en Firebase

  // Obtén los datos desde Firebase
  onValue(ref(database, collection), (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
      const user = { id: childSnapshot.key, ...childSnapshot.val() };
      data.push(user);
    });

    // Filtrar los datos
    const filteredData = data.filter(user => {
      return Object.values(user).some(value => value.toString().toLowerCase().includes(input));
    });

    // Renderiza los datos filtrados
    renderUsersTable(filteredData);
  });
}

// Función para renderizar los datos en la tabla
function renderUsersTable(data) {
  const tabla = document.getElementById("libreria");
  tabla.innerHTML = "";

  data.forEach((user, index) => {
    const row = `
      <tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center">${user.unidad}</td>
        <td class="text-center">${user.placa}</td>
        <td class="text-center">${user.nombre}</td>
        <td class="text-center">${user.cedula}</td>
        <td class="text-center">${user.whatsapp}</td>
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
        <td class="text-center">${user.email}</td>
        <td>
          <button class="btn btn-primary edit-user-button" data-id="${user.id}">Editar</button>
          <button class="btn btn-danger delete-user-button" data-id="${user.id}">Eliminar</button>
        </td>
      </tr>
    `;
    tabla.innerHTML += row;
  });
}

export function initializeSearch(tabla) {
  document.getElementById("searchButton").addEventListener("click", () => findAndSearch(tabla));

  document.getElementById("searchInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      findAndSearch(tabla);
    }
  });
}
