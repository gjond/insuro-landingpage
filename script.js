document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Verhindert den Standard-Submit

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset(); // Setzt das Eingabefeld zurück
                successMessage.classList.add("show"); // Erfolgsnachricht einblenden
                setTimeout(() => { successMessage.classList.remove("show"); }, 5000); // Nach 5 Sekunden ausblenden
            } else {
                alert("Fehler: Die Anmeldung konnte nicht gesendet werden.");
            }
        } catch (error) {
            console.error("Fehler beim Senden des Formulars:", error);
            alert("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
        }
    });
});
