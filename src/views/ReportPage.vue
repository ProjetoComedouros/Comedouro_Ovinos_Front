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
              <input v-model="animalId" placeholder="ex: 01" />
            </label>
          </div>

          <div v-if="modo==='lote'">
            <label>ID do Lote:
              <input v-model="loteId" placeholder="ex: A" />
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

        <div class="grid">
          <ScatterBubbles
            v-if="grafSelecionado==='todos' || grafSelecionado==='ingestivo'"
            title="Comportamento Ingestivo"
            :pontos="fonte.ingestivo"
            x-label="Presença no comedouro"
            y-label="Horas"
            color="#f59e0b"
            :highlight-id="selecionadoPonto?.id"
            @point-click="onPointClick"
          />

          <ScatterBubbles
            v-if="grafSelecionado==='todos' || grafSelecionado==='desempenho'"
            title="Desempenho"
            :pontos="fonte.desempenho"
            x-label="Peso Vivo (kg)"
            y-label="Custo/dia (R$)"
            color="#16a34a"
            :highlight-id="selecionadoPonto?.id"
            @point-click="onPointClick"
          />

          <ScatterBubbles
            v-if="grafSelecionado==='todos' || grafSelecionado==='viabilidade'"
            title="Viabilidade"
            :pontos="fonte.viabilidade"
            x-label="Dias"
            y-label="Índice"
            color="#2563eb"
            :highlight-id="selecionadoPonto?.id"
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
import ScatterBubbles from '@/components/ScatterBubbles.vue'

const selecionado = ref(false)

// ====== DADOS EXEMPLO (troque pelo backend quando tiver) ======
const DATA = {
  lotes: {
    A: {
      ingestivo: [
        { id:'01', lote:'A', x:1, y:0.16, r:6 },
        { id:'02', lote:'A', x:2, y:0.30, r:7 },
        { id:'03', lote:'A', x:3, y:0.36, r:6 },
        { id:'04', lote:'A', x:4, y:0.43, r:5 },
      ],
      desempenho: [
        { id:'01', lote:'A', x:41.0, y:0.54, r:8 },
        { id:'02', lote:'A', x:42.1, y:0.60, r:9 },
        { id:'03', lote:'A', x:43.1, y:0.68, r:7 }
      ],
      viabilidade: [
        { id:'01', lote:'A', x:6, y:1.18, r:7 },
        { id:'02', lote:'A', x:7, y:1.22, r:6 },
        { id:'03', lote:'A', x:8, y:1.25, r:6 }
      ]
    }
  },
  animais: {
    '01': {
      ingestivo: [
        { id:'01', lote:'A', x:1, y:0.16, r:6 },
        { id:'01', lote:'A', x:2, y:0.25, r:6 },
        { id:'01', lote:'A', x:3, y:0.33, r:6 },
        { id:'01', lote:'A', x:4, y:0.40, r:6 }
      ],
      desempenho: [
        { id:'01', lote:'A', x:35, y:0.0, r:6 },
        { id:'01', lote:'A', x:41, y:0.54, r:8 }
      ],
      viabilidade: [
        { id:'01', lote:'A', x:6, y:1.18, r:7 },
        { id:'01', lote:'A', x:7, y:1.22, r:7 }
      ]
    }
  },
  geral: {
    ingestivo: [
      { id:'A-01', lote:'A', x:1, y:0.18, r:6 },
      { id:'A-02', lote:'A', x:2, y:0.30, r:7 }
    ],
    desempenho: [
      { id:'A-01', lote:'A', x:41, y:0.54, r:8 }
    ],
    viabilidade: [
      { id:'A-01', lote:'A', x:6, y:1.18, r:7 }
    ]
  }
}

// ====== CONTROLES DA SEÇÃO ======
const modo = ref('lote')                 // 'animal' | 'lote' | 'geral'
const animalId = ref('')
const loteId = ref('A')
const grafSelecionado = ref('todos')     // 'todos' | 'ingestivo' | 'desempenho' | 'viabilidade'

const fonte = computed(() => {
  if (modo.value === 'animal' && animalId.value) {
    return DATA.animais[animalId.value] ?? { ingestivo: [], desempenho: [], viabilidade: [] }
  }
  if (modo.value === 'lote' && loteId.value) {
    return DATA.lotes[loteId.value] ?? { ingestivo: [], desempenho: [], viabilidade: [] }
  }
  return DATA.geral
})

const selecionadoPonto = ref(null)
const onPointClick = (p) => { selecionadoPonto.value = p }

// ====== DADOS DA TABELA ======
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
