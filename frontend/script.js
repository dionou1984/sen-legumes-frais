// Init EmailJS
emailjs.init("deGPQSg0Eyc0lz0HR");

document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("product-list");
      data.forEach((p) => {
        const el = document.createElement("div");
        el.className = "product";
        el.innerHTML = `<h3>${p.name}</h3><p>${p.price} €</p>`;
        list.appendChild(el);
      });
    });

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_7dqemrc", "template_xfa8yyl", this)
      .then(() => {
        status.innerText = "✅ Message envoyé avec succès !";
        form.reset();
      })
      .catch((err) => {
        status.innerText = "❌ Une erreur est survenue.";
        console.error(err);
      });

    // Send WhatsApp via backend (optional)
    fetch("http://localhost:3001/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.user_name.value,
        email: form.user_email.value,
        message: form.message.value,
      }),
    });
  });
});
<script type="module">
  import { getProducts } from './products.js';

  getProducts().then(products => {
    const list = document.getElementById("product-list");
    products.forEach(p => {
      const el = document.createElement("div");
      el.className = "product";
      el.innerHTML = `<h3>${p.name}</h3><p>${p.price} €</p>`;
      list.appendChild(el);
    });
  });
</script>
function exportCSV() {
  fetch(apiURL, {
    headers: { "Authorization": `Bearer ${jwt}` }
  })
  .then(res => res.json())
  .then(data => {
    const produits = data.data;
    const lignes = [
      ["Nom", "Prix (€)"],
      ...produits.map(p => [p.attributes.nom, p.attributes.prix])
    ];
    
    const csvContent = lignes.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "produits_sen_legumes.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
<style media="print">
  body { color: #000; background: #fff; }
  #login-form, #form-add, .actions, button { display: none !important; }
  .product-item { page-break-inside: avoid; }
</style>
function ajouterAuPanier(nom, prix) {
  const panier = JSON.parse(localStorage.getItem("panier") || "[]");
  const index = panier.findIndex(p => p.nom === nom);

  if (index >= 0) {
    panier[index].qte += 1;
  } else {
    panier.push({ nom, prix, qte: 1 });
  }

  localStorage.setItem("panier", JSON.stringify(panier));
  alert(`${nom} ajouté au panier !`);
}

