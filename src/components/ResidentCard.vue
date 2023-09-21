<template>
  <div class="card mb-4 box-shadow">
    <img
      class="card-img-top"
      :src="resident.image"
      alt="Imagen del personaje"
      @click="showCharacterTooltip"
      @mouseout="hideCharacterTooltip"
      style="cursor: pointer"
    />
    <div class="card-body">
      <h5 class="card-title">{{ resident.name }}</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { tippy } from "vue-tippy";

export default {
  props: {
    resident: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async showCharacterTooltip() {
      const resident = this.resident; // Almacena resident en una variable local
      const target = this.$el.querySelector("img");

      const episodeDetails = await this.fetchEpisodeDetails(resident.episodes);

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
                  ${episodeDetails
                    .slice(0, 3)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(
                      (episode, index) =>
                        `<li><a href="${episode.url}">Episode ${index + 1}: ${
                          episode.name
                        }</a></li>`
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
    },
    async fetchEpisodeDetails(episodeUrls) {
      // Verificar si episodeUrls es un array definido y no está vacío
      if (Array.isArray(episodeUrls) && episodeUrls.length > 0) {
        // Realiza solicitudes para obtener los detalles de los episodios
        const episodePromises = episodeUrls.map((url) => axios.get(url));
        const episodeResponses = await Promise.all(episodePromises);
        const episodeDetails = episodeResponses.map((res) => res.data);

        return episodeDetails;
      } else {
        return []; // Devuelve una matriz vacía si no hay episodios
      }
    },

    hideCharacterTooltip() {
      this.tooltips.forEach((tooltip) => tooltip.hide());
    },
  },
  data() {
    return {
      tooltips: [],
    };
  },
};
</script>
