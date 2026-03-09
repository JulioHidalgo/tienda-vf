<template>
  <div class="card bg-dark text-white shadow-sm">
    <div class="card-header fw-bold">Resumen de pedido</div>

    <div class="card-body">
      <p class="mb-2">Items: <strong>{{ cartCount }}</strong></p>
      <p class="mb-3">Total: <strong>$ {{ cartTotal }}</strong></p>

      <button class="btn btn-success w-100" :disabled="cartCount === 0" @click="checkout">
        Finalizar compra
      </button>

      <div v-if="lastOrderId" class="alert alert-light mt-3 mb-0">
        Compra guardada ✅ ID: <strong>{{ lastOrderId }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartCount() {
      return this.$store.getters.cantidadCarrito;
    },
    cartTotal() {
      return this.$store.getters.totalCarrito;
    },
    lastOrderId() {
      return this.$store.state.lastOrderId;
    },
  },
  methods: {
    checkout() {
      this.$store.dispatch("realizarCompra");
    },
  },
};
</script>