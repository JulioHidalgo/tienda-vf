<template>
  <div class="card bg-dark text-white shadow-sm">
    <div class="card-header fw-bold">Productos</div>

    <div class="card-body">
      <div v-if="loading" class="alert alert-light mb-0">Cargando productos...</div>

      <div v-else class="row g-3">
        <div class="col-md-6" v-for="p in products" :key="p.id">
          <div class="card bg-dark text-white h-100">
            <img :src="p.image" class="card-img-top" alt="product" />
            <div class="card-body">
              <h5 class="card-title">{{ p.name }}</h5>
              <p class="card-text">{{ p.description }}</p>
              <p class="fw-bold mb-3">$ {{ p.price }}</p>
              <button
                class="btn btn-primary w-100"
                @click="add(p)"
                :disabled="!isAuthenticated"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    loading() {
      return this.$store.state.loadingProducts;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  mounted() {
    this.$store.dispatch("obtenerProductos");
  },
  methods: {
    add(product) {
      this.$store.dispatch("agregarAlCarrito", {
        id: product.id,
        name: product.name,
        price: product.price,
      });
    },
  },
};
</script>