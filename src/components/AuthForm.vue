<template>
  <div class="card shadow-sm mb-4">
    <div class="card-header fw-bold">Acceso de usuario</div>

    <div class="card-body">
      <div v-if="!isAuthenticated">
        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Correo"
          />
        </div>

        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Contraseña"
          />
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-primary" @click="loginUser">
            Iniciar sesión
          </button>

          <button class="btn btn-outline-success" @click="registerUser">
            Registrarse
          </button>
        </div>

        <div v-if="authError" class="alert alert-danger mt-3 mb-0">
          {{ authError }}
        </div>
      </div>

      <div v-else>
        <p class="mb-2">Bienvenido: <strong>{{ userEmail }}</strong></p>
        <button class="btn btn-danger" @click="logoutUser">Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
    authError() {
      return this.$store.state.authError;
    },
  },
  methods: {
    loginUser() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    registerUser() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
      });
    },
    logoutUser() {
      this.$store.dispatch("logout");
    },
  },
};
</script>