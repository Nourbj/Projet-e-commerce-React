import Cookies from "js-cookie";
const API_URL = "http://localhost:3000/products-lists";
const API_URL_TOP_SELLERS = "http://localhost:3000/top-sellers-products";
const API_URL_TOP_NEW = "http://localhost:3000/top-new-products";
const API_URL_PRODUCTS = "http://localhost:3000/products"; 
const TOP_SELLERS = "Top Sellers";
const TOP_NEW = "Top New";
const RECENTLY_VIEWED = "Recently Viewed"; 

export const getProductsByCategory = async (categoryName) => {
  try {
    if (!categoryName) {
      console.error("Le nom de la catégorie est invalide :", categoryName);
      return [];
    }

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Les données reçues ne sont pas un tableau :", data);
      return [];
    }

    const category = data.find(item => item.name && item.name.toLowerCase() === categoryName.toLowerCase());
    
    if (!category || !category.items) {
      console.error("Aucune catégorie correspondante trouvée.");
      return [];
    }
    
    return category.items;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
};

export const getProducts = async (title) => {
  try {
    let url;
    if (title === TOP_SELLERS) {
      url = API_URL_TOP_SELLERS;
    } else if (title === TOP_NEW) {
      url = API_URL_TOP_NEW;
    } else if (title === RECENTLY_VIEWED) {
      return getRecentlyViewedProducts(); 
    }

    if (url) {
      const response = await fetch(url);
      const data = await response.json();

      // Ajoutez un ID unique si le produit n'en a pas
      const productsWithId = data.map((product, index) => ({
        ...product,
        id: product.id || `temp-id-${index}`, // Utilisation d'un ID temporaire si aucun ID n'existe
      }));

      return productsWithId.slice(0, 2); // Retourne les 2 premiers produits
    } else {
      console.error("Titre non valide");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
};

export const getAllProducts = async (title) => {
  try {
    let url;
    if (title === TOP_SELLERS) {
      url = API_URL_TOP_SELLERS;
    } else if (title === TOP_NEW) {
      url = API_URL_TOP_NEW;
    } else if (title === RECENTLY_VIEWED) {
      return getRecentlyViewedProducts(true); 
    }

    if (url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } else {
      console.error("Titre non valide");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_URL_PRODUCTS}/${productId}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data = await response.json();
    addToRecentlyViewed(productId);

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return null;
  }
};


const addToRecentlyViewed = (productId) => {
  let viewedProducts = Cookies.get("recentlyViewed");
  viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];

  // Vérification pour ne pas ajouter de doublon
  if (!viewedProducts.includes(productId)) {
    viewedProducts.unshift(productId);
  }

  if (viewedProducts.length > 10) {
    viewedProducts.pop();
  }

  Cookies.set("recentlyViewed", JSON.stringify(viewedProducts), { expires: 7 });
};


const getRecentlyViewedProducts = async (getAll = false) => {
  let viewedProducts = Cookies.get("recentlyViewed");
  viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];

  if (viewedProducts.length === 0) return [];

  // Utilisation de Promise.all avec une gestion des erreurs pour chaque produit
  const productDetailsPromises = viewedProducts.map(async (id) => {
    try {
      const product = await getProductById(id);
      return product;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit avec l'ID ${id}`, error);
      return null;
    }
  });

  const productDetails = await Promise.all(productDetailsPromises);

  // Filtrer les produits nulls (en cas d'erreur)
  const validProducts = productDetails.filter(product => product !== null);

  return getAll ? validProducts : validProducts.slice(0, 3); 
};
