<template>
  <div class="card bg-dark text-white shadow-sm">
    <div class="card-header fw-bold">Carrito</div>

    <div class="card-body">
      <div v-if="cart.length === 0" class="text-muted">
        Tu carrito está vacío.
      </div>

      <ul v-else class="list-group">
        <li class="list-group-item bg-white text-dark d-flex justify-content-between align-items-center"
            v-for="item in cart" :key="item.id">
          <div>
            <div class="fw-bold">{{ item.name }}</div>
            <small>$ {{ item.price }} c/u</small>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary" @click="dec(item.id)">-</button>
            <span class="badge bg-dark">{{ item.qty }}</span>
            <button class="btn btn-sm btn-outline-secondary" @click="add(item)">+</button>
            <button class="btn btn-sm btn-outline-danger" @click="remove(item.id)">x</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {
    add(item) {
      this.$store.dispatch("agregarAlCarrito", { id: item.id, name: item.name, price: item.price });
    },
    dec(id) {
      this.$store.dispatch("decrementarCantidad", id);
    },
    remove(id) {
      this.$store.dispatch("eliminarDelCarrito", id);
    },
  },
};
</script>