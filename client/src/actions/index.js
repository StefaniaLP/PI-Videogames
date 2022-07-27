import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_GENRES= "GET_GENRES"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"
export const FILTER_BY_CREATOR= "FILTER_BY_CREATOR"
export const SORT_ALPHABETICALLY= "SORT_ALPHABETICALLY"
export const SORT_BY_RATING= "SORT_BY_RATING"

export function getVideogames() {
    return async function (dispatch) {

        var res= await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: res.data,
          });
    };
}

export function getGenres () {
     return async function(dispatch) {
      var json = await axios(`http://localhost:3001/genres`)
      //console.log(json)
      return dispatch ({
          type: GET_GENRES,
          payload: json
      })
  }
}

export function filterByGenre(payload) {
 
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterByCreator (payload){
    return {
        type: FILTER_BY_CREATOR,
        payload
    }
}

export function sortAlphabetically(payload) {
    return {
        type: SORT_ALPHABETICALLY,
        payload
    }
}
    
export function sortByRating(payload) {
    return {
        type: SORT_BY_RATING,
        payload
    }
}
