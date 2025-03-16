document.addEventListener("DOMContentLoaded", function() {
    const ctaButton = document.querySelector(".cta-button");
    
    ctaButton.addEventListener("mouseover", function() {
        ctaButton.style.transform = "scale(1.1)";
    });

    ctaButton.addEventListener("mouseout", function() {
        ctaButton.style.transform = "scale(1)";
    });
});
