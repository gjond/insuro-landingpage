document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Verhindert Seitenwechsel

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { "Accept": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            form.style.display = "none";  // Versteckt das Formular
            successMessage.style.display = "block"; // Zeigt die Erfolgsnachricht
        })
        .catch(error => {
            alert("Es gab ein Problem! Bitte versuche es erneut.");
        });
    });
});
