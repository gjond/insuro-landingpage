document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Verhindert Seiten-Neuladen

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { "Accept": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                form.style.display = "none"; // Versteckt das Formular
                successMessage.style.display = "block"; // Zeigt die Erfolgsmeldung an
            } else {
                alert("Fehler: Anmeldung fehlgeschlagen. Bitte versuche es erneut.");
            }
        })
        .catch(error => {
            console.error("Fehler:", error);
            alert("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
        });
    });
});
