import axios from 'axios';
import { GET_DOGS, GET_ID, GET_RAZAS, GET_TEMP, 
  POST_DOGS, SET_SELECTED_TEMPERAMENT, 
  SET_SHOW_API_DOGS, SET_SHOW_BOTH_DOGS, SET_SHOW_BDD_DOGS } from '../Action-types/Actionstypes';


export const allDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:3001/dogs');

      dispatch({ type: GET_DOGS, payload: data });

    } catch (error) {
      alert(error.message);
    }
  };
};

// Acción para obtener información detallada de un perro por ID

export const getDogByName = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);

      dispatch({ type: GET_ID, payload: data });

      console.log('Respuesta del servidor:', data);
    } catch (error) {
      alert(error.message);
    }
  };
};


export const getRazas = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/name?name=${name}`);
      const result = data || [];

      dispatch({ type: GET_RAZAS, payload: result });
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
};


export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:3001/temperaments');

      dispatch({ type: GET_TEMP, payload: data });

      console.log('Respuesta del servidor (temperamentos):', data);
    } catch (error) {
      alert(error.message);
    }
  };
};




// Acción para guardar datos en la base de datos
export const postDogs = (formData) => {
  return async (dispatch) => {
    try {

      const response = await axios.post('http://localhost:3001/dogs', formData);


      dispatch({ type: POST_DOGS, payload: response.data });


    } catch (error) {

      console.error('Error al guardar los datos en la base de datos:', error);

    }
  };
};

export const setSelectedTemperament = (temperament) => ({
  type: SET_SELECTED_TEMPERAMENT,
  payload: temperament,
});

export const setShowApiDogs = (show) => {
  return {
    type: SET_SHOW_API_DOGS,
    payload: show,
  };
};

export const setShowBddDogs = (show) => {
  return {
    type: SET_SHOW_BDD_DOGS,
    payload: show,
  };
};

export const setShowBothDogs = () => {
  return {
    type: SET_SHOW_BOTH_DOGS,
  };
};










