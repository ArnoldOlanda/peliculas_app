import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { HiOutlineArrowNarrowRight, HiX } from 'react-icons/hi'
import { MovieContext, InitialState } from '../context/MovieContext';
import { NavLinkItem } from '../interfaces';
import { navLinksData } from '../data';

type MoviesListKeys = Omit<InitialState, "currentMovieListPath" | "currentMovieList">;

interface Props{
  collapsed:boolean;
  setCollapsed:( v:boolean )=>void;
}

export const Sidebar = ({ collapsed, setCollapsed }:Props) => {
  const { state, setCurrentMovieList, setCurrentMovieListPath } = useContext(MovieContext)

  const onClickItem = (movieListName: string, path:string) => {
    setCurrentMovieList(state[movieListName as keyof MoviesListKeys]);
    setCurrentMovieListPath(path);
    setCollapsed(true);
  }

  return (
    <div className={`bg-gray-900 h-[50%] sm:h-[100%] absolute w-screen top-0 ${collapsed ? 'translate-y-[-200%] opacity-0':'translate-y-0 opacity-95'} z-30 sm:translate-y-0 sm:relative sm:-top-0 sm:opacity-100 sm:w-2/6 lg:w-1/6 transition duration-700 ease-in-out `}>
      <div className='flex p-4 sm:hidden'>
        <span className='flex-1 text-xl font-bold'>Peliculas App</span>
        <button onClick={()=> setCollapsed(true)}>
          <HiX size={25} />
        </button>
      </div>
      <div className='bg-gray-900 w-full m-h-1/5 flex flex-wrap flex-col justify-between mt-10'>
        {
          navLinksData.map(({ label, path, movieListName }: NavLinkItem) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) => (
                `w-full h-10 flex flex-wrap content-center px-8 py-10 sm:py-0 hover:bg-slate-800 transition-all ${isActive ? 'bg-gray-800 text-red-400' : ''}`
              )}
              onClick={() => onClickItem(movieListName, path)}
            >
              <span className='flex-1 text-center text-xl sm:text-sm sm:text-left'>{label}</span>
              <HiOutlineArrowNarrowRight size={20} className='hidden sm:inline' />
            </NavLink>
          ))
        }
      </div>
    </div>
  )
}
