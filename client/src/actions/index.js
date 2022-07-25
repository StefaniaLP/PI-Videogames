import axios from "axios";


export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_GENRES= "GET_GENRES"

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
      console.log(json)
      return dispatch ({
          type: GET_GENRES,
          payload: json
      })
  }
}
    

