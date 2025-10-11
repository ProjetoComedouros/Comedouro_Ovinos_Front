<template>
  <div>
    <Navbar />
    <Sidebar />

    <div class="content">
      <h3 class="mb-4">Relatório</h3>
      <ReportHeader :selecionado="selecionado" />

    
      <section class="dash">
        <h5 class="mb-3">Análise gráfica</h5>

  


        <div class="toolbar">
          <div class="seg">
            <button :class="{active: modo==='animal'}" @click="modo='animal'">Animal</button>
            <button :class="{active: modo==='lote'}"   @click="modo='lote'">Lote</button>
            <button :class="{active: modo==='geral'}"  @click="modo='geral'">Geral</button>
          </div>
          

          <div v-if="modo==='animal'">
            <label>ID do Animal:
              <input v-model="animalId" placeholder="ex: 01" 
              @input="modo='animal'" 
              />
            </label>
          </div>

          <div v-if="modo==='lote'">
            <label>ID do Lote:
              <input v-model="loteId" placeholder="ex: A"
              @input="modo='lote'" />
            </label>
          </div>


          
      
          
          <div class="seg">
            <span style="margin-right:8px;">Mostrar:</span>
            <button :class="{active: grafSelecionado==='todos'}"        @click="grafSelecionado='todos'">Todos</button>
            <button :class="{active: grafSelecionado==='ingestivo'}"    @click="grafSelecionado='ingestivo'">Comp. Ingestivo</button>
            <button :class="{active: grafSelecionado==='desempenho'}"   @click="grafSelecionado='desempenho'">Desempenho</button>
            <button :class="{active: grafSelecionado==='viabilidade'}"  @click="grafSelecionado='viabilidade'">Viabilidade</button>
          
          </div>
        </div>

        <div v-if="selecionadoPonto" class="info">
          <strong>Selecionado:</strong>
          ID {{ selecionadoPonto.id }} | Lote {{ selecionadoPonto.lote }} | x: {{ selecionadoPonto.x }} | y: {{ selecionadoPonto.y }}

        </div>
        <p v-if="mensagemErro" class="text-red-600 font-bold mt-2">
          {{ mensagemErro }}
           </p>

        <div class="grid">



          <IngestivoCharts
            :pontos="fonte"
            :graf-selecionado="grafSelecionado"
            :highlight-id="highlightId"
            :minutes-to-time="minutesToTime"
            :format-date="formatDate"
            @point-click="onPointClick"
          />
          

          <DesempenhoCharts
            :pontos="fonte"
            :graf-selecionado="grafSelecionado"
            :highlight-id="highlightId"
            :format-date="formatDate"
            :format-kg="formatKg"
            @point-click="onPointClick"
          />
          
          <ViabilidadeCharts
            :pontos="fonte"
            :graf-selecionado="grafSelecionado"
            :highlight-id="highlightId"
            :format-date="formatDate"
            :format-kg="formatKg"
            :format-reais="formatReais"
            @point-click="onPointClick"
          />
          
        </div>
      </section>
      

      <h5 class="mt-4 mb-2">(esses dps aparecem somente ao clicar no animal no gráfico)</h5>
      <div class="table-placeholder">
        <div class="row fw-semibold mb-2">
          <div class="col-md">Animal</div>
          <div class="col-md">Comp. Digestivo</div>
          <div class="col-md">Desempenho</div>
          <div class="col-md">Viabilidade</div>
        </div>
        <AnimalCard v-for="animal in animais" :key="animal.id" :animal="animal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/ReportPage/ReportNavbar.vue'
import Sidebar from '@/components/ReportPage/ReportSidebar.vue'
import ReportHeader from '@/components/ReportPage/ReportHeader.vue'
import AnimalCard from '@/components/ReportPage/AnimalCard.vue'

import IngestivoCharts from '@/components/charts/IngestivoCharts.vue'
import DesempenhoCharts from '@/components/charts/DesempenhoCharts.vue'
import ViabilidadeCharts from '@/components/charts/ViabilidadeCharts.vue'

import { DATA } from '@/data/mock.js'  // futuramente trocamos pelo axios


const minutesToTime = (mins) => {
  const h = String(Math.floor(mins / 60)).padStart(2, '0')
  const m = String(Math.round(mins % 60)).padStart(2, '0')
  return `${h}:${m}`
}

// Formatter para datas no formato dd/MM/yyyy
const formatDate = (date) => {
  // Se já for string, tenta converter normalmente
  if (typeof date === 'string') {
    const d = new Date(date)
    if (isNaN(d)) return date
    return d.toLocaleDateString('pt-BR')
  }
  // Se for número (timestamp), converte também
  if (typeof date === 'number') {
    const d = new Date(date)
    if (isNaN(d)) return date
    return d.toLocaleDateString('pt-BR')
  }
  return ''
}

