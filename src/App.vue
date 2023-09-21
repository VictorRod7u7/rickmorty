<template>
  <div class="container">
    <div class="text-center">
      <h1 class="mt-4" style="font-family: 'Helvetica', sans-serif">
        SatoriTech Prueba Técnica
      </h1>
    </div>
    <LocationSearch
      @show-character-modal="showCharacterModal"
      @location-data="handleLocationData"
    />
    <div class="row mt-4">
      <div class="col-md-4" v-for="(resident, index) in residents" :key="index">
        <div class="card mb-4 box-shadow">
          <img
            class="card-img-top"
            :src="resident.image"
            alt="Imagen del personaje"
            @mouseover="showCharacterModal(resident)"
            @mouseout="closeCharacterModal"
            style="cursor: pointer"
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
import LocationSearch from "./components/LocationSearch.vue";

export default {
  name: "App",
  components: {
    LocationSearch,
  },
  data() {
    return {
      locationData: null,
      residents: [],
      selectedCharacter: null,
    };
  },
  methods: {
    handleLocationData(locationData) {
      this.locationData = locationData;
    },
    showCharacterModal(character) {
      this.selectedCharacter = character;
    },
    closeCharacterModal() {
      this.selectedCharacter = null;
    },
  },
};
</script>
