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
            <button :class="{ active: modo === 'animal' }" @click="modo = 'animal'">Animal</button>
            <button :class="{ active: modo === 'lote' }" @click="modo = 'lote'">Lote</button>
            <button :class="{ active: modo === 'geral' }" @click="modo = 'geral'">Geral</button>
          </div>


          <!-- Campo para ANIMAL -->
          <div v-if="modo === 'animal'" class="input-group">
            <div class="input-item">
              <label for="animalIdInput">ID do Animal:</label>
              <input id="animalIdInput" v-model.trim="animalId" placeholder="ex: 01"
                :class="{ 'erro': mensagemErro.includes('animal') }" style="width: 100px;" />
            </div>
            <div class="input-item">
              <label for="loteIdAnimalInput">Lote:</label>
              <input id="loteIdAnimalInput" v-model.trim="loteId" placeholder="ex: A"
                :class="{ 'erro': mensagemErro.includes('lote') }" style="width: 80px;" />
            </div>
          </div>

          <!-- Campo para LOTE -->
          <div v-if="modo === 'lote'" class="input-group">
            <label>
              ID do Lote:
              <input v-model.trim="loteId" placeholder="ex: A" @input="modo = 'lote'"
                :class="{ 'erro': mensagemErro.includes('lote') }" />
            </label>
          </div>



          <div class="seg">
            <span style="margin-right:8px;">Mostrar:</span>
            <button :class="{ active: grafSelecionado === 'todos' }" @click="grafSelecionado = 'todos'">Todos</button>
            <button :class="{ active: grafSelecionado === 'ingestivo' }" @click="grafSelecionado = 'ingestivo'">Comp.
              Ingestivo</button>
            <button :class="{ active: grafSelecionado === 'desempenho' }"
              @click="grafSelecionado = 'desempenho'">Desempenho</button>
            <button :class="{ active: grafSelecionado === 'viabilidade' }"
              @click="grafSelecionado = 'viabilidade'">Viabilidade</button>

          </div>
        </div>
        <div v-if="selecionadoPonto" class="info">
          <template v-if="selecionadoPonto">
            <p>
              <strong>Selecionado:</strong>

              ID {{ animalId || selecionadoPonto.id }}

              | Lote {{ selecionadoPonto.lote || loteId }}

              | Data/Ref: {{ formatDate(selecionadoPonto.x) }}

              | {{ selecionadoPonto.y_unit || 'Valor' }}: {{ formatSelectedY(selecionadoPonto) }}
            </p>
          </template>
        </div>
        <p v-if="mensagemErro" class="text-red-600 font-bold mt-2">
          {{ mensagemErro }}
        </p>

        <div class="grid">



          <IngestivoCharts :pontos="fonte" :graf-selecionado="grafSelecionado" :highlight-id="highlightId"
            :minutes-to-time="minutesToTime" :format-date="formatDate" @point-click="onPointClick" />


          <DesempenhoCharts :pontos="fonte" :graf-selecionado="grafSelecionado" :highlight-id="highlightId"
            :tipo-alvo="modo" :id-alvo="animalId" :format-date="formatDate" :format-kg="formatKg"
            @point-click="onPointClick" />

          <ViabilidadeCharts :pontos="fonte" :graf-selecionado="grafSelecionado" :highlight-id="highlightId"
            :format-date="formatDate" :format-kg="formatKg" :format-reais="formatReais" @point-click="onPointClick" />

        </div>
      </section>


      <h5 class="mt-4 mb-2">(esses dps aparecem somente ao clicar no animal no gráfico)</h5>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Navbar from '@/components/ReportPage/ReportNavbar.vue'
import Sidebar from '@/components/ReportPage/ReportSidebar.vue'
import ReportHeader from '@/components/ReportPage/ReportHeader.vue'


import IngestivoCharts from '@/components/charts/IngestivoCharts.vue'
import DesempenhoCharts from '@/components/charts/DesempenhoCharts.vue'
import ViabilidadeCharts from '@/components/charts/ViabilidadeCharts.vue'

