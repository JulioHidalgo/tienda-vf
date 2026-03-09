<template>
  <div>
    <nav class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <span class="navbar-brand">Tienda</span>

        <div class="d-flex align-items-center gap-3">
          <span class="text-light small">
            {{ userEmail }}
          </span>

          <span class="badge bg-light text-dark">
            🛒 {{ cartCount }} items
          </span>

          <button class="btn btn-outline-light btn-sm" @click="logoutUser">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <div class="container my-4">
      <div class="alert alert-info">
        Bienvenido, <strong>{{ userEmail }}</strong>. Ya puedes agregar productos al carrito.
      </div>

      <div class="row g-4">
        <div class="col-lg-7">
          <ProductList />
        </div>

        <div class="col-lg-5">
          <ShoppingCart class="mb-4" />
          <OrderSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import OrderSummary from "../components/OrderSummary.vue";

export default {
  name: "HomeMain",
  components: { ProductList, ShoppingCart, OrderSummary },
  computed: {
    cartCount() {
      return this.$store.getters.cantidadCarrito;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
  },
  methods: {
    async logoutUser() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>