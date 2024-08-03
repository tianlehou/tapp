export function initScrollButtons(tabla) {
    const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
    // Evento de clic en el botón de desplazamiento hacia abajo
    scrollToBottomBtn.addEventListener("click", function () {
      const lastRow = tabla.rows[tabla.rows.length - 1];
      lastRow.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  
    // Evento de clic en el botón de desplazamiento hacia arriba
    scrollToTopBtn.addEventListener("click", function () {
      const firstRow = tabla.rows[0];
      firstRow.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  
//  Copiar y Pegar estos elemento en el html donde desee visualizar
//   <a id="scrollToBottomBtn" class="bi bi-arrow-down-square btn-arrow"> </a>
//   <a id="scrollToTopBtn" class="bi bi-arrow-up-square btn-arrow"> </a>