// IMPORTAÇÕES DA API (Para o fetchData)
import { getConsumoDiario, getMinutoPorRefeicao } from '@/api/comportamentoIngestivo.js';
import { getEvolucaoPeso, getEvolucaoConsumoDiario, getEvolucaoGanho, getEvolucaoGMD } from '@/api/desempenho.js';
import { getCustoTotal, getEvolucaoCustoDiario, getGanhoPorDia } from '@/api/viabilidade.js';
import { animalGet } from '@/api/animais';
import { refeicaoGet } from '@/api/refeicoes.js';

const mensagemErro = ref('')
const animais = ref([]);
const dadosAPI = ref(null);
const precoKgRacao = ref('0.50'); //teste
const precoKgPesoVivo = ref('10.00');



// import { DATA } from '@/data/mock.js'  // futuramente trocamos pelo axios

const selecionadoPonto = ref(null)
const onPointClick = (p) => { selecionadoPonto.value = p }

// AUXILIAR: Processa o array de refeições brutas e gera os arrays de pontos
function processarRefeicoesBrutas(refeicoesBrutas, idAnimal, loteId) {
  const horaEntradaData = [];
  const horaSaidaData = [];
  const ingestivoData = []; // Duração (já que este gráfico também precisa)

  if (!Array.isArray(refeicoesBrutas)) return { horaEntradaData, horaSaidaData, ingestivoData };

  refeicoesBrutas.forEach((refeicao, index) => {
    // X-axis: Índice (Contador de Refeição)
    const xValue = index + 1;

    // Y-axis: Conversão para Minutos Totais (0 a 1440)
    const entradaMins = timeToMinutes(refeicao.horario_entrada);
    const saidaMins = timeToMinutes(refeicao.horario_saida);
    const duracaoMins = calculateDuration(refeicao.horario_entrada, refeicao.horario_saida);

    const pontoBase = { x: xValue, id: idAnimal, lote: loteId };

    // Adiciona aos arrays de resultado
    horaEntradaData.push({ ...pontoBase, y: entradaMins });
    horaSaidaData.push({ ...pontoBase, y: saidaMins });
    ingestivoData.push({ ...pontoBase, y: duracaoMins });
  });

  return { horaEntradaData, horaSaidaData, ingestivoData };
}


