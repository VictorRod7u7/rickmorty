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
          </div>
        </div>
      </div>
    </div>
    <CharacterModal
      :character="selectedCharacter"
      @close="closeCharacterModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import CharacterModal from "./CharacterModal.vue";

export default {
  name: "LocationSearch",
  data() {
    return {
      searchQuery: "",
      residents: [],
      selectedCharacter: null,
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

        const residentPromises = locationData.residents
          .slice(0, 5)
          .map(async (residentUrl) => {
            const residentResponse = await axios.get(residentUrl);
            const residentData = residentResponse.data;
            return this.mapResidentData(residentData);
          });

        this.residents = await Promise.all(residentPromises);

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
        image: resident.image || "URL de Imagen Desconocida",
      };
    },

    changeCursorStyle(isHovered) {
      document.body.style.cursor = isHovered ? "pointer" : "default";
    },

    showCharacterModal(character) {
      this.selectedCharacter = character;
    },

    closeCharacterModal() {
      this.selectedCharacter = null;
    },
  },
  beforeUnmount() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  },
  components: {
    CharacterModal,
  },
};
</script>
