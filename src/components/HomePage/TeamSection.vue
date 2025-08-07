<template>
  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4">Quem Somos</h2>
      <div class="row">
        <TeamCard
          v-for="(membro, index) in membros"
          :key="index"
          :nome="membro.nome"
          :funcao="membro.funcao"
          :imagem="membro.imagem"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TeamCard from '@/components/HomePage/TeamCard.vue'

export default {
  components: { TeamCard },
  data() {
    return {
      membros: [
        {
          nome: 'Lucas Quadros',
          funcao: 'Desenvolvedor Front-End',
          imagem: '/images/lucas.jpg'
        },
        {
          nome: 'João Silva',
          funcao: 'Engenheiro de Hardware',
          imagem: '/images/joao.jpg'
        },
        {
          nome: 'Maria Oliveira',
          funcao: 'Analista de Dados',
          imagem: '/images/maria.jpg'
        }
      ]
    }
  }
}
</script>