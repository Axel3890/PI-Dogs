import {
  GET_DOGS,
  GET_ID,
  GET_RAZAS,
  POST_DOGS,
  GET_TEMP,
  SET_SELECTED_TEMPERAMENT,
  SET_SORT_ORDER,
  SET_SHOW_API_DOGS,
  SET_SHOW_BOTH_DOGS,
  SET_SHOW_BDD_DOGS
} from '../Action-types/Actionstypes';

// Estado inicial
const initialState = {
  dogs: [],
  dogInfo: {
    id: '',
    name: '',
    height: '',
    weight: '',
    age: '',
    temperament: '',
    life_span: '',
    Image: "",
  },
  razas: [],
  temperaments: [],
  selectedTemperament: '',
  sortOrder: 'asc', 
  createdDogs: [],
  showApiDogs: true,
  showBddDogs: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_ID:
      return {
        ...state,
        dogInfo: action.payload,
      };
    case GET_RAZAS:
      return {
        ...state,
        razas: action.payload,
      };
    case GET_TEMP:
      return {
        ...state,
        temperaments: action.payload,
      };
    case POST_DOGS:
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
        createdDogs: [...state.createdDogs, action.payload],
      };
    case SET_SELECTED_TEMPERAMENT:
      return {
        ...state,
        selectedTemperament: action.payload,
      };
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
      case SET_SHOW_API_DOGS:
        return {
          ...state,
          showApiDogs: action.payload,
        };
      case SET_SHOW_BDD_DOGS:
        return {
          ...state,
          showBddDogs: action.payload,
        };
      case SET_SHOW_BOTH_DOGS:
        return {
          ...state,
          showApiDogs: true,
          showBddDogs: true,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
