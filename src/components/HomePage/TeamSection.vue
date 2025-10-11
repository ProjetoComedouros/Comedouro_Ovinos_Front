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
        { name: 'Rafael Sanches Venturini', role: 'Zootecnista, Dr., Professor do Departamento de Ensino, Colégio Politécnico da Universidade Federal de Santa Maria - UFSM/POLI ', img: 'assets/img/team1.jpg' },
        { name: 'Fernando Mariano Bayer', role: 'Engenheiro Mecânico, Dr., Professor do Departamento de Ensino, Colégio Técnico Industrial de Santa Maria - UFSM/CTISM', img: 'assets/img/team2.jpg' },
        { name: 'Leandro Roggia', role: 'Engenheiro Eletricista, Dr., Professor do Departamento de Ensino, Colégio Técnico Industrial de Santa Maria - UFSM/CTISM.', img: 'assets/img/team3.jpg' },
        { name: 'Luciano Retzlaff', role: 'Engenheiro Eletricista, Dr., Professor do Departamento de Ensino, Colégio Técnico Industrial de Santa Maria - UFSM/CTISM.', img: 'assets/img/team3.jpg' },
        { name: 'Renato Preigschadt de Azevedo', role: 'Ciência da Computação, Dr., Professor do Departamento de Ensino, Colégio Técnico Industrial de Santa Maria - UFSM/CTISM. ', img: 'assets/img/team3.jpg' },
        { name: 'Arthur Montero Portella', role: 'Discente do curso de Engenharia da Computação, Universidade Federal de Santa Maria, UFSM, Brasil.  - UFSM. Av. Roraima, 1000 - Camobi, Santa Maria - RS, 97105-000', img: 'assets/img/team3.jpg' },
        { name: 'Eduarda Padilha Zorzo', role: 'Discente do curso de Sistemas para a Internet, Colégio Politécnico da Universidade Federal de Santa Maria - UFSM/POLI. Av. Roraima, 1000 - Camobi, Santa Maria - RS, 97105-000', img: 'assets/img/team3.jpg' },
        { name: 'Lucas de Quadros', role: 'Discente do curso de Tecnologia em Redes de Computadores, Universidade Federal de Santa Maria, UFSM, Brasil. - UFSM/POLI. Av. Roraima, 1000 - Camobi, Santa Maria - RS, 97105-000', img: 'assets/img/team3.jpg' },
        { name: 'Victor Couto Cardoso', role: 'Discente do curso de Tecnologia em Fabricação Mecânica, Universidade Federal de Santa Maria, UFSM, Brasil - UFSM/POLI. Av. Roraima, 1000 - Camobi, Santa Maria - RS, 97105-000', img: 'assets/img/team3.jpg' },
        {name: 'Henrique De Barros Da Silva', role: 'Discente do curso de Tecnologia em Eletrônica Industrial, Universidade Federal de Santa Maria, UFSM, Brasil - UFSM/POLI. Av. Roraima, 1000 - Camobi, Santa Maria - RS, 97105-000', img: 'assets/img/team3.jpg' },
      ]
    }
  }
}
</script>