async function fetchData(tipo, id) {

  mensagemErro.value = '';
  dadosAPI.value = null;

  try {
    // 1. INGESTIVO + 2. DESEMPENHO + 3. VIABILIDADE (Chamadas paralelas com tratamento de erro individual agr)
    const [consumo, minuto, refeicoesBrutas, evolucaoPeso, evolucaoConsumo, evolucaoGanho, evolucaoGMD,
      custoTotal, evolucaoCusto, ganhoPorDia] = await Promise.all([

        // INGESTIVO
        // INGESTIVO - Consumo Diário (AGORA SEGURO)
        (async () => { // ⬅️ ENCAPSULAMENTO DE SEGURANÇA
          try {
            return await getConsumoDiario(tipo, id);
          } catch (e) {
            console.warn(`Consumo Diário falhou para ${tipo}/${id}. Ignorando...`);
            return null; // Retorna null para não quebrar o Promise.all
          }
        })(),

        // INGESTIVO - Minuto por Refeição (AGORA SEGURO)
        (async () => { // ⬅️ ENCAPSULAMENTO DE SEGURANÇA
          try {
            return await getMinutoPorRefeicao(tipo, id);
          } catch (e) {
            console.warn(`Minuto por Refeição falhou para ${tipo}/${id}. Ignorando...`);
            return null; // Retorna null para não quebrar o Promise.all
          }
        })(),


        // 2. REFEIÇÕES BRUTAS (Para Hora Entrada/Saída/Duração)
        (async () => {
          // Só busca refeições individuais para um animal específico
          if (tipo !== 'animal' || !id) return []; 
          try {
            return await refeicaoGet(null, { animal: id });
          } catch (e) {
            return [];
          }
        })(),
        // ... RESTANTE DAS CHAMADAS DE DESEMPENHO E VIABILIDADE


        // DESEMPENHO - ALTO RISCO (Exige dados de peso histórico)
        // Evolução Peso (Somente animal)
        (async () => {
          if (tipo !== 'animal') return null;
          try {
            return await getEvolucaoPeso(tipo, id);
          } catch (e) {
            console.warn(`Evolução Peso falhou para ${tipo}/${id}. Ignorando...`);
            return null;
          }
        })(),

        // Evolução Consumo Diário (Baixo risco, depende do dado base)
        getEvolucaoConsumoDiario(tipo, id),

        // Evolução Ganho (Somente animal)
        (async () => {
          if (tipo !== 'animal') return null;
          try {
            return await getEvolucaoGanho(tipo, id);
          } catch (e) {
            console.warn(`Evolução Ganho falhou para ${tipo}/${id}. Ignorando...`);
            return null;
          }
        })(),

        // Evolução GMD (Somente animal)
        (async () => {
          if (tipo !== 'animal') return null;
          try {
            return await getEvolucaoGMD(tipo, id);
          } catch (e) {
            console.warn(`Evolução GMD falhou para ${tipo}/${id}. Ignorando...`);
            return null;
          }
        })(),

        // VIABILIDADE - ALTO RISCO (Exige cálculos de preço e GMD)
        // Custo Total
        (async () => {
          try {
            return await getCustoTotal(tipo, id, Number(precoKgRacao.value));
          } catch (e) {
            console.warn(`Custo Total falhou para ${tipo}/${id}. Ignorando...`);
            return null;
          }
        })(),

        // Evolução Custo Diário
        (async () => {
          try {
            return await getEvolucaoCustoDiario(tipo, id, Number(precoKgRacao.value));
          } catch (e) {
            console.warn(`Evolução Custo Diário falhou para ${tipo}/${id}. Ignorando...`);
            return null;
          }
        })(),

        // Ganho por Dia (Requer GMD, muito propenso a falhar)
        (async () => {
          try {
            return await getGanhoPorDia(tipo, id, Number(precoKgPesoVivo.value));
          } catch (e) {
            console.warn(`Ganho por Dia falhou para ${tipo}/${id}. Ignorando...`);
            return null;
          }
        })(),
      ]);



    const { horaEntradaData, horaSaidaData, ingestivoData: duracaoRefeicao } = processarRefeicoesBrutas(
      refeicoesBrutas, // ⬅️ Array de objetos de refeição
      id,              // ⬅️ animalId/loteId
      loteId.value     // ⬅️ Lote atual
    );

    if (tipo === 'lote') {
        // 1. O que a API retorna para o Consumo Diário do Lote
        console.log(`[DEBUG LOTE] Consumo Bruto:`, consumo);
        
        // 2. O que a API retorna para Minuto por Refeição do Lote
        console.log(`[DEBUG LOTE] Minuto Bruto:`, minuto);
        
        // 3. Verifica se o mapeamento produz um array plotável
        console.log(`[DEBUG LOTE] Consumo Mapeado (Array):`, transformData(consumo, id, tipo));
    }


    // LOG DE DEBUG CORRETO: Loga a variável que recebeu o resultado da API
    console.log("DADOS CRUS DE CONSUMO RECEBIDOS:", consumo);

    // LOG DE DEBUG CORRETO: Loga o resultado da transformação
    console.log("PONTOS DE CONSUMO TRANSFORMADOS:", transformData(consumo, id, tipo));

    // LOG DE DEBUG CORRETO: Loga a variável que recebeu o resultado da API
    console.log("DADOS CRUS DE Min/refeicao RECEBIDOS:", minuto);

    // LOG DE DEBUG CORRETO: Loga o resultado da transformação
    console.log("PONTOS DE min/refeicao TRANSFORMADOS:", transformData(minuto, id, tipo));

    console.log(`Buscando Min/Refeição com TIPO: ${tipo}`); // ⬅️ DEVE SER 'animal'

    console.log("RESULTADO BRUTO - Refeições Brutas:", refeicoesBrutas); // Se essa for a 3ª variável

    // ⬅️ LOG DE DEBUG DO MAPEAR
    console.log("PONTOS MIN/REFEIÇÃO MAPEADOS:", transformData(minuto, id, tipo));

    // **MAPEAMENTO E AGRUPAMENTO**
    dadosAPI.value = {
      ...emptySource,
      // INGESTIVO
      consumoDiario: transformData(consumo, id, tipo),
      minRefeicao: transformData(minuto, id, tipo),

      horaEntrada: horaEntradaData, // ⬅️ AGORA TERÁ DADOS
      horaSaida: horaSaidaData,
      ingestivo: duracaoRefeicao,

      // DESEMPENHO
      EvolucaoPVDia: transformData(evolucaoPeso, id, tipo),
      EvolucaoConsumoDiario: transformData(evolucaoConsumo, id, tipo),
      EvolucaoGanho: transformData(evolucaoGanho, id, tipo),
      EvolucaoGMD: transformData(evolucaoGMD, id, tipo),

      // VIABILIDADE
      custoTotal: custoTotal?.custo_total || 0, // Valor único (não série)
      evolucaoCusto: transformData(evolucaoCusto, id, tipo),
      ganhopordia: transformData(ganhoPorDia, id, tipo),
    };

  } catch (error) {
    // Lógica de tratamento de erro aprimorada
    const serverError = error.response?.data?.erro;
    mensagemErro.value = serverError
      // ? `⚠️ Erro do Servidor: ${serverError}`
      // : `⚠️ Falha na comunicação com a API. Status: ${error.response?.status || 'Rede'}`;

    dadosAPI.value = null;
  }
}

