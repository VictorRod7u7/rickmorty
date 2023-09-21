<template>
  <div class="col-12 mb-4">
    <div class="card">
      <img
        class="card-img-top img-fluid"
        :src="resident.image"
        alt="Imagen del personaje"
        @click="showCharacterTooltip"
        style="cursor: pointer"
      />
      <div class="card-body">
        <h5 class="card-title">{{ resident.name }}</h5>
      </div>
      <div class="character-tooltip" v-show="tooltipVisible">
        <h6>{{ resident.name }}</h6>
        <p>Status: {{ resident.status }}</p>
        <p>Especie: {{ resident.species }}</p>
        <p>Origen: {{ resident.origin.name }}</p>
        <p>Episodios:</p>
        <ul v-if="resident.episodes && resident.episodes.length > 0">
          <!-- Cambiamos el bucle v-for para agregar enlaces a los episodios -->
          <li
            v-for="(episode, index) in resident.episodes.slice(0, 3)"
            :key="index"
          >
            <a :href="episode.url">{{ episode.name }}</a>
          </li>
        </ul>
        <p v-else>No hay episodios disponibles</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    resident: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const tooltipVisible = ref(false);

    const showCharacterTooltip = () => {
      tooltipVisible.value = !tooltipVisible.value;
    };

    return {
      tooltipVisible,
      showCharacterTooltip,
    };
  },
};
</script>

<style scoped>
.character-tooltip {
  display: none;
  max-width: 200px;
  text-align: left;
}

.character-tooltip {
  display: block;
}

/* Estilos adicionales para mejorar el diseño y hacerlo más grande y responsive */
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
