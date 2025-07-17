
<template>
    
<form>
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input type="email" class="form-control" id="email" placeholder="seu@email.com" />
      </div>
      <div class="mb-3">
        <label for="senha" class="form-label">Senha</label>
        <input type="password" class="form-control" id="senha" placeholder="********" />
      </div>

      <!-- BOTÃO QUE REDIRECIONA DIRETO -->
      <a href="Report.html" class="btn btn-success w-100 mt-2">Entrar</a>
    </form>

</template>

<script>
export default {
  name: 'LoginForm',    
}
</script>