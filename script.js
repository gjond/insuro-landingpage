function toggleMenu() {
    var menu = document.getElementById("menu");

    // Öffnen/Schließen des Menüs mit sanfter Animation
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
    } else {
        menu.classList.add("open");
    }
}

// Menü automatisch schließen, wenn ein Link angeklickt wird
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", function() {
        document.getElementById("menu").classList.remove("open");
    });
});

// Menü schließen, wenn man nach unten scrollt
window.addEventListener("scroll", function() {
    document.getElementById("menu").classList.remove("open");
});
