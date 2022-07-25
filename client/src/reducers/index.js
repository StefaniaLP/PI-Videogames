import {GET_VIDEOGAMES, GET_GENRES}  from "../actions";

const initialState = {
   videogames:  [],
   genres: [],
   detail: {}
}

export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogames: action.payload,
          
        };
      
      case GET_GENRES:
         return {
            ...state,
            genres: action.payload.data
         }
      default:
         return {...state};
   }
}  
      
