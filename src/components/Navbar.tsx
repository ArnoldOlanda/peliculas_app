import React, { useState, useContext, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import {GiHamburgerMenu} from 'react-icons/gi';

import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { Result } from '../interfaces';
import { QueryResults } from './QueryResults';

interface Props{
  collapsed:boolean;
  setCollapsed:( v:boolean )=>void;
}

export const Navbar = ({collapsed,setCollapsed}:Props) => {

  const { state } = useContext(MovieContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<Result[]>([]);

  const onChangeValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value)
  }

  const onSetNewValue = ( newValue :string) => {
    setInputValue(newValue);
  }

  useEffect(() => {
    if (inputValue.length < 1) {
      setFilteredMovies([]);
    }
  }, [inputValue])

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const filtered = state.currentMovieList.filter((e: Result) => e.title.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredMovies(filtered)
    }, 300)

    return () => {
      clearTimeout(debouncer);
    }

  }, [inputValue])

  useEffect(() => {
    setInputValue("");
  }, [state.currentMovieList])

  

  return (
    <div className='w-full h-16 bg-red-500 flex'>
      <div className='hidden w-0 md:w-2/6 md:flex bg-red-600 h-full flex-wrap place-content-center'>
        <Link to="/">Peliculas App</Link>
      </div>
      <div className="w-full md:w-5/6 h-full flex items-center p-0 md:p-4 relative">
        <div className='w-[98%] sm:w-[60%] md:w-[30%] h-[80%] relative flex overflow-hidden'>
          <BiSearchAlt className='h-full bg-transparent ml-4' size={30} />
          <input
            className='h-full w-[90%] px-4 bg-transparent placeholder:text-gray-200 outline-none focus:bg-red-400 transition'
            value={inputValue}
            onChange={onChangeValue}
            type="text"
            placeholder='busca una pelicula...'
          />
          <div className='flex sm:hidden h-full items-center ml-4' onClick={()=> setCollapsed( false )}>
            <GiHamburgerMenu size={ 25 } />
          </div>
        </div>
        {
          inputValue.length >= 2 
          && (
            <QueryResults 
            movies={filteredMovies} 
            onSetValue={onSetNewValue}
            />)
        }
      </div>
    </div>
  )
}

