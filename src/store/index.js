import { createStore } from "vuex";
import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export default createStore({
  state: {
    products: [],
    cart: [], // { id, name, price, qty }
    loadingProducts: false,
    lastOrderId: null,
  },

  getters: {
    cantidadCarrito(state) {
      return state.cart.reduce((acc, item) => acc + item.qty, 0);
    },
    totalCarrito(state) {
      return state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    },
  },

  mutations: {
    ESTABLECER_PRODUCTOS(state, products) {
      state.products = products;
    },
    ESTABLECER_CARGANDO_PRODUCTOS(state, v) {
      state.loadingProducts = v;
    },
    AGREGAR_AL_CARRITO(state, product) {
      const found = state.cart.find((p) => p.id === product.id);
      if (found) found.qty++;
      else state.cart.push({ ...product, qty: 1 });
    },
    ELIMINAR_DEL_CARRITO(state, productId) {
      state.cart = state.cart.filter((p) => p.id !== productId);
    },
    DECREMENTAR_CANTIDAD(state, productId) {
      const found = state.cart.find((p) => p.id === productId);
      if (!found) return;
      found.qty--;
      if (found.qty <= 0) state.cart = state.cart.filter((p) => p.id !== productId);
    },
    LIMPIAR_CARRITO(state) {
      state.cart = [];
    },
    ESTABLECER_ULTIMO_ID_ORDEN(state, id) {
      state.lastOrderId = id;
    },
  },

  actions: {
    async obtenerProductos({ commit }) {
      commit("ESTABLECER_CARGANDO_PRODUCTOS", true);
      try {
        const snap = await getDocs(collection(db, "products"));
        const products = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        commit("ESTABLECER_PRODUCTOS", products);
      } finally {
        commit("ESTABLECER_CARGANDO_PRODUCTOS", false);
      }
    },

    agregarAlCarrito({ commit }, product) {
      commit("AGREGAR_AL_CARRITO", product);
    },

    eliminarDelCarrito({ commit }, productId) {
      commit("ELIMINAR_DEL_CARRITO", productId);
    },

    decrementarCantidad({ commit }, productId) {
      commit("DECREMENTAR_CANTIDAD", productId);
    },

    async realizarCompra({ state, getters, commit }) {
      if (state.cart.length === 0) return;

      // Filtrar items válidos (asegurarse de que no haya undefined)
      const validItems = state.cart.filter(item => 
        item.id && item.name && typeof item.price === 'number' && item.qty > 0
      );

      if (validItems.length === 0) return;

      // Guardar compra en Firestore
      const order = {
        items: validItems.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          subtotal: i.price * i.qty,
        })),
        total: getters.totalCarrito,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      commit("ESTABLECER_ULTIMO_ID_ORDEN", docRef.id);
      commit("LIMPIAR_CARRITO");
    },
  },
});