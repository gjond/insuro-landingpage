document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Verhindert Standard-Seitenwechsel

        const formData = new FormData(form);

        // Sende die Daten an Formspree
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset(); // Setzt das Eingabefeld zurück
            successMessage.style.display = "block"; // Zeigt die Erfolgsmeldung an
            setTimeout(() => { successMessage.style.display = "none"; }, 5000); // Blendet die Meldung nach 5 Sek. aus
        }
    });
});
