document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    // === HAMBURGER-MENÜ FIX ===
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("open");
        menuToggle.classList.toggle("open"); // X-Animation aktivieren
    });

    // Menü schließen, wenn ein Link angeklickt wird
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("open");
            menuToggle.classList.remove("open");
        });
    });

    // === FORMULAR-ANMELDUNG OHNE WEITERLEITUNG ===
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Verhindert Seiten-Neuladen

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                form.reset(); // Löscht die Eingabe
                successMessage.style.display = "block"; // Zeigt die Erfolgsnachricht an
                setTimeout(() => { successMessage.style.display = "none"; }, 5000); // Nach 5 Sekunden ausblenden
            } else {
                alert("Fehler: Anmeldung konnte nicht gesendet werden.");
            }
        } catch (error) {
            console.error("Fehler:", error);
            alert("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
        }
    });
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker registriert!"))
        .catch(error => console.log("Service Worker Registrierung fehlgeschlagen:", error));
}
