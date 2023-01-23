import { Routes, Route, Navigate } from "react-router-dom";

import { MovieDetail } from "../pages/MovieDetail"; 
import { MovieListLayout } from '../layout/MovieListLayout';


export const AppRouter = () => {
    return (

        <Routes>
            <Route path="/now-playing" element={<MovieListLayout pageTitle="En estreno" />} />
            <Route path="/popular" element={<MovieListLayout pageTitle="Populares" />} />
            <Route path="/top-rated" element={<MovieListLayout pageTitle="Mejor calificadas" />} />
            <Route path="/upcoming" element={<MovieListLayout pageTitle="Proximamente" />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/" element={ <Navigate to='/now-playing'/> } />
        </Routes>
    )
}