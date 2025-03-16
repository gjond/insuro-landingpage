document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    // === Hamburger-Menü-Funktionalität ===
    menuToggle.addEventListener("click", function () {
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
            menu.style.display = "none";
        } else {
            menu.classList.add("open");
            menu.style.display = "flex";
        }
    });

    // === Formular absenden ohne Weiterleitung ===
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
