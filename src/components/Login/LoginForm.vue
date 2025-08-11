<template>
  <form>
    <div class="mb-3">
      <label for="email" class="form-label">E-mail</label>
      <input 
        type="email" 
        class="form-control" 
        id="email" 
        placeholder="seu@email.com" 
        required 
      />
    </div>

    <div class="mb-3">
      <label for="senha" class="form-label">Senha</label>
      <input 
        type="password" 
        class="form-control" 
        id="senha" 
        placeholder="********" 
        required 
      />
    </div>

    <div class="d-flex gap-2 mt-2">
    <router-link to="/report" type="submit" class="btn btn-success w-100 mt-2">
      Entrar
    </router-link>
    <router-link to="/" type="submit" class="btn btn-success w-100 mt-2">
      Registrar
    </router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>