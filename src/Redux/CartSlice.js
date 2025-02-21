import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/carts"; 

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  console.log("Cart loaded from localStorage:", savedCart);  // Debugging
  return savedCart ? JSON.parse(savedCart) : { cartId: null, items: [], total: 0, subTotal: 0, tax: 0 };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const calculateCartTotals = (items) => {
  const subTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subTotal * 0.12; // Taxe de 12% (ou autre)
  const total = subTotal + tax;
  return { subTotal, tax, total };
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartId = action.payload.cartId;
      state.items = action.payload.items;
      const totals = calculateCartTotals(state.items);
      state.subTotal = totals.subTotal;
      state.tax = totals.tax;
      state.total = totals.total;
      saveCartToLocalStorage(state);
    },

    addItem: (state, action) => {
      console.log("Adding item:", action.payload);  // Debugging line
      const existingItem = state.items.find((item) => item.id === action.payload.id);
    
      if (existingItem) {
        // Si l'élément existe déjà, on met à jour la quantité
        console.log("Item found in cart, updating quantity:", existingItem);
        existingItem.qty += action.payload.qty; // Ajoute la quantité de l'article
      } else {
        // Si l'élément n'existe pas, on l'ajoute
        console.log("Item not found, adding new item:", action.payload);
        state.items.push(action.payload);
      }
    
      const totals = calculateCartTotals(state.items);
      state.subTotal = totals.subTotal;
      state.tax = totals.tax;
      state.total = totals.total;
      saveCartToLocalStorage(state);
    },
     
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const totals = calculateCartTotals(state.items);
      state.subTotal = totals.subTotal;
      state.tax = totals.tax;
      state.total = totals.total;
      saveCartToLocalStorage(state);
    },
 

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      console.log("Updating quantity for item id:", id, "to qty:", qty);  // Debugging line
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.qty = qty;
        const totals = calculateCartTotals(state.items);
        state.subTotal = totals.subTotal;
        state.tax = totals.tax;
        state.total = totals.total;
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const { setCart, addItem, removeFromCart, updateQuantity } = cartSlice.actions;

export const addToCart = (product, quantity = 1) => async (dispatch, getState) => {
  const { cart } = getState();
  const updatedItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    qty: quantity,
    imageName: product.imageName,
  };

  if (!cart.cartId) {
    const existingCart = loadCartFromLocalStorage();
    if (existingCart && existingCart.cartId) {
      dispatch(setCart(existingCart));
      return;
    }

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
      console.error("Erreur lors de la mise à jour du panier :", error);
    }
  }
};

export const updateItemQuantity = (id, qty) => (dispatch) => {
  dispatch(updateQuantity({ id, qty }));
};

export const removeItemFromCart = (id) => (dispatch) => {
  dispatch(removeFromCart(id));
};

export default cartSlice.reducer;
