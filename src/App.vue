<template>
  <div class="container" :class="backgroundClass">
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
    <CharacterModal
      :character="selectedCharacter"
      @close="closeCharacterModal"
    />
  </div>
</template>

<script>
import LocationSearch from "./components/LocationSearch.vue";
import CharacterModal from "./components/CharacterModal.vue";

export default {
  name: "App",
  components: {
    LocationSearch,
    CharacterModal,
  },
  data() {
    return {
      locationData: null,
      residents: [],
      selectedCharacter: null,
    };
  },
  computed: {
    backgroundClass() {
      if (this.locationData && this.locationData.id) {
        const locationId = parseInt(this.locationData.id);
        if (!isNaN(locationId)) {
          if (locationId < 50) {
            return "bg-green";
          } else if (locationId < 80) {
            return "bg-blue";
          } else {
            return "bg-red";
          }
        }
      }
      return "";
    },
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
    changeCursorStyle(isHovered) {
      document.body.style.cursor = isHovered ? "pointer" : "default";
    },
  },
};
</script>
