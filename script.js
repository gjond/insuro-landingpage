let deferredPrompt;

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");
    const installButton = document.getElementById("install-button");

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

    // === PWA INSTALLATIONSBUTTON ===
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt = event;

        // Button anzeigen, wenn die PWA installierbar ist
        installButton.style.display = "block";

        installButton.addEventListener("click", () => {
            deferredPrompt.prompt(); // Installationsdialog anzeigen

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User hat die App installiert!");
                    installButton.style.display = "none"; // Button ausblenden nach Installation
                } else {
                    console.log("User hat die Installation abgelehnt.");
                }
                deferredPrompt = null;
            });
        });
    });
});
