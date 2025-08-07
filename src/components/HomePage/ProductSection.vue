<template>
  <section id="produtos" class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4">Nossos Produtos</h2>
      <div class="row">
        <FeatureCard
          v-for="(produto, index) in produtos"
          :key="index"
          :titulo="produto.titulo"
          :descricao="produto.descricao"
          :imagem="produto.imagem"
        />
      </div>
    </div>
  </section>
</template>

<script>
import FeatureCard from './FeatureCard.vue'

export default {
  components: { FeatureCard },
  data() {
    return {
      produtos: [
        {
          titulo: 'Comedouro Inteligente',
          descricao: 'Monitora e registra a alimentação dos ovinos em tempo real.',
          imagem: '/images/comedouro.png'
        },
        {
          titulo: 'Painel de Controle',
          descricao: 'Gerencie e visualize dados dos comedouros de forma centralizada.',
          imagem: '/images/painel.png'
        },
        {
          titulo: 'Sensor de Presença',
          descricao: 'Detecta automaticamente a presença dos animais no comedouro.',
          imagem: '/images/sensor.png'
        }
      ]
    }
  }
}
</script>