onMounted(async () => {
  try {
    // Busca a lista completa de animais (GET /animais/)
    const listaCompleta = await animalGet();
    animais.value = listaCompleta; // Armazena no ref para uso futuro (tabela)

    // Loga a lista completa para o console (como seu colega vê)
    console.log("Lista Completa de Animais:", listaCompleta);

  } catch (error) {
    console.error("Erro ao carregar lista de animais:", error);
    // Em caso de erro 500, animais.value será []
  }
});

// ReportPage.vue - Função minutesToTime (CORRIGIDA para Minutos Decimais)

const minutesToTime = (totalMins) => {
  // Garante que o valor é numérico e positivo
  const mins = Number(totalMins);
  if (isNaN(mins) || mins < 0) return '00:00';

  // 1. Calcula a parte dos minutos inteiros (ex: 7)
  const minutesPart = Math.floor(mins);

  // 2. Calcula a parte decimal (os segundos)
  const decimalPart = mins - minutesPart;

  // 3. Converte a parte decimal para segundos (multiplica a decimal por 60)
  const seconds = Math.round(decimalPart * 60); // Ex: 0.586 * 60 ≈ 35 segundos

  // 4. Formata as partes
  // Se a duração for menor que 60 minutos, mostramos MM:SS
  if (minutesPart < 60) {
    const m = String(minutesPart).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    return `${m}:${s}`;
  }

  // Se a duração for mais de uma hora (opcionalmente HH:MM)
  else {
    const h = String(Math.floor(mins / 60)).padStart(2, '0');
    const m = String(Math.round(mins % 60)).padStart(2, '0');
    return `${h}:${m}`;
  }
}

const formatDate = (date) => {
  if (!date) return '';
  let d = date instanceof Date ? date : new Date(date);

  // Se o objeto for válido, formate
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString('pt-BR');
  }
  // Caso contrário, retorne a string bruta se não puder ser formatada
  return String(date);
}
const formatKg = (value) => `${value} kg`

