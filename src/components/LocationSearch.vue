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
          <!-- Utiliza v-tooltip para mostrar el tooltip al hacer clic -->
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
import axios from "axios";
import Swal from "sweetalert2";
import "tippy.js/dist/tippy.css";
import { tippy } from "vue-tippy";

export default {
  name: "LocationSearch",
  data() {
    return {
      searchQuery: "",
      residents: [],
      tooltips: [], // Almacenar las instancias de tooltips
    };
  },
  methods: {
    async performSearch() {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location/${this.searchQuery}`
        );

        const locationData = response.data;

        if (!locationData.residents || locationData.residents.length === 0) {
          Swal.fire({
            icon: "info",
            title: "Información",
            text: "No hay personajes en esta ubicación.",
          });
          return;
        }

        const residentUrls = locationData.residents.slice(0, 5);
        const residentPromises = residentUrls.map(this.fetchResidentData);

        this.residents = await Promise.all(residentPromises);

        this.setBodyBackgroundColor(locationData.id);
      } catch (error) {
        console.error("Error al consultar la API:", error);
      }
    },

    async fetchResidentData(residentUrl) {
      try {
        const residentResponse = await axios.get(residentUrl);
        const residentData = residentResponse.data;
        return this.mapResidentData(residentData);
      } catch (error) {
        console.error("Error al obtener datos del residente:", error);
        return null;
      }
    },

    mapResidentData(resident) {
      return {
        name: resident.name || "Nombre Desconocido",
        image: resident.image || "URL de Imagen Desconocida",
        status: resident.status || "Estado Desconocido",
        species: resident.species || "Especie Desconocida",
        origin: resident.origin || { name: "Origen Desconocido" },
        episodes: resident.episode || [],
      };
    },

    changeCursorStyle(isHovered) {
      document.body.style.cursor = isHovered ? "pointer" : "default";
    },

    showCharacterTooltip(character) {
      // Crear un nuevo tooltip en el elemento de destino
      const target = event.target;
      // Eliminar tooltips existentes para evitar duplicados
      this.tooltips.forEach((tooltip) => tooltip.destroy());
      // Agregar la instancia del tooltip al array
      const tooltipInstance = tippy(target, {
        //eslint-disable-next-line
        content(reference) {
          // Contenido del tooltip
          return `
        <div class="character-tooltip">
          <h6>${character.name}</h6>
          <p>Status: ${character.status}</p>
          <p>Especie: ${character.species}</p>
          <p>Origen: ${character.origin.name}</p>
          <p>Episodios:</p>
          <ul>
            ${character.episodes
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
        trigger: "manual", // Evita que el tooltip se muestre automáticamente
        placement: "auto", // Puedes ajustar la posición del tooltip según tus necesidades
      });
      tooltipInstance.show(); // Mostrar el tooltip manualmente
      // Agregar la instancia del tooltip al array
      this.tooltips.push(tooltipInstance);
    },

    hideCharacterTooltip() {
      // Ocultar y destruir todos los tooltips
      this.tooltips.forEach((tooltip) => tooltip.hide());
    },

    setBodyBackgroundColor(locationId) {
      if (!isNaN(locationId)) {
        if (locationId < 50) {
          document.body.style.backgroundColor = "green";
        } else if (locationId < 80) {
          document.body.style.backgroundColor = "blue";
          document.body.style.color = "white";
        } else {
          document.body.style.backgroundColor = "red";
        }
      }
    },
  },
  beforeUnmount() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  },
};
</script>

<style scoped>
.character-tooltip {
  max-width: 200px;
  text-align: left;
}
</style>
