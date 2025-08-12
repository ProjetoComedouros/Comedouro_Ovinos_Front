<template>

  <br>
    <section id="beneficios" class="py-5">
      <div class="container">
        <div class="row g-4">
          <FeatureCard
            v-for="(f, i) in features"
            :key="i"
            :icon="f.icon"
            :title="f.title"
            :text="f.text"
          />
        </div>
      </div>
    </section>
<br>

</template>

<script>
import FeatureCard from './FeatureCard.vue'

export default {
  components: { FeatureCard },
  data() {
    return {
      features: [
        { icon: 'bi-gear-fill', title: 'Alta Precisão', text: 'Controle exato da quantidade de ração para cada animal.' },
        { icon: 'bi-currency-dollar', title: 'Economia', text: 'Redução de até 30% no desperdício de alimento.' },
        { icon: 'bi-wifi', title: 'Conectividade', text: 'Monitoramento remoto via app e alertas em tempo real.' },
        { icon: 'bi-graph-up', title: 'Relatórios Inteligentes', text: 'Análise de dados para otimização do rebanho.' },
        { icon: 'bi-shield-lock-fill', title: 'Segurança', text: 'Dados protegidos e acesso controlado.' },
        { icon: 'bi-people-fill', title: 'Suporte Especializado', text: 'Equipe pronta para ajudar sempre que precisar.' }
      ]
    };
  }
};
</script>
