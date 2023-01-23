import { useState, useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { AppRouter } from './router/AppRouter'
// import './App.css'
import { MoviesApi } from './api';
import { MovieResponse } from './interfaces';
import { MovieContext } from './context/MovieContext';

function App() {
  const { setNowPlaying, setPopular, setTopRated, setUpcoming, setCurrentMovieList } = useContext(MovieContext)

  const [collapsed, setCollapsed] = useState(true)

  const onToogleSidebar = (value:boolean) =>{
    setCollapsed(value);
  }

  const fetchData = async () => {
    const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
      MoviesApi.get<MovieResponse>('/now_playing'),
      MoviesApi.get<MovieResponse>('/popular'),
      MoviesApi.get<MovieResponse>('/top_rated'),
      MoviesApi.get<MovieResponse>('/upcoming'),
    ])

    setCurrentMovieList(nowPlaying.data.results);
    setNowPlaying(nowPlaying.data.results);
    setPopular(popular.data.results);
    setTopRated(topRated.data.results);
    setUpcoming(upcoming.data.results);
  }

  useEffect(() => {
    fetchData();
  }, [])



  return (
    <div className='w-full h-screen bg-slate-800'>
      <BrowserRouter>
        <Navbar collapsed={collapsed} setCollapsed={ onToogleSidebar }/>
        <div className='flex h-[93%] w-screen'>
          <Sidebar collapsed={collapsed} setCollapsed={ onToogleSidebar }/>
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
