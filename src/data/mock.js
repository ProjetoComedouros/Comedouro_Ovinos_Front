// ====== DADOS EXEMPLO (trocar pelo backend) ======

function timeToMinutes(hora) {
  const [h, m] = hora.split(':').map(Number)
  return h * 60 + m
}


export const DATA = {
  lotes: {
    A: {
      ingestivo: [
        { id:'01', lote:'A', x:1, y:timeToMinutes("06:00"), r:6 },
        { id:'02', lote:'B', x:2,y:timeToMinutes("07:00"), r:7 },
        { id:'03', lote:'A', x:3, y:timeToMinutes("08:00"), r:6 },
        { id:'04', lote:'A', x:4, y:timeToMinutes("09:00"), r:5 },
        { id:'01', lote: 'B', x:5, y:timeToMinutes("09:30"), r:7},
        {id:'01', lote: 'C', x:6, y:timeToMinutes("10:10"), r:6 }

      ],
      desempenho: [
        { id:'01', lote:'A', x:41.0, y:0.54, r:8 },
        { id:'02', lote:'A', x:42.1, y:0.60, r:9 },
        { id:'03', lote:'A', x:43.1, y:0.68, r:7 }
      ],
      custo: [
        { id:'01', lote:'A', x:6, y:1.18, r:7 },
        { id:'02', lote:'A', x:7, y:1.22, r:6 },
        { id:'03', lote:'A', x:8, y:1.25, r:6 }
      ],
       evolucaocusto: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50.32, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52.20, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53.10, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54.70, r: 6 },
      ],
      EvolucaoPVPeriodo: [
        { id:'01', lote:'A', x:10, y:20, r:6 },
        { id:'02', lote:'A', x:30, y:40, r:8 },
        {id:'02', lote:'A', x:30, y:40, r:8 }, 
        { id:'03', lote:'A', x:42, y:46, r:9 },
        { id:'04', lote:'A', x:43, y:68, r:7 }
      ],
      EvolucaoPVDia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        {id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      
      EvolucaoGMD: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        {id: '01', lote: 'B', x: '2025-02-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      EvolucaoGanho: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      horaEntrada: [
        { id: '01', lote: 'A', x: 1, y:timeToMinutes("05:30"), r: 6 },
        { id: '02', lote: 'A', x: 2, y:timeToMinutes("08:00"), r: 6 },
        { id: '03', lote: 'A', x: 3, y:timeToMinutes("10:00"), r: 6 },
        { id: '04', lote: 'A', x: 4, y:timeToMinutes("12:15"), r: 6 },
      ],
      horaSaida: [
        { id: '01', lote: 'A', x: 1, y: timeToMinutes("05:36"), r: 6 },
        { id: '02', lote: 'A', x: 2, y: timeToMinutes("08:07"), r: 7 },
        { id: '03', lote: 'A', x: 3, y: timeToMinutes("10:10"), r: 6 },
        { id: '04', lote: 'A', x: 4, y: timeToMinutes("12:20"), r: 8 },
      ],
      minRefeicao: [
        { id: '01', lote: 'A', x: 1, y: 6, r: 7 },
        { id: '02', lote: 'A', x: 2, y: 10, r: 8 },
        { id: '03', lote: 'A', x: 3, y: 12, r: 6 },
        { id: '04', lote: 'A', x: 4, y: 11, r: 7 },
      ],
      consumoDiario: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 0.50, r: 6 },
        {id: '01', lote: 'A', x: '2025-02-01', y: 0.50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 0.52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 0.53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 0.54, r: 6 },
      ],
      viabilidade: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      ganhopordia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
    },
    B: {
      ingestivo: [
        { id:'01', lote:'A', x:1, y:timeToMinutes("06:00"), r:6 },
        { id:'02', lote:'B', x:2,y:timeToMinutes("07:00"), r:7 },
        { id:'03', lote:'A', x:3, y:timeToMinutes("08:00"), r:6 },
        { id:'04', lote:'A', x:4, y:timeToMinutes("09:00"), r:5 },
        { id:'01', lote: 'B', x:5, y:timeToMinutes("09:30"), r:7},

      ],
      desempenho: [
        { id:'05', lote:'B', x:35, y:0.0, r:6 },
        { id:'06', lote:'B', x:42, y:0.60, r:9 }
      ],
      custo: [
        { id:'05', lote:'B', x:6, y:1.18, r:7 },
        { id:'06', lote:'B', x:7, y:1.22, r:7 }
      ],
      viabilidade: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      ganhopordia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],

    },
    C: {
      ingestivo: [
        {id:'01', lote: 'C', x:1, y:timeToMinutes("10:10"), r:6 },
        {id:'02', lote: 'C', x:1, y:timeToMinutes("11:30"), r:7 },
        {id:'03', lote: 'C', x:5, y:timeToMinutes("12:45"), r:6 },
        {id:'04', lote: 'C', x:3, y:timeToMinutes("13:50"), r:5 }
      ]
    }
    
    
  },


  todos: {
    A: {
      ingestivo: [
        { id:'01', lote:'A', x:1, y:timeToMinutes("06:00"), r:6 },
        { id:'02', lote:'A', x:2,y:timeToMinutes("07:00"), r:7 },
        { id:'03', lote:'A', x:3, y:timeToMinutes("08:00"), r:6 },
        { id:'04', lote:'A', x:4, y:timeToMinutes("09:00"), r:5 },
        { id:'01', lote: 'A', x:5, y:timeToMinutes("09:30"), r:7},
        {id:'01', lote: 'A', x:6, y:timeToMinutes("10:10"), r:6 }

      ],
      desempenho: [
        { id:'01', lote:'A', x:41.0, y:0.54, r:8 },
        { id:'02', lote:'A', x:42.1, y:0.60, r:9 },
        { id:'03', lote:'A', x:43.1, y:0.68, r:7 }
      ],
      custo: [
        { id:'01', lote:'A', x:6, y:1.18, r:7 },
        { id:'02', lote:'A', x:7, y:1.22, r:6 },
        { id:'03', lote:'A', x:8, y:1.25, r:6 }
      ],
      horaEntrada: [
        { id: '01', lote: 'A', x: 1, y:timeToMinutes("10:00"), r: 7 },
        { id: '02', lote: 'A', x: 2, y: timeToMinutes("05:00"), r: 6 },
        { id: '03', lote: 'A', x: 3, y: timeToMinutes("11:00"), r: 8 },
        { id: '04', lote: 'A', x: 4, y: timeToMinutes("16:00"), r: 5 },
      ],
      horaSaida: [
        { id: '01', lote: 'A', x: 1,  y:timeToMinutes("03:00"), r: 6 },
        { id: '02', lote: 'A', x: 2,  y:timeToMinutes("10:00"), r: 7 },
        { id: '03', lote: 'A', x: 3, y:timeToMinutes("11:00"), r: 6 },
        { id: '04', lote: 'A', x: 4,  y:timeToMinutes("10:30"), r: 8 },
      ],
      minRefeicao: [
        { id: '01', lote: 'A', x: 1, y: 6, r: 7 },
        { id: '02', lote: 'A', x: 2, y: 12, r: 8 },
        { id: '03', lote: 'A', x: 3, y: 13, r: 6 },
        { id: '04', lote: 'A', x: 4, y: 11, r: 7 },
      ],
      consumoDiario: [
  { id: '01', lote: 'A', x: '2025-01-01', y: 0.50, r: 6 },
  { id: '02', lote: 'A', x: '2025-01-02', y: 0.52, r: 7 },
  { id: '03', lote: 'A', x: '2025-01-03', y: 0.53, r: 8 },
  { id: '04', lote: 'A', x: '2025-01-04', y: 0.54, r: 6 },
],
      EvolucaoPVPeriodo: [
        { id:'01', lote:'A', x:35, y:0.0, r:6 },
        { id:'02', lote:'A', x:41, y:0.54, r:8 },
        { id:'03', lote:'A', x:42, y:0.60, r:9 },
        { id:'04', lote:'A', x:43, y:0.68, r:7 }
      ],
      
      viabilidade: [
       { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      evolucaocusto: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50.20, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52.21, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53.01, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54.23, r: 6 },
        
      ],
      ganhopordia: [
       { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      EvolucaoPVDia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        {id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      
    },
    B: {
      ingestivo: [
        { id:'01', lote:'B', x:1, y:timeToMinutes("06:00"), r:6 },
        { id:'02', lote:'B', x:2,y:timeToMinutes("07:00"), r:7 },
        { id:'03', lote:'B', x:3, y:timeToMinutes("08:00"), r:6 },
        { id:'04', lote:'B', x:4, y:timeToMinutes("09:00"), r:5 },
        { id:'01', lote: 'B', x:5, y:timeToMinutes("09:30"), r:7},

      ],
      desempenho: [
        { id:'05', lote:'B', x:35, y:0.0, r:6 },
        { id:'06', lote:'B', x:42, y:0.60, r:9 }
      ],
      custo: [
        { id:'05', lote:'B', x:6, y:1.18, r:7 },
        { id:'06', lote:'B', x:7, y:1.22, r:7 }
      ],
      viabilidade: [
        { id: '01', lote: 'B', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'B', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'B', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'B', x: '2025-01-04', y: 54, r: 6 },
      ],
      ganhopordia: [
        { id: '01', lote: 'B', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'B', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'B', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'B', x: '2025-01-04', y: 54, r: 6 },
      ],

    },
    C: {
      ingestivo: [
        {id:'01', lote: 'C', x:1, y:timeToMinutes("10:10"), r:6 },
        {id:'02', lote: 'C', x:1, y:timeToMinutes("11:30"), r:7 },
        {id:'03', lote: 'C', x:5, y:timeToMinutes("12:45"), r:6 },
        {id:'04', lote: 'C', x:3, y:timeToMinutes("13:50"), r:5 }
      ],
      desempenho: [
        { id:'07', lote:'C', x:30, y:0.0, r:6 },
        { id:'08', lote:'C', x:40, y:0.50, r:9 }
      ],
      custo: [
        { id:'07', lote:'C', x:6, y:1.10, r:7 },
        { id:'08', lote:'C', x:7, y:1.20, r:7 }
      ],
      viabilidade: [
        { id: '01', lote: 'C', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'C', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'C', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'C', x: '2025-01-04', y: 54, r: 6 },
      ],
      ganhopordia: [
        { id: '01', lote: 'C', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'C', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'C', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'C', x: '2025-01-04', y: 54, r: 6 },
      ],

    }


    
  },
  animais: {
    '01': {
      ingestivo: [
        { id:'01', lote:'A', x:1, y:timeToMinutes("06:00"), r:6 },
        { id:'02', lote:'B', x:2,y:timeToMinutes("07:00"), r:7 },
        { id:'03', lote:'A', x:3, y:timeToMinutes("08:00"), r:6 },
        { id:'04', lote:'A', x:4, y:timeToMinutes("09:00"), r:5 },
        { id:'01', lote: 'B', x:5, y:timeToMinutes("09:30"), r:7},
        {id:'01', lote: 'C', x:6, y:timeToMinutes("10:10"), r:6 },
        {id: '02', lote: 'C', x:1, y:timeToMinutes("11:30"), r:7 }

      ],
      minRefeicao: [
        { id:'01', lote:'A', x:1, y:timeToMinutes("09:10"), r:6 },
        { id:'01', lote:'A', x:2, y:timeToMinutes("09:20"), r:6 },
        { id:'01', lote:'A', x:3, y:timeToMinutes("09:30"), r:6 },
        { id:'01', lote:'A', x:4, y:timeToMinutes("09:40"), r:6 },
        { id:'01', lote:'B', x:5, y:timeToMinutes("09:50"), r:6 },
        { id:'01', lote:'B', x:6, y:timeToMinutes("09:55"), r:6 },
        { id:'01', lote:'B', x:7, y:timeToMinutes("10:05"), r:6 },
        { id:'01', lote:'C', x:8, y:timeToMinutes("10:10"), r:6 },
        { id:'01', lote:'C', x:9, y:timeToMinutes("10:15"), r:6 },
        { id:'01', lote:'C', x:10, y:timeToMinutes("10:20"), r:6 },

      ],
      EvolucaoPVPeriodo: [
        { id:'01', lote:'A', x:35, y:0.0, r:6 },
        { id:'01', lote:'A', x:41, y:0.54, r:8 },
        { id:'01', lote:'A', x:42, y:0.60, r:9 },
        { id:'01', lote:'A', x:43, y:0.68, r:7 },
        { id:'01', lote:'B', x:30, y:0.0, r:6 },
        { id:'01', lote:'B', x:35, y:0.50, r:8 },
        { id:'01', lote:'B', x:40, y:0.60, r:9 },
        { id:'01', lote:'B', x:42, y:0.68, r:7 },
        { id:'01', lote:'C', x:25, y:0.0, r:6 },
        { id:'01', lote:'C', x:30, y:0.50, r:8 },
        { id:'01', lote:'C', x:35, y:0.60, r:9 },
        { id:'01', lote:'C', x:40, y:0.68, r:7 }
      ],
      custo: [
        { id:'01', lote:'A', x:6, y:1.18, r:7 },
        { id:'01', lote:'A', x:7, y:1.22, r:7 },
        { id:'01', lote:'A', x:8, y:1.25, r:7 },
        { id:'01', lote:'B', x:6, y:1.10, r:7 },
        { id:'01', lote:'B', x:7, y:1.15, r:7 },
        { id:'01', lote:'B', x:8, y:1.20, r:7 },
        { id:'01', lote:'C', x:5, y:1.05, r:7 },
        { id:'01', lote:'C', x:6, y:1.10, r:7 },
        { id:'01', lote:'C', x:7, y:1.15, r:7 }
      ],
      evolucaocusto: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 10.10, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 20.10, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 10.20, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 10.15, r: 6 },
        { id: '01', lote: 'B', x: '2025-01-01', y: 15.10, r: 6 },
        { id: '02', lote: 'B', x: '2025-01-02', y: 30.10, r: 7 },
        { id: '03', lote: 'B', x: '2025-01-03', y: 14.5, r: 8 },
        { id: '04', lote: 'B', x: '2025-01-04', y: 26.70, r: 6 },
        { id: '01', lote: 'C', x: '2025-01-01', y: 10.4, r: 6 },
        { id: '02', lote: 'C', x: '2025-01-02', y: 10.17, r: 7 },
        { id: '03', lote: 'C', x: '2025-01-03', y: 40.10, r: 8 },
        { id: '04', lote: 'C', x: '2025-01-04', y: 50.10, r: 6 },
      ],
      viabilidade: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
        { id: '01', lote: 'B', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'B', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'B', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'B', x: '2025-01-04', y: 54, r: 6 },
        { id: '01', lote: 'C', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'C', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'C', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'C', x: '2025-01-04', y: 54, r: 6 },
      ],
      EvolucaoPVDia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        {id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      consumoDiario: [
  { id: '01', lote: 'A', x: '2025-01-01', y: 0.50, r: 6 },
  { id: '02', lote: 'A', x: '2025-01-02', y: 0.52, r: 7 },
  { id: '03', lote: 'A', x: '2025-01-03', y: 0.53, r: 8 },
  { id: '04', lote: 'A', x: '2025-01-04', y: 0.54, r: 6 },
],
      EvolucaoGMD: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      ganhopordia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      horaSaida: [
        { id: '01', lote: 'A', x: 1,  y:timeToMinutes("08:00"), r: 6 },
        { id: '02', lote: 'A', x: 2,  y:timeToMinutes("09:00"), r: 7 },
        { id: '03', lote: 'A', x: 3,  y:timeToMinutes("09:10"), r: 6 },
        { id: '04', lote: 'A', x: 4,  y:timeToMinutes("10:07"), r: 8 },
      ],
      horaEntrada: [
        { id: '01', lote: 'A', x: 1,  y:timeToMinutes("10:00"), r: 7 },
        { id: '02', lote: 'A', x: 2,  y:timeToMinutes("13:00"),r: 6 },
        { id: '03', lote: 'A', x: 3,  y:timeToMinutes("08:00"), r: 8 },
        { id: '04', lote: 'A', x: 4,  y:timeToMinutes("19:00"), r: 5 },
      ],
      EvolucaoGanho: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      
    },
    '02': {
        ingestivo: [
        { id:'01', lote:'A', x:1, y:timeToMinutes("06:00"), r:6 },
        { id:'02', lote:'B', x:2,y:timeToMinutes("07:00"), r:7 },
        { id:'03', lote:'A', x:3, y:timeToMinutes("08:00"), r:6 },
        { id:'04', lote:'A', x:4, y:timeToMinutes("09:00"), r:5 },
        { id:'01', lote: 'B', x:5, y:timeToMinutes("09:30"), r:7},

      ],
        minRefeicao: [
          { id:'02', lote:'A', x:1, y:20, r:7 },
          { id:'02', lote:'A', x:2, y:23, r:7 },
          { id:'02', lote:'A', x:3, y:3, r:7 },
          { id:'02', lote:'A', x:4, y:4, r:7 }
        ],
        desempenho: [
          { id:'02', lote:'A', x:35, y:0.0, r:6 },
          { id:'02', lote:'A', x:42, y:0.60, r:9 }
        ],
    },
    '03': {
        ingestivo: [
          { id:'03', lote:'A', x:1, y: timeToMinutes("05:30"), r:6 },
          { id:'03', lote:'A', x:2, y: timeToMinutes("05:30"), r:6 },
          { id:'03', lote:'A', x:3, y: timeToMinutes("05:30"), r:6 },
          { id:'03', lote:'A', x:4, y: timeToMinutes("05:30"), r:6 }
        ],
        minRefeicao: [
          { id:'03', lote:'A', x:1, y:22, r:6 },
          { id:'03', lote:'A', x:2, y:29, r:6 },
          { id:'03', lote:'A', x:3, y:34, r:6 },
          { id:'03', lote:'A', x:4, y:41, r:6 }
        ],
        desempenho: [
          { id:'03', lote:'A', x:35, y:0.0, r:6 },
          { id:'03', lote:'A', x:42, y:0.60, r:9 }
        ],

    }
  },
   

  
  geral: {
    ingestivo: [
        { id:'01', lote:'A', x:1, y:timeToMinutes("06:00"), r:6 },
        { id:'02', lote:'B', x:2,y:timeToMinutes("07:00"), r:7 },
        { id:'03', lote:'A', x:3, y:timeToMinutes("08:00"), r:6 },
        { id:'04', lote:'A', x:4, y:timeToMinutes("09:00"), r:5 },
        { id:'01', lote: 'B', x:5, y:timeToMinutes("09:30"), r:7},

      ],
    desempenho: [
      { id:'01', lote:'A', x:41, y:0.54, r:8 }
    ],
    custo: [
        { id:'01', lote:'A', x:6, y:1.18, r:7 },
        { id:'02', lote:'A', x:7, y:1.22, r:6 },
        { id:'03', lote:'A', x:8, y:1.25, r:6 }
      ],
     evolucaocusto: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
    viabilidade: [
      { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
    ],
     ganhopordia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
    EvolucaoPVPeriodo: [
        { id:'01', lote:'A', x:35, y:0.0, r:6 },
        { id:'02', lote:'A', x:41, y:0.54, r:8 },
        { id:'03', lote:'A', x:42, y:0.60, r:9 },
        { id:'04', lote:'A', x:43, y:0.68, r:7 }
      ],
    EvolucaoPVDia: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        {id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
     EvolucaoGMD: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
       EvolucaoGanho: [
        { id: '01', lote: 'A', x: '2025-01-01', y: 50, r: 6 },
        { id: '02', lote: 'A', x: '2025-01-02', y: 52, r: 7 },
        { id: '03', lote: 'A', x: '2025-01-03', y: 53, r: 8 },
        { id: '04', lote: 'A', x: '2025-01-04', y: 54, r: 6 },
      ],
      horaEntrada: [
        { id: '01', lote: 'A', x: 1, y: timeToMinutes("10:00"), r: 7 },
        { id: '02', lote: 'A', x: 2, y: timeToMinutes("18:00"), r: 6 },
        { id: '03', lote: 'A', x: 3, y: timeToMinutes("15:00"), r: 8 },
        { id: '04', lote: 'A', x: 4, y: timeToMinutes("11:00"), r: 5 },
      ],
      horaSaida: [
        { id: '01', lote: 'A', x: 1, y: timeToMinutes("10:00"), r: 6 },
        { id: '02', lote: 'A', x: 2, y: timeToMinutes("14:00"), r: 7 },
        { id: '03', lote: 'A', x: 3, y: timeToMinutes("16:00"), r: 6 },
        { id: '04', lote: 'A', x: 4, y: timeToMinutes("17:00"), r: 8 },
      ],
      minRefeicao: [
        { id: '01', lote: 'A', x: 1, y: 10, r: 7 },
        { id: '02', lote: 'A', x: 2, y: 12, r: 8 },
        { id: '03', lote: 'A', x: 3, y: 13, r: 6 },
        { id: '04', lote: 'A', x: 4, y: 11, r: 7 },
      ],
      consumoDiario: [
  { id: '01', lote: 'A', x: '2025-01-01', y: 0.50, r: 6 },
  { id: '02', lote: 'A', x: '2025-01-02', y: 0.52, r: 7 },
  { id: '03', lote: 'A', x: '2025-01-03', y: 0.53, r: 8 },
  { id: '04', lote: 'A', x: '2025-01-04', y: 0.54, r: 6 },
],
      
  }
}