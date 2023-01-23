import React from 'react'
import { Result } from '../interfaces'
import { Link } from 'react-router-dom';

const url = "https://image.tmdb.org/t/p/w500"

interface Props {
    movies: Result[];
    onSetValue: (v: string) => void;
}

export const QueryResults = ({ movies, onSetValue }: Props) => {
    return (
        <div className='bg-gray-100 w-screen md:w-[40%] max-h-[45vh] shadow-xl absolute top-[100%] transition overflow-auto z-50 py-2 animate-fadeIn'>
            {
                movies?.map(m => (
                    <div key={m.id} className="text-gray-600 p-2 hover:bg-gray-200 transition">
                        <Link
                            to={`/movie/${m.id}`}
                            className='flex'
                            onClick={() => onSetValue("")}
                        >
                            <img
                                src={url + m.poster_path}
                                alt="poster_img"
                                className='w-16 mr-4'
                            />
                            <div>
                                <div className='font-bold text-xl'>{m.title}</div>
                                <span>{new Date(m.release_date).getFullYear()}</span>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
