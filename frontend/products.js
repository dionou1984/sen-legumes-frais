// frontend/products.js
export const getProducts = async () => {
  try {
    const res = await fetch('https://sen-legumes-cms.up.railway.app/api/produits');
    const data = await res.json();
    return data.data.map(p => ({
      name: p.attributes.nom,
      price: p.attributes.prix
    }));
  } catch (err) {
    console.error("Erreur chargement produits :", err);
    return [];
  }
};