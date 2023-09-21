<template>
  <div
    class="modal fade"
    id="characterModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="characterModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="characterModalLabel">
            Detalles del Personaje
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeCharacterModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="character">
            <h4>{{ character.name }}</h4>
            <p>Status: {{ character.status }}</p>
            <p>Especie: {{ character.species }}</p>
            <p>Origen: {{ character.origin.name }}</p>
            <p>Episodios:</p>
            <ul>
              <li v-for="(episode, index) in character.episodes" :key="index">
                <a :href="episode">{{ `Episode ${index + 1}` }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeCharacterModal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeCharacterModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Component-specific styles here */
</style>
