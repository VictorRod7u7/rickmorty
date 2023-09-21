<template>
  <div class="character-modal" v-if="character">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h2>{{ character.name }}</h2>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
      <p>Origin: {{ character.origin }}</p>
      <p>Episodes:</p>
      <ul>
        <li v-for="(episode, index) in character.episodes" :key="index">
          <a :href="episode.url">Episode {{ index + 1 }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterModal",
  props: {
    character: Object,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Estilos del modal */
</style>
