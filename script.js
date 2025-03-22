let deferredPrompt;

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM wurde geladen!");

    // Hamburger-Menü-Elemente abrufen
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    // Beta-Anmeldeformular abrufen
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    // PWA Installationsbutton
    const installButton = document.getElementById("install-button");

    // === HAMBURGER-MENÜ FIX ===
    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("open");

            // Safari Fix: Toggle opacity
            if (menu.classList.contains("open")) {
                menu.style.display = "flex";
                setTimeout(() => {
                    menu.style.opacity = "1";
                }, 10);
            } else {
                menu.style.opacity = "0";
                setTimeout(() => {
                    menu.style.display = "none";
                }, 300);
            }
        });

        // Menü schließen, wenn ein Link angeklickt wird
        document.querySelectorAll("nav ul li a").forEach(link => {
            link.addEventListener("click", function () {
                menu.classList.remove("open");
                menu.style.opacity = "0";
                setTimeout(() => {
                    menu.style.display = "none";
                }, 300);
            });
        });
    } else {
        console.log("⚠ Hamburger-Menü nicht gefunden.");
    }


    
function openSurvey() {
    document.getElementById("surveyModal").style.display = "block";
}

function closeSurvey() {
    document.getElementById("surveyModal").style.display = "none";
}

// Schließen des Modals bei Klick außerhalb des Inhalts
window.onclick = function(event) {
    let modal = document.getElementById("surveyModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

    
    // === FORMULAR-ANMELDUNG OHNE WEITERLEITUNG ===
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            console.log("✅ Formular gesendet!");

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

    // === PWA INSTALLATIONSBUTTON ===
    window.addEventListener("beforeinstallprompt", (event) => {
        console.log("✅ beforeinstallprompt ausgelöst!");
        event.preventDefault();
        deferredPrompt = event;

        if (installButton) {
            installButton.style.display = "block";

            installButton.addEventListener("click", () => {
                deferredPrompt.prompt();

                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("✅ App installiert!");
                        installButton.style.display = "none";
                    } else {
                        console.log("❌ Installation abgelehnt.");
                    }
                    deferredPrompt = null;
                });
            });
        } else {
            console.log("⚠ Installationsbutton nicht gefunden!");
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

    // === VIDEO POSTER (FALLBACK FÜR SAFARI) ===
    const video = document.getElementById("insuro-video");
    if (video) {
        video.setAttribute("poster", "video-thumbnail.jpg"); // Stelle sicher, dass dieses Bild existiert
    }
});


