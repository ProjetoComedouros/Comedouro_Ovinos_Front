<template>
  <div class="login-container">
    <h2 class="login-title">Login</h2>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue'

export default {
  name: "LoginContainer",
  components: { LoginForm }
}
</script>

<style scoped>
.login-container {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  color: #333;
}
</style>
