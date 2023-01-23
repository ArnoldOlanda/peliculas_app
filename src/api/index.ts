import axios from "axios";


export const MoviesApi = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        language:'es-ES',
        api_key:'6065485a4f64d6c3ca08a31c9e1885f1'
    }
})