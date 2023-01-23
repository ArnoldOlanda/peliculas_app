import React,{ useContext } from 'react'
import { MovieContext } from '../context/MovieContext';
import { MovieItem } from '../components/MovieItem';

interface Props{
    pageTitle:string;
}

export const MovieListLayout = ({ pageTitle }:Props) => {
  

  const { state } = useContext(MovieContext);
  return (
    <div className='p-4 w-screen sm:w-5/6 overflow-auto'>
      <div className='text-2xl my-6'>{ pageTitle }</div>
      <div className='w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 auto-rows-min gap-4 place-items-center'>
      {
          state.currentMovieList?.map(movie => (
            <MovieItem movie={movie} key={movie.id} />
          ))
      }
      </div>
    </div>
  )
}