const formatReais = (value) => {
  // Formata como moeda brasileira
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Converte "HH:MM:SS" em minutos totais desde a meia-noite
const timeToMinutes = (timeString) => {
  if (!timeString) return 0;
  const [h, m, s] = timeString.split(':').map(Number);
  return h * 60 + m + (s / 60 || 0);
};

// Calcula a duração da refeição em minutos
const calculateDuration = (entrada, saida) => {
  return timeToMinutes(saida) - timeToMinutes(entrada);
};


const formatSelectedY = (ponto) => {
  // ⚠️ Se o ponto vier de uma emissão que não injetou y_unit, a unidade padrão é 'Valor'.
  const yUnit = ponto.y_unit || 'Valor';

  if (!ponto || ponto.y === undefined) return 'N/A';

  // Se o valor y é a duração/hora, use minutesToTime
  switch (yUnit) {
    case 'Minutos':
    case 'Horas':
      // Assumimos que o valor Y é Minutos/Horas e deve ser convertido para minutos totais
      // Se o valor Y é muito pequeno (0.13) e deveria ser grande (8), pode ser HORAS.
      // Tente multiplicar antes de formatar para minutos:
      return minutesToTime(ponto.y);

    case 'Kg':
    case 'GMD (kg)':
      return formatKg(ponto.y);

    case 'Reais (R$)':
      return formatReais(ponto.y);

    default:
      // Retorna o valor bruto para outros casos
      return ponto.y;
  }
};

const selecionado = ref(false)



// ====== CONTROLES DA SEÇÃO ======
const modo = ref('animal')                 // 'animal' | 'lote' | 'geral'
const animalId = ref('') //colocar um q existe
const loteId = ref('lote_real_1')
const grafSelecionado = ref('todos')     // 'todos' | 'ingestivo' | 'desempenho' | 'viabilidade'

const emptySource = { ingestivo: [], desempenho: [], viabilidade: [], custo: [], evolucaocusto: [], EvolucaoPVPeriodo: [], EvolucaoPVDia: [], EvolucaoGMD: [], EvolucaoGanho: [], horaEntrada: [], horaSaida: [], minRefeicao: [], consumoDiario: [], ganhopordia: [] };

// ReportPage.vue - Função AUXILIAR transformData

/**
 * Transforma dados brutos da API (formato { 'data': valor }) em um array de pontos
 * plotáveis pelo Chart.js (formato [{ x: Date, y: valor, id: id_do_ponto }]).
 * * @param {Object|null} data - O objeto de dados brutos retornado por uma GET API (ex: consumo).
 * @param {string} currentId - ID/Nome do animal ou lote que foi usado no filtro.
 * @param {string} currentTipo - O modo do filtro ('animal', 'lote', 'geral').
 * @returns {Array<Object>} Array de pontos plotáveis.
 */
const transformData = (data, currentId, currentTipo) => {
    // 1. Verificação de Falha: Se não for um objeto válido ou estiver vazio, retorne vazio.
    // O Object.keys(data).length verifica se há dados dentro do objeto.
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        return [];
    }

    // A lógica para 'animal' e 'lote' (e 'geral' se for série simples) é a mesma:
    // Mapear o objeto { data: valor } para o array [{x, y}].
    return Object.entries(data).map(([date, value]) => {
        
        // CORREÇÃO: Para evitar que o fuso horário retroceda a data (quebra de exibição), 
        // adicione um horário no meio do dia (ex: 12:00:00) ao criar o objeto Date.
        const dateStringWithTime = `${date}T12:00:00`;
        
        // ➡️ Eixo X: Cria o objeto Date a partir da string
        const dateObject = new Date(dateStringWithTime);
        
        return {
            x: dateObject,
            y: value,
            
            // ID para Destaque: Se for 'animal', usamos o ID do animal; se for 'lote', usamos a data.
            id: currentTipo === 'animal' ? currentId : date,
            
            // Lote: Anexa o ID do lote se o modo for 'lote'
            lote: currentTipo === 'lote' ? currentId : null,
        }
    });
};



