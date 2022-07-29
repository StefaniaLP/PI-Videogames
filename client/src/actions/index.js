import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_GENRES= "GET_GENRES"
export const GET_ALL_PLATFORMS = 'GET_ALL_PLATFORMS';
export const GET_BY_NAME= "GET_BY_NAME"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"
export const FILTER_BY_CREATOR= "FILTER_BY_CREATOR"
export const SORT_ALPHABETICALLY= "SORT_ALPHABETICALLY"
export const SORT_BY_RATING= "SORT_BY_RATING"
export const POST_GAME = 'POST_GAME';
export const GET_DETAIL= "GET_DETAIL"

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

        try {
            var json = await axios(`http://localhost:3001/genres`)
      //console.log(json)
      return dispatch ({
          type: GET_GENRES,
          payload: json
        })
        } catch (error) {
            console.log(error)
        }
      
    }
}
export function getPlatforms (){
    return async function (dispatch){
        try {
            let json = await axios(`http://localhost:3001/platforms`)
            return dispatch ({
                type: GET_ALL_PLATFORMS,
                payload: json
              })
        } catch (error) {
            console.log(error) 
        }
    }
}
/*export function getPlatforms() {
    try {
        return function(dispatch) {
            return fetch(`http://localhost:3001/platforms`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_PLATFORMS,
                    payload: json
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
}*/
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

export function getByName(name){ 
    // mi payload va a ser el name que me pasen por query
    return async function (dispatch){
        try {
             let det= await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
            type: GET_BY_NAME,
            payload: det.data, 
            // aca me devuelve lo que filtre en mi back cuando cree la ruta.
            })
        } catch (error) {
            console.log(error)
            alert("No se encuentra el videogame")
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let json= await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: json.data,
        })
        } catch (error) {
            console.log(error)
            alert("No hay detalle para este id")
        }
        
    }
}
export function postVideogame(payload){
    return async function (dispatch){
        const pos = await axios.post("http://localhost:3001/videogames", payload)
        console.log("payload post", payload)
        console.log("respuesta axios.post", pos)
        return pos;
    }
}
