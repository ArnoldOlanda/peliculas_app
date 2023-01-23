import { NavLinkItem } from "../interfaces";

export const navLinksData:NavLinkItem[] = [
    {
      path: '/now-playing',
      label: 'En estreno',
      movieListName: 'nowPlayingMoviesList'
    },
    {
      path: '/popular',
      label: 'Populares',
      movieListName: 'popularMoviesList'
    },
    {
      path: '/top-rated',
      label: 'Mejor calificadas',
      movieListName: 'topRatedMoviesList'
    },
    {
      path: '/upcoming',
      label: 'Proximamente',
      movieListName: 'upcomingMoviesList'
    },
]