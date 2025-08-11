<template>
  <div class="d-flex align-items-center mb-3">
    <div class="form-check">
      <input 
        class="form-check-input" 
        type="checkbox" 
        id="selecionar" 
        :checked="props.selecionado" 
        @change="$emit('update:selecionado', $event.target.checked)"
      />
      <label class="form-check-label" for="selecionar">Selecionar</label>
    </div>
    <button class="btn btn-exportar btn-sm ms-auto me-2">
      <i class="bi bi-file-earmark-pdf"></i> PDF / Excel
    </button>
    <button class="btn btn-outline-secondary btn-sm">
      <i class="bi bi-printer"></i> Imprimir
    </button>
  </div>
</template>

<script setup>
import { defineProps} from 'vue'

const props = defineProps({
  selecionado: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
.form-check {
  margin-right: 1rem;
}
.btn-exportar {
  background-color: var(--verde-nata);
  color: white;
}
.btn-exportar:hover {
  background-color: #157347;
}
</style>