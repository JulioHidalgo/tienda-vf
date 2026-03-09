<template>
  <div class="auth-page">
    <div class="stars"></div>
    <div class="twinkling"></div>

    <div class="container position-relative auth-content">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-8 col-lg-5">
          <div class="text-center mb-4">
            <h1 class="title-glow">REGISTRARME</h1>
            <p class="text-light">Crea tu cuenta para comprar</p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "RegisterView",
  components: { RegisterForm },
};
</script>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #000;
}
.auth-content {
  z-index: 2;
}
.title-glow {
  color: #fff;
  font-family: "Orbitron", sans-serif;
  letter-spacing: 3px;
  text-shadow: 0 0 5px #00bfff, 0 0 12px #00bfff, 0 0 18px #005eff;
}
.stars,
.twinkling {
  position: absolute;
  inset: 0;
}
.stars {
  background:
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 120px 80px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 240px 150px, #fff, transparent),
    radial-gradient(2px 2px at 380px 40px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 520px 120px, #fff, transparent),
    radial-gradient(2px 2px at 680px 200px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 860px 90px, #fff, transparent),
    radial-gradient(2px 2px at 1000px 160px, #fff, transparent),
    #000;
}
.twinkling {
  background:
    radial-gradient(2px 2px at 60px 100px, rgba(0, 191, 255, 0.8), transparent),
    radial-gradient(2px 2px at 280px 220px, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 560px 90px, rgba(0, 191, 255, 0.7), transparent);
  opacity: 0.6;
  animation: moveTwinkling 12s linear infinite;
}
@keyframes moveTwinkling {
  from { transform: translateY(0); }
  to { transform: translateY(-40px); }
}
</style>