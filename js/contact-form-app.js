// js/contact-form-app.js
emailjs.init(EMAILJS_PUBLIC_KEY);
function sendEmail(e) {
  e.preventDefault();
  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, e.target)
    .then(() => alert("Message envoyé !"))
    .catch(error => console.error("Erreur d’envoi :", error));
}
document.getElementById("contact-form").addEventListener("submit", sendEmail);
