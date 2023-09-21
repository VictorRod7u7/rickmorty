import axios from "axios";

export default {
  namespaced: true, // Esto indica que el módulo tiene su propio espacio de nombres
  state: {
    locationData: null,
    residents: [],
  },
  mutations: {
    setLocationData(state, data) {
      state.locationData = data;
    },
    setResidents(state, residents) {
      state.residents = residents;
    },
  },
  actions: {
    async fetchLocationData({ commit }, locationId) {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location/${locationId}`
        );
        const locationData = response.data;

        commit("setLocationData", locationData);

        if (!locationData.residents || locationData.residents.length === 0) {
          // Handle no residents
        } else {
          const residentUrls = locationData.residents.slice(0, 5);
          const residentPromises = residentUrls.map((url) => axios.get(url));
          const residentResponses = await Promise.all(residentPromises);
          const residentsData = residentResponses.map((res) => res.data);

          commit("setResidents", residentsData);
        }
      } catch (error) {
        // Handle error
      }
    },
  },
  getters: {
    hasResidents(state) {
      return state.residents.length > 0;
    },
  },
};