const formatKg = (value) => `${value} kg`

const formatReais = (value) => {
  // Formata como moeda brasileira
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const selecionado = ref(false)



// ====== CONTROLES DA SEÇÃO ======
const modo = ref('animal')                 // 'animal' | 'lote' | 'geral'
const animalId = ref('')
const loteId = ref('A')
const grafSelecionado = ref('todos')     // 'todos' | 'ingestivo' | 'desempenho' | 'viabilidade'

const mensagemErro = ref('')


const fonte = computed(() => {
  const emptySource = { ingestivo: [], desempenho: [], viabilidade: [], custo: [], evolucaocusto: [], EvolucaoPVPeriodo: [], EvolucaoPVDia: [], EvolucaoGMD: [], EvolucaoGanho: [], horaEntrada: [], horaSaida: [], minRefeicao: [], consumoDiario: [], ganhopordia: [] };

  // Quando o modo for 'animal' ou 'lote', a fonte de dados será sempre o lote selecionado.
  // A filtragem visual será feita pelo highlight, não aqui.
  if (modo.value === 'animal' || modo.value === 'lote') {
    return DATA.lotes[loteId.value] ?? emptySource;
  }

  // Se o modo for 'geral', retorna os dados gerais
  if (modo.value === 'geral') {
    return DATA.geral;
  }

  return emptySource;
});

import { watch } from 'vue'

watch(animalId, (novoId) => {
  if (modo.value === 'animal') {
    if (!novoId) {                // vazio → sem erro
      mensagemErro.value = ''
      return
    }
    const lote = DATA.lotes[loteId.value]
    if (!lote) {
      mensagemErro.value = `⚠️ Nenhum lote com ID "${loteId.value}" encontrado.`
      return
    }
    const existeNoLote = Object.values(lote).some((arr) =>
      (arr ?? []).some(item => item.id === novoId)
    )
    mensagemErro.value = existeNoLote
      ? ''
      : `⚠️ O animal "${novoId}" não foi encontrado no lote "${loteId.value}".`
  }
})

watch(loteId, (novoId) => {
  if (modo.value === 'lote') {
    if (!novoId || !DATA.lotes[novoId]) {
      mensagemErro.value = novoId ? `⚠️ Nenhum lote com ID "${novoId}" encontrado.` : ''
    } else {
      mensagemErro.value = ''
    }
  }
})



const selecionadoPonto = ref(null)
const onPointClick = (p) => { selecionadoPonto.value = p }

// Esta computed property decide qual ID deve ser destacado no gráfico.
const highlightId = computed(() => {
  // Se um ponto foi clicado, ele tem prioridade.
  if (selecionadoPonto.value) {
    return selecionadoPonto.value.id;
  }
  // Se estiver no modo 'animal' e um ID foi digitado, use esse ID.
  if (modo.value === 'animal' && animalId.value) {
    return animalId.value;
  }
  // Caso contrário, nenhum ponto deve ser destacado.
  return null;
});

// ====== DADOS DA TABELA ====== //NAO USAMOS MAIS ESSE
const animais = ref([
  { id: 'ovelha1', nome: 'Ovelha 01', digestivo: 'OK',  desempenho: 'Alta',  viabilidade: 'Viável'   },
  { id: 'ovelha2', nome: 'Ovelha 02', digestivo: 'OK',  desempenho: 'Baixa', viabilidade: 'Inviável' },
  { id: 'ovelha3', nome: 'Ovelha 03', digestivo: 'OK',  desempenho: 'Baixa', viabilidade: 'Inviável' }
])
</script>

<style scoped>
:root {
  --verde-nata: #198754;
  --fundo-claro: #f8f9fa;
  --texto-cinza: #444;
}
body { font-family: 'Segoe UI', sans-serif; }
.content { margin-left: 220px; padding: 2rem; margin-top: 56px; }

/* seção nova */
.dash{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px 16px}
.toolbar{
  display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-bottom:12px;
  background:#fafafa;border:1px solid #eee;border-radius:10px;padding:10px 12px
}
.seg{display:flex;gap:8px;align-items:center;background:#f3f4f6;padding:6px;border-radius:10px}
.seg button{border:none;background:transparent;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600}
.seg button.active{background:#111;color:#fff}
input{padding:8px 10px;border:1px solid #ddd;border-radius:8px}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
@media (max-width:1200px){ .grid{grid-template-columns:1fr} }
.info{margin:8px 0 14px;padding:8px 12px;border-left:4px solid #2563eb;background:#eef2ff;border-radius:8px}

/* tabela (seu estilo original) */
.table-placeholder { background-color:#ffffff; border:1px solid #dee2e6; padding:1rem; border-radius:8px; margin-top: 1rem; }
</style>  