document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        // Überprüft, ob das Menü bereits geöffnet ist
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
            menu.style.display = "none"; // Versteckt das Menü für Safari
        } else {
            menu.classList.add("open");
            menu.style.display = "flex"; // Zeigt das Menü an
        }
    });

    // Menü schließen, wenn ein Link geklickt wird
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("open");
            menu.style.display = "none";
        });
    });

    // Menü schließen, wenn außerhalb geklickt wird (nur in Safari notwendig)
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove("open");
            menu.style.display = "none";
        }
    });
});
