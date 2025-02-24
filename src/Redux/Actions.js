import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000/carts"; 

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : null;
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = loadCartFromLocalStorage() || { 
  cartId: null,
  items: [],
  total: 0,
  subTotal: 0,
  tax: 0,
};

const Actions = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartId = action.payload.id || state.cartId; 
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.subTotal = action.payload.subTotal;
      state.tax = action.payload.tax;
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
            state.cartId = null;
            state.items = [];
            state.total = 0;
            state.subTotal = 0;
            state.tax = 0;
            localStorage.removeItem("cart"); 
          },

          addItem: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
          
            if (existingItem) {
              existingItem.qty += action.payload.qty;
              if (existingItem.qty <= 0) {
                state.items = state.items.filter(item => item.id !== action.payload.id);
              }
            } else {
              if (action.payload.qty > 0) {
                state.items.push(action.payload); // Ajout de l'article
              }
            }
          
            // Calcul des totaux
            state.subTotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
            state.tax = state.subTotal * 0.12;
            state.total = state.subTotal + state.tax;
          
            saveCartToLocalStorage(state);
          },
          
    
    
     
    removeFromCart: (state, action) => {
  const productIdToRemove = action.payload;
  state.items = state.items.filter(item => item.id !== productIdToRemove);

  if (state.items.length === 0) {
    state.total = 0;
    state.subTotal = 0;
    state.tax = 0;
  } else {
    state.subTotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    state.tax = state.subTotal * 0.12;
    state.total = state.subTotal + state.tax;
  }

  saveCartToLocalStorage(state);

  if (state.cartId) {
    const updateCart = async () => {
      try {
        await axios.put(`${API_URL}/${state.cartId}`, state);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du panier sur le serveur :", error);
      }
    };
    updateCart();
  }
},
    
    
    
    
    
updateQuantity: (state, action) => {
  const { id, qty } = action.payload;
  const item = state.items.find(item => item.id === id);

  if (item) {
    if (qty <= 0) {
      state.items = state.items.filter(item => item.id !== id);
    } else {
      item.qty = qty; 
    }

    state.subTotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    state.tax = state.subTotal * 0.12;
    state.total = state.subTotal + state.tax;

    if (state.cartId) { 
      const updatedCart = { ...state, items: state.items };
      axios.put(`${API_URL}/${state.cartId}`, updatedCart)
        .catch(error => {
          console.error("Erreur lors de la mise à jour du panier sur le serveur:", error);
        });
    }
  }

  saveCartToLocalStorage(state); 
}

    
  },
});

export const { setCart, addItem, removeFromCart, updateQuantity, clearCart } = Actions.actions;

export const addToCart = (product, quantity = 1) => async (dispatch, getState) => {
  const { cart } = getState();
  
  const updatedItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    qty: quantity, 
    imageName: product.imageName,
  };
  

  const existingItem = cart.items.find(item => item.id === product.id);

  if (existingItem) {
    dispatch(updateQuantity({ id: product.id, qty: existingItem.qty + quantity }));
  } else {
    if (!cart.cartId) {
      try {
        const response = await axios.post(API_URL, {
          total: updatedItem.price * updatedItem.qty,
          subTotal: updatedItem.price * updatedItem.qty,
          tax: (updatedItem.price * updatedItem.qty) * 0.12,
          items: [updatedItem],
        });

        dispatch(setCart(response.data));
      } catch (error) {
        console.error("Erreur lors de la création du panier :", error);
      }
    } else {
      dispatch(addItem(updatedItem));

      try {
        const updatedCart = {
          ...cart,
          total: cart.total + updatedItem.price * updatedItem.qty,
          subTotal: cart.subTotal + updatedItem.price * updatedItem.qty,
          tax: cart.tax + (updatedItem.price * updatedItem.qty) * 0.12,
          items: [...cart.items, updatedItem],
        };

        await axios.put(`${API_URL}/${cart.cartId}`, updatedCart);
        dispatch(setCart(updatedCart));
      } catch (error) {
      }
    }
  }
};


export const clearCartAPI = () => async (dispatch, getState) => {
  const { cart } = getState();

  if (cart.cartId) {
    try {
      await axios.delete(`${API_URL}/${cart.cartId}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du panier :", error);
    }
  }

  dispatch(clearCart());
};

export default Actions.reducer;