import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Result } from '../interfaces'
import { MovieContext } from '../context/MovieContext';

interface Props {
    movie: Result;
}

export const MovieItem = ({ movie }: Props) => {

    const { state: { currentMovieListPath } } = useContext(MovieContext)

    const url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    return (
        <Link
            to={`/movie/${movie.id}`}
            state={{
                from: currentMovieListPath
            }}
        >
            <div className='w-60 h-96 mb-12'>
                <div className='transition relative flex justify-center w-full h-[85%] shadow-2xl hover:scale-105'>
                    <div className='absolute bg-yellow-500 py-1 w-16 flex flex-wrap place-content-center rounded-full -top-4'>
                        {movie.vote_average}
                    </div>
                    <img
                        className='w-full h-[100%]'
                        src={url}
                        alt="img"
                    />
                </div>
                <div className='mt-2 flex flex-col px-2'>
                    <span className='text-xl font-bold'>{movie.title}</span>
                    <span className='text-gray-400'>{movie.release_date}</span>
                </div>
            </div>
        </Link>
    )
}
