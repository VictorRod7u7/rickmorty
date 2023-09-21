<template>
  <div class="container" :class="backgroundColorClass">
    <div class="text-center">
      <h1 class="mt-4" style="font-family: 'Helvetica', sans-serif">
        SatoriTech Prueba Técnica
      </h1>
    </div>
    <LocationSearch />
    <div class="row mt-4">
      <div
        class="col-md-4"
        v-for="(resident, index) in $store.state.location.residents"
        :key="index"
      >
        <ResidentCard :resident="resident" />
      </div>
    </div>
    <CharacterModal />
  </div>
</template>

<script>
import LocationSearch from "./components/LocationSearch.vue";
import ResidentCard from "./components/ResidentCard.vue";
import CharacterModal from "./components/CharacterModal.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    LocationSearch,
    ResidentCard,
    CharacterModal,
  },
  beforeUnmount() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  },
  computed: {
    // Utiliza mapState para acceder al estado del módulo "location"
    ...mapState("location", ["residents"]),
    backgroundColorClass() {
      const locationId = this.$store.state.location.locationData
        ? this.$store.state.location.locationData.id
        : 0;

      if (locationId < 50 && locationId > 0) {
        return (document.body.style.backgroundColor = "green");
      } else if (locationId >= 50 && locationId < 80) {
        return (
          (document.body.style.backgroundColor = "blue"),
          (document.body.style.color = "white")
        );
      } else if (locationId > 80) {
        return (document.body.style.backgroundColor = "red");
      } else {
        return (
          (document.body.style.backgroundColor = "white"),
          (document.body.style.color = "black")
        );
      }
    },
  },
};
</script>
