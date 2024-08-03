// signupForm.js
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { auth, database } from "../environment/firebaseConfig.js";

const signupForm = document.querySelector("#modalForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const unidadInput = document.getElementById("validationCustomUnidadModal").value;
  const placaInput = document.getElementById("validationCustomPlacaModal").value;
  const nombreInput = document.getElementById("validationCustomNombreModal").value;
  const cedulaInput = document.getElementById("validationCustomCedulaModal").value;
  const whatsappInput = document.getElementById("validationCustomWhatsappModal").value;
  const emailInput = document.getElementById("validationCustomEmailModal").value;
  const passwordInput = document.getElementById("validationCustomPasswordModal").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
    const user = userCredential.user;

    const nuevoRegistro = {
      unidad: unidadInput,
      placa: placaInput,
      nombre: nombreInput,
      cedula: cedulaInput,
      whatsapp: whatsappInput,
      email: emailInput,
      userId: user.uid // Guardar el UID del usuario registrado
    };

    const referenciaUnidades = ref(database, 'libreria-de-conductores');

    await push(referenciaUnidades, nuevoRegistro);

    document.getElementById("modalForm").reset();
    const myModalEl = document.getElementById("myModal");
    const myModal = bootstrap.Modal.getInstance(myModalEl);
    myModal.hide();

    alert("¡Registro exitoso!");
    setTimeout(() => {
      location.reload();
    }, 100);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("¡Este correo ya está en uso!, intente iniciar sesión o crear otro distinto a este.", "error");
    } else if (error.code === "auth/invalid-email") {
      alert("¡Correo inválido!, verifique que esté bien escrito e intente nuevamente.", "error");
    } else if (error.code === "auth/weak-password") {
      alert("¡Esta contraseña es corta y/o insegura!, se recomienda tener 8 caracteres o más, de lo posible combíne letras minúscula con mayúscula y número.", "error");
    } else if (error.code) {
      alert("¡Algo ha salido mal!, no logro detectar el error.", "error");
    }
    console.error("Error al registrar al usuario:", error);
  }
});
