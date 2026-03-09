<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand">Tienda</span>
        <span class="badge bg-light text-dark">
          🛒 {{ cartCount }} items
        </span>
      </div>
    </nav>

    <div class="container my-4">
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
  components: { ProductList, ShoppingCart, OrderSummary },
  computed: {
    cartCount() {
      return this.$store.getters.cantidadCarrito;
    },
  },
};
</script>