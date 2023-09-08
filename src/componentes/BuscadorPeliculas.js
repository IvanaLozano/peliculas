import React, { useState } from "react";
import '../styles/buscador.css';

export const BuscadorPeliculas = () =>{

    const urlBase ='https://api.themoviedb.org/3/search/movie';
    const Api_key = '37ab513a6fe7ab2415213cfbd13862b9';


    const [busqueda, setBusqueda] = useState('');
    const [peliculas, setPeliculas] = useState([]);


    const handleInputChange = (e) =>{
        setBusqueda(e.target.value)
    }

    const hanleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()


    }
    const fetchPeliculas = async () => {
        try{
          
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${Api_key}`)
            const data = await response.json()
            console.log(data.results)
            setPeliculas(data.results)
        }catch(error){
            console.error('Ha ocurrido un error:', error)

        }
    }

    return (
        <div className="container">
            <h1 className="title">Bucador de peliculas</h1>
            <form onSubmit={hanleSubmit}>
                <input
                type="text"
                placeholder="Escribi una pelicula"
                value={busqueda}
                onChange={handleInputChange}
                />
                <button
                type="submit" className="search-button">Buscar</button>
            </form>

            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key= {pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt= {pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>

                        </div>
                ))}

            </div>

        </div>
    )
}
