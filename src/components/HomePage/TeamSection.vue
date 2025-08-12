<template>
  <section id="quem-somos" class="py-5 quem-somos-section">
    <div class="container">
      <div class="text-center mb-4">
        <h2 class="fw-bold" style="font-family: var(--font-heading);">Quem somos?</h2>
        <p class="text-muted">
          Conheça a equipe qualificada da Universidade Federal de Santa Maria
        </p>
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="(membro, index) in membros" :key="index" class="col">
          <TeamCard
            :nome="membro.name"
            :funcao="membro.role"
            :imagem="membro.img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TeamCard from '@/components/HomePage/TeamCard.vue';

export default {
  components: { TeamCard },
  data() {
    return {
      membros: [
        { name: 'Rafael Sanches Venturini', role: 'Coordenador', img: 'assets/img/team1.jpg' },
        { name: 'Fernando Mariano Bayer', role: 'Coordenador-adjunto', img: 'assets/img/team2.jpg' },
        { name: 'Leandro Roggia', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
        { name: 'Luciano Retzlaff', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
        { name: 'Renato Preigschadt de Azevedo', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
        { name: 'Arthur Montero Portella', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
        { name: 'Eduarda Padilha Zorzo', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
        { name: 'Henrique De Barros Da Silva', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
        { name: 'Victor Couto Cardoso', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
        { name: 'Lucas de Quadros', role: 'Coordenador-adjunto', img: 'assets/img/team3.jpg' },
      ]
    }
  }
}
</script>