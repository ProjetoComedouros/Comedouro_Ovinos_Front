<template>
  <div class="animal-chart">
    <apexchart
      type="donut"
      height="250"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: 'AnimalChart',
  props: {
    desempenho: { type: String, required: true },
    digestivo: { type: String, required: true },
    viabilidade: { type: String, required: true }
  },
  computed: {
    series() {
      // Exemplo simples — cada atributo "OK/Alta/Viável" conta como 1 ponto
      let score = [
        this.digestivo === 'OK' ? 1 : 0,
        this.desempenho === 'Alta' ? 1 : 0,
        this.viabilidade === 'Viável' ? 1 : 0
      ]
      return score
    },
    chartOptions() {
      return {
        labels: ['Digestivo', 'Desempenho', 'Viabilidade'],
        colors: ['#00E396', '#FEB019', '#775DD0'],
        legend: { position: 'bottom' },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: this.desempenho,
                  formatter: () => {
                    let pct = Math.round(
                      (this.series.reduce((a, b) => a + b, 0) / 3) * 100
                    )
                    return `${pct}%`
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.animal-chart {
  margin-top: 1rem;
}
</style>