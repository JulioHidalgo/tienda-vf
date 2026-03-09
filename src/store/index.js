import { createStore } from "vuex";
import { db, auth } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export default createStore({
  state: {
    products: [],
    cart: [], // { id, name, price, qty }
    loadingProducts: false,
    lastOrderId: null,
    user: null,
    authError: "",
  },

  getters: {
    cantidadCarrito(state) {
      return state.cart.reduce((acc, item) => acc + item.qty, 0);
    },
    totalCarrito(state) {
      return state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    userEmail(state) {
      return state.user?.email || "";
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
        SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTH_ERROR(state, error) {
      state.authError = error;
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

    async register({ commit }, { email, password }) {
      try {
        commit("SET_AUTH_ERROR", "");
        const response = await createUserWithEmailAndPassword(auth, email, password);

        commit("SET_USER", {
          uid: response.user.uid,
          email: response.user.email,
        });
      } catch (error) {
        commit("SET_AUTH_ERROR", error.message);
      }
    },

    async login({ commit }, { email, password }) {
      try {
        commit("SET_AUTH_ERROR", "");
        const response = await signInWithEmailAndPassword(auth, email, password);

        commit("SET_USER", {
          uid: response.user.uid,
          email: response.user.email,
        });
      } catch (error) {
        commit("SET_AUTH_ERROR", error.message);
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("SET_USER", null);
      commit("LIMPIAR_CARRITO");
    },

    setUserFromSession({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("SET_USER", {
            uid: user.uid,
            email: user.email,
          });
        } else {
          commit("SET_USER", null);
        }
      });
    },

    async realizarCompra({ state, getters, commit }) {
      if (state.cart.length === 0 || !state.user) return;

      // Filtrar items válidos (asegurarse de que no haya undefined)
      const validItems = state.cart.filter(item => 
        item.id && item.name && typeof item.price === 'number' && item.qty > 0
      );

      if (validItems.length === 0) return;

      // Guardar compra en Firestore
      const order = {
        userId: state.user.uid,
        userEmail: state.user.email,
        items: state.cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          subtotal: item.price * item.qty,
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
