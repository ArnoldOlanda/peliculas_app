import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'

import { MoviesApi } from '../api';
import { MovieFull, MovieTrailerResponse } from '../interfaces/index';
import { MovieContext } from '../context/MovieContext';

export const MovieDetail = () => {

  const params = useParams();
  const { state } = useLocation();
  const { state: { currentMovieListPath } } = useContext(MovieContext)

  const [movieDetail, setMovieDetail] = useState<MovieFull>({} as MovieFull);
  const [genres, setGenres] = useState<string[]>([]);
  const [trailerKey, setTrailerKey] = useState("");

  const backdropUrl = `https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`;

  useEffect(() => {

    const fetchData = async () => {

      const { data } = await MoviesApi.get<MovieFull>(`/${params.id}`);
      const { data: trailerData } = await MoviesApi.get<MovieTrailerResponse>(`/${params.id}/videos`)

      setMovieDetail(data);
      setTrailerKey(trailerData.results[0].key);

      const genresArray: string[] = [];

      data.genres.forEach(e => {
        genresArray.push(e.name)
      });

      setGenres(genresArray);
    }

    fetchData()
  }, [params.id])


  return (
    <div className='p-8 w-full md:w-5/6 overflow-auto'>
      <div className='mb-8'>
        <Link to={state?.from ?? currentMovieListPath}>
          <IoArrowBack size={35} className="hover:text-gray-400 transition" />
        </Link>
      </div>
      <div className='flex flex-col lg:flex-row items-center'>
        <img src={posterUrl} alt="" className='rounded-xl w-[60%] lg:w-2/6' />
        <div className='box-content p-4 lg:px-8 relative w-full lg:w-4/6'>
          <div className='text-4xl font-bold'>{movieDetail.title + " (" + new Date(movieDetail.release_date).getFullYear() + ")"}</div>
          {/* <div className='text-xl text-gray-500'>{ movieDetail.original_title }</div> */}
          <div className='mt-2'>
            <span>{movieDetail.release_date} &bull; </span>
            <span className='text-gray-400'>
              {genres.join(', ')}
            </span>

          </div>

          <div className='text-md text-gray-500 italic'>{movieDetail.tagline}</div>
          <div className='flex flex-col my-6'>
            <span><b>Duracion:</b> {movieDetail.runtime} minutes</span>
            <span><b>Votos promedio:</b> {movieDetail.vote_average} </span>
          </div>
          <div className='mt-4 mb-10'>
            <span className='text-xl font-bold'>Overview</span>
            <p className='relative z-20 text-gray-400'>{movieDetail.overview}</p>
          </div>
          <div>
            {
              trailerKey?.length > 1
              && (
              <>
                <div className='mb-2'><span className='text-xl font-bold'>Trailer</span></div>
                <iframe
                  className='w-full h-[315]'
                  // width="560"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
              </>)
            }
          </div>
          {/* <img src={backdropUrl} alt="" /> */}
        </div>
      </div>
    </div>
  )
}