watch([modo, animalId, loteId], ([newModo]) => {
    selecionadoPonto.value = null;
    mensagemErro.value = '';

    // Lógica de UX: Limpa o campo do modo antigo ao mudar para 'geral'
    if (newModo === 'geral' && (animalId.value || loteId.value)) {
        // Limpamos, mas não retornamos, para que o modo 'geral' possa carregar o padrão.
        animalId.value = '';
        loteId.value = '';
    }

    // Define o ID de Lote Padrão para quando os inputs estiverem vazios
    const ID_LOTE_PADRAO = loteId.value || 'lote_real_1'; 
    // ^^^ Use aqui o ID real do seu lote padrão, se for diferente de 'Lote Padrão' ^^^

    // 1. Prioridade: Modo 'animal'
    if (newModo === 'animal') {
        if (animalId.value) {
            // A. ESPECÍFICO: Animal ID digitado -> Busca AQUELE animal
            fetchData('animal', animalId.value);
        } else {
            // B. SEM ID: Se Animal ID vazio -> Volta para a visão Lote (TODOS)
            fetchData('lote', ID_LOTE_PADRAO);
        }
    } 
    
    // 2. Prioridade: Modos 'lote' ou 'geral'
    else if (newModo === 'lote' || newModo === 'geral') {
        // C. LOTE/GERAL: Usa o Lote digitado ou o Lote Padrão se o campo estiver vazio
        fetchData('lote', ID_LOTE_PADRAO);
    } 
    
    // Fallback: (Se houver outro modo, apenas limpa)
    else {
        dadosAPI.value = null;
        // Não exibe mensagem de erro para que a tela não mostre um aviso ao carregar.
    }
}, { immediate: true });

// FONTE COMPUTADA (Mapeia o dado bruto para o formato do gráfico)
const fonte = computed(() => {
  if (!dadosAPI.value) {
    return emptySource;
  }
  // NOTA: Para o modo 'lote', o Desempenho e Viabilidade ainda podem ser 'null' aqui,
  // mas o emptySource garante o fallback para o componente filho.
  return dadosAPI.value;
});


// HighlightId é o ID que será destacado nos gráficos
const highlightId = computed(() => {
  if (selecionadoPonto.value) {
    return selecionadoPonto.value.id;
  }
  if (modo.value === 'animal' && animalId.value) {
    return animalId.value;
  }
  return null;
});

// ====== DADOS DA TABELA ====== //NAO USAMOS MAIS ESSE

</script>

<style scoped>
:root {
  --verde-nata: #198754;
  --fundo-claro: #f8f9fa;
  --texto-cinza: #444;
}

body {
  font-family: 'Segoe UI', sans-serif;
}

.content {
  margin-left: 220px;
  padding: 2rem;
  margin-top: 56px;
}

/* seção nova */
.dash {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px
}

.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px 12px
}

.seg {
  display: flex;
  gap: 8px;
  align-items: center;
  background: #f3f4f6;
  padding: 6px;
  border-radius: 10px
}

.seg button {
  border: none;
  background: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600
}

.seg button.active {
  background: #111;
  color: #fff
}

input {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.input-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

.input-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.input-item label {
  font-size: 0.9rem;
  color: #555;
}

input.erro {
  border-color: #ef4444;
  background-color: #fee2e2;
}


.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px
}

@media (max-width:1200px) {
  .grid {
    grid-template-columns: 1fr
  }
}

.info {
  margin: 8px 0 14px;
  padding: 8px 12px;
  border-left: 4px solid #2563eb;
  background: #eef2ff;
  border-radius: 8px
}

/* tabela (seu estilo original) */
.table-placeholder {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
