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
.character-modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
