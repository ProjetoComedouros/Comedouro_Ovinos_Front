<template>
  <footer class="site-footer bg-light pt-5">
    <div class="container">

      

      <!-- 2) Seção de contato -->
      <div class="row align-items-start mb-5">
        <div class="col-md-6 mb-4">
          <h4>Entre em contato conosco</h4>
          <p>Para dúvidas, ou mais informações, preencha o formulário ao lado ou fale conosco nas redes sociais.</p>
          <div class="mt-3">
            <a href="#" class="text-success me-3"><i class="bi bi-facebook fs-2"></i></a>
            <a href="#" class="text-success me-3"><i class="bi bi-twitter fs-2"></i></a>
            <a href="#" class="text-success me-3"><i class="bi bi-linkedin fs-2"></i></a>
            <a href="#" class="text-success me-3"><i class="bi bi-whatsapp fs-2"></i></a>
            <a href="#" class="text-success"><i class="bi bi-instagram fs-2"></i></a>
          </div>
        </div>
        <div class="col-md-6">

          <form @submit.prevent="enviarContato">
            <div class="row g-3">
              <div class="col-md-6">
                <input v-model="form.nome" type="text" class="form-control" placeholder="Nome *" required>
              </div>
              <div class="col-md-6">
                <input v-model="form.sobrenome" type="text" class="form-control" placeholder="Sobrenome *" required>
              </div>
              <div class="col-md-6">
                <input v-model="form.email" type="email" class="form-control" placeholder="E-mail *" required>
              </div>
              <div class="col-md-6">
                <input v-model="form.assunto" type="text" class="form-control" placeholder="Assunto">
              </div>
              <div class="col-12">
                <textarea v-model="form.mensagem" class="form-control" rows="4" placeholder="Sua mensagem *" required></textarea>
              </div>
              <div class="col-12 text-end">
                <small class="text-danger">* Campos obrigatórios</small><br>
                <button type="submit" class="btn btn-success mt-2 px-4">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- 3) Linha de copyright -->
      <div class="text-center pt-3 border-top">
        <!-- 1) Bloco principal de logo e links -->
      <div class="row mb-5">
        <div class="col-md-4 footer-logo">
          <img src="assets/img/logo.svg" alt="Comedouros">
          <p>Inteligência que conecta a pecuária</p>
        </div>
        <div class="col-md-2 footer-links">
          <h6>Institucional</h6>
          <ul>
            <li><a href="#">Quem somos</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Trabalhe conosco</a></li>
          </ul>
        </div>
        <div class="col-md-2 footer-links">
          <h6>Pesquisa</h6>
          <ul>
            <li><a href="#">Sobre</a></li>
          </ul>
        </div>
        <div class="col-md-2 footer-links">
          <h6>Informações</h6>
          <ul>
            <li><a href="#">Lorem</a></li>
            <li><a href="#">Agro</a></li>
            <li><a href="#">Automação</a></li>
          </ul>
        </div>
        <div class="col-md-2 footer-links">
          <h6>Santa Maria – RS</h6>
          <ul>
            <li>Rua XXX</li>
            <li>YYY</li>
            <li>CEP: XX.XXX-XXX</li>
          </ul>
        </div>
      </div>



        <p class="mb-0">&copy; 2025 Comedouros Automáticos Inteligentes. Todos os direitos reservados.</p>
    
      
      </div>
    </div>
  </footer>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'SiteFooter',   // ← nome multi-palavra
  setup() {
    const form = reactive({ nome:'', sobrenome:'', email:'', assunto:'', mensagem:'' })
    function enviarContato() {
      console.log('Enviando formulário:', form)
      alert('Sua mensagem foi enviada!')
      Object.keys(form).forEach(k => (form[k] = ''))
    }
    return { form, enviarContato }
  }
}
</script>


<style scoped>
.site-footer {
  font-family: 'Open Sans', sans-serif;
  background-color: #20913C;
}
.footer-links h6 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.footer-links ul {
  list-style: none;
  padding: 0;
}
.footer-links a {
  text-decoration: none;
  color: inherit;
}
</style>
