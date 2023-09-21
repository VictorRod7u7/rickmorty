<template>
  <div class="container">
    <div class="text-center">
      <div class="input-group mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar por locación..."
          v-model="searchQuery"
          @input="handleInput"
        />
        <button class="btn btn-primary" @click="performSearch">Buscar</button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-4" v-for="(resident, index) in residents" :key="index">
        <div class="card mb-4 box-shadow" @click="showCharacterModal(resident)">
          <img
            class="card-img-top"
            :src="resident.image"
            alt="Imagen del personaje"
            @mouseover="changeCursorStyle(true)"
            @mouseout="changeCursorStyle(false)"
          />
          <div class="card-body">
            <h5 class="card-title">{{ resident.name }}</h5>
            <p class="card-text">Status: {{ resident.status }}</p>
            <p class="card-text">Species: {{ resident.species }}</p>
            <p class="card-text">Origin: {{ resident.origin }}</p>
            <p class="card-text">
              Episodes:
              <span
                v-for="(episode, eIndex) in resident.episodes"
                :key="eIndex"
              >
                <a :href="episode.url">Episode {{ eIndex + 1 }}</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "LocationSearch",
  data() {
    return {
      searchQuery: "",
      residents: [], // Agregamos la propiedad residents
      locationData: null, // Agrega locationData como propiedad de datos
    };
  },
  methods: {
    handleInput() {
      // Manejar cambios en el input si es necesario
    },
    async performSearch() {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location/${this.searchQuery}`
        );

        const locationData = response.data;

        // Verifica si residents está vacío
        if (!locationData.residents || locationData.residents.length === 0) {
          // Muestra una alerta indicando que no hay personajes
          Swal.fire({
            icon: "info",
            title: "Información",
            text: "No hay personajes en esta ubicación.",
          });
          return; // Sale de la función
        }

        // Realizar una consulta separada para cada residente
        const residentPromises = locationData.residents
          .slice(0, 5)
          .map(async (residentUrl) => {
            const residentResponse = await axios.get(residentUrl);
            const residentData = residentResponse.data;
            return this.mapResidentData(residentData);
          });

        // Esperar a que todas las consultas se completen
        this.residents = await Promise.all(residentPromises);

        // Evaluar el ID de la localización y cambiar el color de fondo
        const locationId = parseInt(locationData.id);
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
      } catch (error) {
        console.error("Error al consultar la API:", error);
      }
    },

    mapResidentData(resident) {
      return {
        name: resident.name || "Nombre Desconocido",
        status: resident.status || "Estado Desconocido",
        species: resident.species || "Especie Desconocida",
        origin: resident.origin ? resident.origin.name : "Origen Desconocido",
        image: resident.image || "URL de Imagen Desconocida",
        episodes: resident.episode
          ? resident.episode.slice(0, 3).map((episodeUrl) => {
              return { url: episodeUrl };
            })
          : [], // Si episode no existe, asignamos un arreglo vacío
      };
    },

    changeCursorStyle(isHovered) {
      document.body.style.cursor = isHovered ? "pointer" : "default";
    },
    showCharacterModal(character) {
      this.$emit("show-character-modal", character);
    },
  },
  beforeUnmount() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  },
};
</script>
