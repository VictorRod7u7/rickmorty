<template>
  <div class="container">
    <div class="text-center">
      <div class="input-group mt-4">
        <input
          type="number"
          class="form-control"
          placeholder="Buscar por ID de locación..."
          v-model.number="searchQuery"
          @input="handleInput"
        />
        <button class="btn btn-primary" @click="performSearch">Buscar</button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-4" v-for="(resident, index) in residents" :key="index">
        <div class="card mb-4 box-shadow">
          <img
            class="card-img-top"
            :src="resident.image"
            alt="Imagen del personaje"
            @mouseover="showCharacterTooltip(resident)"
            @mouseout="hideCharacterTooltip"
            style="cursor: pointer"
          />
          <div class="card-body">
            <h5 class="card-title">{{ resident.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import axios from "axios";
// import Swal from "sweetalert2";
import "tippy.js/dist/tippy.css";
import { tippy } from "vue-tippy";

export default {
  data() {
    return {
      searchQuery: "",
      tooltips: [],
    };
  },
  computed: {
    ...mapGetters("location", ["hasResidents"]),
  },
  methods: {
    ...mapActions("location", ["fetchLocationData"]),
    performSearch() {
      if (this.searchQuery) {
        this.fetchLocationData(this.searchQuery);
      }
    },
    handleInput() {
      // Handle input
    },
    async showCharacterTooltip(resident) {
      const target = event.target;
      this.tooltips.forEach((tooltip) => tooltip.destroy());
      const tooltipInstance = tippy(target, {
        //eslint-disable-next-line
        content(reference) {
          return `
            <div class="character-tooltip">
              <h6>${resident.name}</h6>
              <p>Status: ${resident.status}</p>
              <p>Especie: ${resident.species}</p>
              <p>Origen: ${resident.origin.name}</p>
              <p>Episodios:</p>
              <ul>
                ${resident.episodes
                  .slice(0, 3)
                  .map(
                    (episode, index) =>
                      `<li><a href="${episode}">Episode ${index + 1}</a></li>`
                  )
                  .join("")}
              </ul>
            </div>
          `;
        },
        allowHTML: true,
        interactive: true,
        trigger: "manual",
        placement: "auto",
      });
      tooltipInstance.show();
      this.tooltips.push(tooltipInstance);
    },
    hideCharacterTooltip() {
      this.tooltips.forEach((tooltip) => tooltip.hide());
    },
  },
};
</script>

<style scoped>
.character-tooltip {
  max-width: 200px;
  text-align: left;
}
</style>
