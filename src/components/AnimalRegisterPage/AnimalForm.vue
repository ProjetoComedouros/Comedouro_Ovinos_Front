<template>
  <form @submit.prevent="handleSubmit">
    <!-- Campo de Texto -->
    <div class="mb-3">
      <label class="form-label">Brinco</label>
      <input type="text" class="form-control" v-model="formData.brinco" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Animal ID_C</label>
      <input type="text" class="form-control" v-model="formData.animalId" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Lote</label>
      <input type="text" class="form-control" v-model="formData.lote" required />
    </div>

    <!-- Campo de Seleção -->
    <div class="mb-3">
      <label class="form-label">Sexo</label>
      <select class="form-select" v-model="formData.sexo" required>
        <option value="" disabled selected>Selecione uma opção</option>
        <option value="masculino">Macho</option>
        <option value="feminino">Fêmea</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Raça</label>
      <v-select
        v-model="formData.raca"
        :options="racaOptions"
        :reduce="option => option.value"
        placeholder="Selecione uma raça"
        :searchable="true"
        :clearable="true"
      >
        <template #no-options>
          <span style="color:black;">Nenhuma raça encontrada!</span>
        </template>
      </v-select>

      <input
        v-if="formData.raca === 'outra'"
        v-model="formData.racaCustom"
        type="text"
        class="form-control mt-2"
        placeholder="Digite a raça"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Meses</label>
      <input type="text" class="form-control" v-model="formData.meses" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Categoria</label>
      <v-select
        v-model="formData.categoria"
        :options="categoriaOptions"
        :reduce="option => option.value"
        placeholder="Selecione uma categoria"
        :searchable="true"
        :clearable="true"
      >
        <template #no-options>
          <span style="color:black;">Nenhuma categoria encontrada!</span>
        </template>
      </v-select>
    </div>

    <div class="mb-3">
      <label class="form-label">Peso Vivo (Kg)_Entrada</label>
      <input type="text" class="form-control" v-model="formData.pesoVivo" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Data de Entrada</label>
      <input
        type="date"
        class="form-control"
        v-model="formData.dataEntrada"
        required
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Data de Saída</label>
      <input
        type="date"
        class="form-control"
        v-model="formData.dataSaida"
        required
      />
    </div>

    <button type="submit" class="btn btn-success w-100">Salvar</button>

    <div v-if="showSuccess" class="alert alert-success mt-3">
      Registro salvo com sucesso!
    </div>
  </form>
</template>

<script>
import "vue3-select/dist/vue3-select.css";
import vSelect from "vue3-select";

export default {
  name: "AnimalForm",
  components: { vSelect },
  emits: ["submit-form"],
  data() {
    return {
      formData: {
        brinco: "",
        animalId: "",
        lote: "",
        sexo: "",
        raca: "",
        racaCustom: "",
        meses: "",
        categoria: "",
        pesoVivo: "",
        dataEntrada: "",
        dataSaida: ""
      },
      racaOptions: [
        { value: "bergamacia-brasileira", label: "Bergamácia Brasileira" },
        { value: "border-leicester", label: "Border Leicester" },
        { value: "cariri", label: "Cariri" },
        { value: "corriedale", label: "Corriedale" },
        { value: "crioula", label: "Crioula" },
        { value: "dohne-merino", label: "Dohne Merino" },
        { value: "dorper", label: "Dorper" },
        { value: "east-friesian", label: "East Friesian" },
        { value: "hampshire-down", label: "Hampshire Down" },
        { value: "ideal", label: "Ideal" },
        { value: "ile-de-france", label: "Ile de France" },
        { value: "karakul", label: "Karakul" },
        { value: "lacaune", label: "Lacaune" },
        { value: "merino-australiano", label: "Merino Australiano" },
        { value: "morada-nova", label: "Morada Nova" },
        { value: "poll-dorset", label: "Poll Dorset" },
        { value: "polypay", label: "Polypay" },
        { value: "rabo-largo", label: "Rabo Largo" },
        { value: "romanov", label: "Romanov" },
        { value: "romney-marsh", label: "Romney Marsh" },
        { value: "samm", label: "Samm (South African Mutton Merino)" },
        { value: "santa-ines", label: "Santa Inês" },
        { value: "somalis-brasileira", label: "Somális Brasileira" },
        { value: "suffolk", label: "Suffolk" },
        { value: "texel", label: "Texel" },
        { value: "white-dorper", label: "White Dorper" },
        { value: "white-suffolk", label: "White Suffolk" },
        { value: "srd", label: "SRD (Sem Raça Definida)" },
        { value: "outra", label: "Outra" }
      ],
      categoriaOptions: [
        { value: "cordeiro", label: "Cordeiro(a)" },
        { value: "borrego", label: "Borrego(a)" },
        { value: "ovelha", label: "Ovelha" },
        { value: "carneiro", label: "Carneiro" },
        { value: "capao", label: "Capão" }
      ],
      showSuccess: false
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit-form", this.formData);
      this.showSuccess = true;
      Object.keys(this.formData).forEach(key => (this.formData[key] = ""));
      setTimeout(() => (this.showSuccess = false), 3000);
    }
  }
};
</script>