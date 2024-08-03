import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from '../environment/firebaseConfig.js';

const signInForm = document.querySelector('#signInForm');

signInForm.addEventListener('submit', async e => {
  e.preventDefault();

  const email = signInForm['signInEmail'].value;
  const password = signInForm['signInPassword'].value;

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    console.log(credential)
    window.location.href = "./users/admin/index.html";

    const modal = bootstrap.modal.getInstance(document.querySelector('#loginModal'))
    modal.hide()

    alert(credential.user.email + ' ¡Bienvenido!')

  } catch (error) {
    if (error.code === "auth/wrong-password") {
      alert("¡Contraseña incorrecta", "error");
    } else if (error.code === "auth/user-not-found") {
      alert("¡Usuario no encontrado!", "error");
    } else {
      alert(error.message, "error");
    }
  }
});
