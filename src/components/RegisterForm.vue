<template>
  <div class="card auth-card shadow-lg border-0">
    <div class="card-header text-center fw-bold fs-4">Registrarme</div>

    <div class="card-body p-4">
      <div class="mb-3">
        <label class="form-label text-light">Correo</label>
        <input
          v-model.trim="email"
          type="email"
          class="form-control"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div class="mb-3">
        <label class="form-label text-light">Contraseña</label>
        <input
          v-model.trim="password"
          type="password"
          class="form-control"
          placeholder="mínimo 6 caracteres"
        />
      </div>

      <div class="mb-3">
        <label class="form-label text-light">Confirmar contraseña</label>
        <input
          v-model.trim="confirmPassword"
          type="password"
          class="form-control"
          placeholder="repite la contraseña"
          @keyup.enter="registerUser"
        />
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-info" @click="registerUser">
          Crear cuenta
        </button>
        <router-link to="/login" class="btn btn-outline-light">
          Ya tengo cuenta
        </router-link>
      </div>

      <div v-if="localError" class="alert alert-warning mt-3 mb-0">
        {{ localError }}
      </div>

      <div v-if="authError" class="alert alert-danger mt-3 mb-0">
        {{ authError }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      localError: "",
    };
  },
  computed: {
    authError() {
      return this.$store.state.authError;
    },
  },
  methods: {
    async registerUser() {
      this.localError = "";

      if (!this.email || !this.password || !this.confirmPassword) {
        this.localError = "Completa todos los campos.";
        return;
      }

      if (this.password.length < 6) {
        this.localError = "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.localError = "Las contraseñas no coinciden.";
        return;
      }

      await this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
      });

      if (this.$store.getters.isAuthenticated) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.auth-card {
  background: rgba(8, 12, 24, 0.9);
  backdrop-filter: blur(6px);
  color: white;
  border-radius: 18px;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.35), 0 0 24px rgba(0, 191, 255, 0.18);
}
.card-header {
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  border-bottom: 1px solid rgba(0, 191, 255, 0.25);
}
.form-control {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(0, 191, 255, 0.25);
  color: white;
}
.form-control::placeholder {
  color: rgba(255, 255, 255, 0.55);
}
.form-control:focus {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border-color: #00bfff;
  box-shadow: 0 0 0 0.2rem rgba(0, 191, 255, 0.2);
}
</style>