import {GET_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_CREATOR, SORT_ALPHABETICALLY, SORT_BY_RATING, GET_BY_NAME, POST_GAME, GET_ALL_PLATFORMS, GET_DETAIL}  from "../actions";

const initialState = {
   videogames:  [],
   copy:[],
   genres: [],
   platforms:[],
   detail:{}
}

export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogames: action.payload,
          copy: action.payload,
          //me hago la copia de todos los videogames en los dos estados(videogames y copy)
        };
      case GET_BY_NAME:
         return {
                ...state,
                videogames: action.payload
            };
      case GET_GENRES:
         return {
            ...state,
            genres: action.payload.data

        };
      case GET_ALL_PLATFORMS:
         return {
            ...state,
            platforms: action.payload
        };
    
      case FILTER_BY_GENRE :
         const gamesAPI = state.copy.filter(el => el.genres.includes(action.payload))
         const gamesDB = state.copy.filter( function(el) {  
            for(let i = 0; i < el.genres.length; i++){
                if(el.genres[i].name === action.payload){
                  return el
                }
            }
            })
         const all = gamesAPI.concat(gamesDB)

         return {
            ...state,
            videogames: action.payload === "All" ? state.copy :all
        };
         
         
      case FILTER_BY_CREATOR:
         //en caso de querer que los filtros sean independientes debo poner state.copy en el ternario tanto en la parte if como en el else
         const dataFiltrada = action.payload === 'Creado' ? state.copy.filter(f => f.createdDB) : state.copy.filter(fil => !fil.createdDB)
         
         return {
           ...state,
           videogames: action.payload === "All" ? state.copy : dataFiltrada
        };

         
      case SORT_ALPHABETICALLY:
         let sort = action.payload === 'Asc' || action.payload === "" ?
         state.videogames.sort(( el1, el2 ) => {
             if(el1.name > el2.name) {
                 return 1;
             }
             if(el1.name < el2.name) {
                 return -1;
             }
             return 0;
         }) :
         state.videogames.sort(( el1, el2 ) => {
             if(el1.name > el2.name) {
                 return -1;
             }
             if(el1.name < el2.name) {
                 return 1;
             }
             return 0;
         })
         return {
             ...state,
             videogames: sort
        };
      
      case SORT_BY_RATING:
         let orderbyRat = action.payload === "Rating-asc"|| action.payload === "" ?
         state.videogames.sort(( el1, el2 ) => {
             if(el1.rating > el2.rating) {
                 return 1;
             }
             if(el1.rating < el2.rating) {
                 return -1;
             }
             return 0;
         }) :
         state.videogames.sort(( el1, el2 ) => {
             if(el1.rating > el2.rating) {
                 return -1;
             }
             if(el1.rating < el2.rating) {
                 return 1;
             }
             return 0;
         })
         return {
             ...state,
             videogames: orderbyRat
        };

        case POST_GAME:
            return{
                ...state
        };
        
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
        };

      default:
        return {...state};
    }
}  
      
