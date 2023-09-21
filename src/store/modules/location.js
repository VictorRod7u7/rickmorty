import axios from "axios";
import Swal from "sweetalert2"; // Importa SweetAlert

export default {
  namespaced: true,
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
        // Validar que locationId sea un número entre 1 y 126
        const locationIdNumber = parseInt(locationId);
        if (
          isNaN(locationIdNumber) ||
          locationIdNumber < 1 ||
          locationIdNumber > 126
        ) {
          Swal.fire({
            icon: "error",
            title: "Ubicación inválida",
            text: "El número de ubicación debe estar entre 1 y 126.",
          });
          return;
        }

        if (locationIdNumber == null) {
          Swal.fire({
            icon: "error",
            title: "Id vacío",
            text: "Ingresa un Id para realizar la búsqueda",
          });
          return;
        }

        const response = await axios.get(
          `https://rickandmortyapi.com/api/location/${locationId}`
        );
        const locationData = response.data;
        commit("setLocationData", locationData);

        if (!locationData.residents || locationData.residents.length === 0) {
          // Mostrar alerta SweetAlert cuando no hay residentes
          Swal.fire({
            icon: "info",
            title: "No hay residentes en esta ubicación",
            text: "La ubicación seleccionada no tiene residentes.",
          });
        } else {
          const residentUrls = locationData.residents.slice(0, 5);
          const residentPromises = residentUrls.map((url) => axios.get(url));
          const residentResponses = await Promise.all(residentPromises);
          const residentsData = await Promise.all(
            residentResponses.map(async (res) => {
              const resident = res.data;
              // Verificar si hay episodios disponibles para este residente
              if (resident.episode && resident.episode.length > 0) {
                // Obtener detalles de los episodios
                const episodePromises = resident.episode.map((episodeUrl) =>
                  axios.get(episodeUrl)
                );
                const episodeResponses = await Promise.all(episodePromises);
                const episodesData = episodeResponses.map(
                  (episodeRes) => episodeRes.data
                );
                resident.episodes = episodesData;
              } else {
                resident.episodes = [];
              }
              return resident;
            })
          );

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
