document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("open");
        menuToggle.classList.toggle("open"); // Aktualisiert das "X"-Symbol
    });

    // Menü schließen, wenn ein Link geklickt wird
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("open");
            menuToggle.classList.remove("open");
        });
    });
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
