// ── helpers de parse ───────────────────────────────────────────
const toNum = v => {
  if (v == null || v === '') return undefined
  const n = Number(String(v).replace(',', '.'))
  return Number.isFinite(n) ? n : undefined
}
const parseDuracaoMin = (s) => {
  if (!s) return undefined               // "0m 22s" → 0.366...
  const m = /(?:(\d+)\s*m)?\s*(?:(\d+)\s*s)?/i.exec(String(s).trim())
  if (!m) return undefined
  return (Number(m[1]||0) + Number(m[2]||0)/60)
}
const horaDecimal = (iso) => {
  const d = new Date(iso)
  return Number.isFinite(d.getTime()) ? d.getHours() + d.getMinutes()/60 : undefined
}
const dataISO = (iso) => {
  const d = new Date(iso)
  return Number.isFinite(d.getTime()) ? d.toISOString().slice(0,10) : undefined
}
const push = (bucket, serie, p) => { (bucket[serie] ||= []).push(p) }

// ── leitura + mapeamento ──────────────────────────────────────
const carregarCSV = async () => {
  try {
    // se você manteve outro nome (ex. "relatorio_cocho (1).csv"), troque AQUI:
    const resp = await fetch('/data/csv.csv')
    const text = await resp.text()

    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data: rows }) => {
        // zera estruturas
        DATA.value.geral = emptySeries()
        DATA.value.lotes = {}
        DATA.value.animais = {}

        const visitas = new Map()      // tag_id -> índice de visita
        const consumoDia = new Map()   // `${tag}|${data}` -> soma kg

        for (const r of rows) {
          const tag = String(r.tag_id || '').trim()
          if (!tag) continue

          // id curto só pra exibir (use o tag inteiro se preferir)
          const id   = tag.slice(-4)
          const lote = 'A' // placeholder (troque quando tiver coluna "lote" real)
          const idx  = (visitas.get(tag) ?? 0) + 1; visitas.set(tag, idx)

          const min   = parseDuracaoMin(r.tempo_cocho)          // minutos
          const hEnt  = horaDecimal(r.hora_entrada)             // 0–24 (decimal)
          const hSai  = horaDecimal(r.hora_saida)
          const data  = dataISO(r.hora_entrada) || dataISO(r.hora_saida)
          const kg    = toNum(r.peso_racao)
          const pv    = toNum(r.peso_animal)

          const base = { id, lote, r: 6 }

          // ingestivo: x = minutos no cocho, y = hora da entrada
          if (min!=null && hEnt!=null) push(DATA.value.geral, 'ingestivo', { ...base, x:min, y:hEnt })

          // hora entrada / saída
          if (min!=null && hEnt!=null) push(DATA.value.geral, 'horaEntrada', { ...base, x:min, y:hEnt })
          if (min!=null && hSai!=null) push(DATA.value.geral, 'horaSaida',   { ...base, x:min, y:hSai })

          // min/refeição: x = nº da visita, y = minutos no cocho
          if (min!=null) push(DATA.value.geral, 'minRefeicao', { ...base, x:idx, y:min })

          // evolução PV por visita (opcional, usa peso_animal)
          if (pv!=null) push(DATA.value.geral, 'EvolucaoPVDia', { ...base, x:idx, y:pv })

          // agrega consumo diário (data x kg)
          if (data && kg!=null) {
            const key = `${tag}|${data}`
            consumoDia.set(key, (consumoDia.get(key) ?? 0) + kg)
          }
        }

        // materializa consumoDiario (um ponto por dia/animal)
        for (const [key, somaKg] of consumoDia.entries()) {
          const [tag, data] = key.split('|')
          const id = tag.slice(-4), lote = 'A'
          push(DATA.value.geral, 'consumoDiario', { id, lote, x:data, y:somaKg, r:6 })
        }

        // distribui as séries gerais para "animais" e "lotes"
        for (const serie of SERIES) {
          for (const p of DATA.value.geral[serie]) {
            (DATA.value.animais[p.id] ||= emptySeries())
            push(DATA.value.animais[p.id], serie, p)

            (DATA.value.lotes[p.lote] ||= emptySeries())
            push(DATA.value.lotes[p.lote], serie, p)
          }
        }

        // sua tabela “AnimalCard” (exemplo simples)
        animais.value = Object.keys(DATA.value.animais).map(id => ({
          id,
          nome: `Animal ${id}`,
          digestivo: 'ok',
          desempenho: '-',
          viabilidade: '-'
        }))
      }
    })
  } catch (e) {
    console.error('Erro ao carregar CSV:', e)
  }
}
