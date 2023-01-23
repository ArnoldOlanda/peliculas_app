

import React, { createContext, useState } from 'react'
import { Result } from '../interfaces/index';

interface Props {
    children: JSX.Element
}

export interface InitialState {
    nowPlayingMoviesList: Result[],
    popularMoviesList: Result[],
    topRatedMoviesList: Result[],
    upcomingMoviesList: Result[],
    currentMovieList: Result[],
    currentMovieListPath: string
}

interface ContextProps {
    state: InitialState;
    setNowPlaying: (data: Result[]) => void;
    setPopular: (data: Result[]) => void;
    setTopRated: (data: Result[]) => void;
    setUpcoming: (data: Result[]) => void;
    setCurrentMovieList: (data: Result[]) => void;
    setCurrentMovieListPath: (path:string) => void;
}

const initialState: InitialState = {
    nowPlayingMoviesList: [],
    popularMoviesList: [],
    topRatedMoviesList: [],
    upcomingMoviesList: [],
    currentMovieList: [],
    currentMovieListPath: "/now-playing"
}


export const MovieContext = createContext<ContextProps>({} as ContextProps);

export const MovieProvider = ({ children }: Props) => {

    const [state, setState] = useState<InitialState>(initialState);

    const setNowPlaying = (data: Result[]) => {
        setState(prev => ({
            ...prev,
            nowPlayingMoviesList: data
        }))
    };
    const setPopular = (data: Result[]) => {
        setState(prev => ({
            ...prev,
            popularMoviesList: data
        }))
    };
    const setTopRated = (data: Result[]) => {
        setState(prev => ({
            ...prev,
            topRatedMoviesList: data
        }))
    };
    const setUpcoming = (data: Result[]) => {
        setState(prev => ({
            ...prev,
            upcomingMoviesList: data
        }))
    };

    const setCurrentMovieList = (data: Result[]) => {
        setState(prev => ({
            ...prev,
            currentMovieList: data
        }))
    }

    const setCurrentMovieListPath = (path:string)=>{
        setState(prev=>({
            ...prev,
            currentMovieListPath: path
        }))
    }

    return (
        <MovieContext.Provider
            value={{
                state,
                setNowPlaying,
                setPopular,
                setTopRated,
                setUpcoming,
                setCurrentMovieList,
                setCurrentMovieListPath
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}
