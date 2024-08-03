import { signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from "../firebase.js";

export const logout = document.querySelector("#logout");

logout.addEventListener("click", async () => {
    await signOut(auth);
    console.log("user signed out");

    window.location.href = "index.html";

});
