const { Router } = require('express');
const axios = require ('axios');
const {Videogame, Genre} = require('../db');

const { YOUR_API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiVideogames = async ()=> {
    const apiVideogames = await axios.get (`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
    //console.log(apiVideogames.data)
    const myApiVideogames = await apiVideogames.data.results.map( (e) => {
        return {
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            released: e.released,
            rating: e.rating,
            genres: e.genres.map((e) => {return e.name;}).join(" "),
          platform: e.platforms.map((e) => e.platform.name),
        }
    })
    //console.log ("miapi", myApiVideogames)
    return myApiVideogames;
}

const getBDVideogames = async () => {
    const bdVideogames = await Videogame.findAll({
        include: {
            model: Genre,
            attribute: ["name"],
            through: {
              attributes: [],
            },
        }
    })
    return bdVideogames;
}

const getAllVideogames= async () => {
    const apiInfo = await getApiVideogames();
    const bdInfo= await getBDVideogames();
    const total = apiInfo.concat(bdInfo)
    return total
}

const PATH= "/videogames"
router.get (PATH, async (req, res)=>{
    const {name} = req.query
    let allVideogames= await getAllVideogames();

    if (name) {
        let vgFilter = await allVideogames.filter( e => 
            e.name.toLowerCase().includes(name.toLowerCase())
        )
       
        if (vgFilter.length>0) {
            res.status(200).json(vgFilter)
        } else {
            res.status(404).send ("Videojuego no encontrado")
        }

    } else {
        res.status(200).send(allVideogames)
    }

})


module.exports = router;
