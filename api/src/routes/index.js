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

    const pagina2 = await axios.get(apiVideogames.data.next);
    const pagina3 = await axios.get(pagina2.data.next);
    const pagina4 = await axios.get(pagina3.data.next);
    const pagina5 = await axios.get(pagina4.data.next);
    
    
   
    const api100 = apiVideogames.data.results
                    .concat(pagina2.data.results)
                    .concat(pagina3.data.results)
                    .concat(pagina4.data.results)
                    .concat(pagina5.data.results);

    const myApiVideogames = await api100.map( (e) => {
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

    //console.log("bdvg", bdVideogames)
    return bdVideogames;
}

const getAllVideogames= async () => {
    const apiInfo = await getApiVideogames();
    const bdInfo= await getBDVideogames();
    const total = apiInfo.concat(bdInfo)
    return total
}

const PATH= "/videogames"

router.get( `${PATH}/:id`, async (req, res) =>{
    const {id}= req.params

    let allVideogames= await getAllVideogames();

    let idFilter = await allVideogames.filter( e => e.id === parseInt(id) )
        
    if (idFilter.length>0) {
        res.status(200).json(idFilter)
    } else {
        res.status(404).send (`El ID ${id} no se encuentra`)
    }

})

router.get (PATH, async (req, res)=>{
    const {name} = req.query
    let allVideogames= await getAllVideogames();

    if (name) {
        let vgFilter = await allVideogames.filter( e => 
            e.name.toLowerCase().includes(name.toLowerCase())
        )
       let vgFilter15 = vgFilter.slice(0,15) // slice indica desde donde inicia el corte del arrar, hasta donde sin incluir el ultimo.

        if (vgFilter15.length>0) {
            res.status(200).json(vgFilter15)
        } else {
            res.status(404).send ("Videojuego no encontrado")
        }

    } else {
        res.status(200).send(allVideogames)
    }

})

const getGenre = async ()=> {
    const genresBD = await Genre.findAll({ attributes: ["name"] });
    if(genresBD.length === 0){
    const genres = await axios.get (`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    
    const genresList = await genres.data.results.map( (e) =>  e.name )
    //console.log(genresList)
    genresList.forEach(element => {
        Genre.findOrCreate(
            {where: {name: element}}
        )
    });
    const allGenre = await Genre.findAll()
   
    return allGenre
    }
   
    
}

router.get("/genres", async (req, res)=>{
    const genr = await getGenre();
    try {
        res.status(200).json(genr)
    } catch (error) {
        res.status(404).send("No se encontraron generos")
    }
})

router.post(PATH,  async (req, res)=>{
    let {name, description, released, rating, platforms, background_image, genres} = req.body

    //valido que me pasen los parametros obligtorios
        
    if (!name || !description || !genres || !platforms) {
        return res.status(400).send("Faltan parametros");
    }
    //valido que el nombre del juego no exista
    const findVideogame = await Videogame.findAll({ where: { name: name } });
    if (findVideogame.length != 0) {
        return res.send("El nombre ya esta en uso");
    }
    //creo un videgame
    let vgCreate = await Videogame.create({
        name,
        description,
        rating,
        released,
        background_image,
        platforms: platforms.toString(),
        
        });
    //busco el genero en mi Base de datos
    let genreDb = await Genre.findAll({
      where: { name: genres },
    });

    if (genreDb.length === 0) {
      return res.send("El genero no es valido");
    }
    //agrego el genero a mi videogame creado
    vgCreate.addGenre(genreDb);
    
    res.send("El Videogame fue creado con exito");
    
})

module.exports = router;
