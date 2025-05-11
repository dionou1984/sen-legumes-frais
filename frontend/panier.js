// Exemple de données (tu peux les injecter dynamiquement via API aussi)
const panier = [
  { nom: "Tomates", prix: 2.00, qte: 2 },
  { nom: "Carottes", prix: 1.50, qte: 3 }
];

const conteneur = document.getElementById("panier");
const totalEl = document.getElementById("total");

let total = 0;
panier.forEach(p => {
  total += p.prix * p.qte;
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `<strong>${p.nom}</strong> – ${p.qte} x ${p.prix.toFixed(2)} €`;
  conteneur.appendChild(div);
});
totalEl.innerText = total.toFixed(2);

// 🧾 Génération de la facture PDF
function genererFacture() {
  const items = panier.map(p => [p.nom, p.qte.toString(), `${p.prix.toFixed(2)} €`, `${(p.qte * p.prix).toFixed(2)} €`]);

  const docDefinition = {
    content: [
      { text: '🧾 Facture – Sen Légumes Frais', style: 'header' },
      '\n',
      {
        table: {
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Produit', 'Quantité', 'Prix unitaire', 'Total'],
            ...items,
            [{ text: 'Total TTC', colSpan: 3 }, {}, {}, `${total.toFixed(2)} €`]
          ]
        }
      },
      '\n\nMerci pour votre commande ! 🍅🥕🥬'
    ],
    styles: {
      header: { fontSize: 18, bold: true }
    }
  };

  pdfMake.createPdf(docDefinition).download("facture_sen_legumes.pdf");
}
function viderPanier() {
  if (confirm("Vider le panier ?")) {
    localStorage.removeItem("panier");
    location.reload();
  }
}
