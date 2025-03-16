let deferredPrompt;

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM wurde geladen!");

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");
    const installButton = document.getElementById("install-button");

    // === HAMBURGER-MENÜ FIX ===
    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("open");
            menuToggle.classList.toggle("open");
        });

        // Menü schließen, wenn ein Link angeklickt wird
        document.querySelectorAll("nav ul li a").forEach(link => {
            link.addEventListener("click", function () {
                menu.classList.remove("open");
                menuToggle.classList.remove("open");
            });
        });
    } else {
        console.log("⚠ Hamburger-Menü-Elemente nicht gefunden!");
    }

    // === FORMULAR-ANMELDUNG OHNE WEITERLEITUNG ===
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            console.log("✅ Formular wurde gesendet!");

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    form.reset();
                    successMessage.style.display = "block";
                    setTimeout(() => { successMessage.style.display = "none"; }, 5000);
                    console.log("✅ Anmeldung erfolgreich!");
                } else {
                    alert("❌ Fehler: Anmeldung konnte nicht gesendet werden.");
                }
            } catch (error) {
                console.error("❌ Fehler:", error);
                alert("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
            }
        });
    } else {
        console.log("⚠ Formular nicht gefunden!");
    }

    let deferredPrompt;

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM wurde geladen!");

    const installButton = document.getElementById("install-button");

    // === TEST: beforeinstallprompt wird getriggert? ===
    window.addEventListener("beforeinstallprompt", (event) => {
        console.log("✅ beforeinstallprompt wurde ausgelöst!");
        event.preventDefault();
        deferredPrompt = event;

        // Button anzeigen
        if (installButton) {
            installButton.style.display = "block";

            installButton.addEventListener("click", () => {
                deferredPrompt.prompt();

                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("✅ User hat die App installiert!");
                        installButton.style.display = "none";
                    } else {
                        console.log("❌ User hat die Installation abgelehnt.");
                    }
                    deferredPrompt = null;
                });
            });
        } else {
            console.log("⚠ Installationsbutton nicht gefunden!");
        }
    });

    // === TEST: Button existiert? ===
    if (!installButton) {
        console.log("❌ Kein Installationsbutton gefunden!");
    } else {
        console.log("✅ Installationsbutton existiert!");
    }
});

    // === SERVICE WORKER REGISTRIEREN ===
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js")
            .then((registration) => {
                console.log("✅ Service Worker registriert:", registration);

                // Überprüfen, ob eine neue Version verfügbar ist
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === "installed") {
                            console.log("✅ Neue Version erkannt!");
                            if (navigator.serviceWorker.controller) {
                                alert("🔄 Neue Version verfügbar! Bitte die Seite neu laden.");
                            }
                        }
                    };
                };
            }).catch((error) => {
                console.log("❌ Service Worker Fehler:", error);
            });
    }
});
