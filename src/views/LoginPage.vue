<template>
  <div class="login-page">
    <LoginContainer />
  </div>
</template>

<script>
import LoginContainer from '@/components/Login/LoginContainer.vue'

export default {
  name: "LoginPage",
  components: { LoginContainer }
}
</script>

<style scoped>
.login-page {
  background-color: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>