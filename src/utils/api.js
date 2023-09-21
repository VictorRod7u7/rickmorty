import axios from "axios";

export async function fetchLocation(locationId) {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location/${locationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al consultar la API:", error);
    return null;
  }
}

export async function fetchResident(residentUrl) {
  try {
    const response = await axios.get(residentUrl);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del residente:", error);
    return null;
  }
}
