import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RowItem from '../components/RowItem';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';
import { useList } from '../hooks/useList';

export default function Row({ title, fetchUrl, isMyList = false }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const list = useList();

  useEffect(() => {
    if (isMyList) return;
    
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setLoading(false);
    }
    fetchData();
  }, [fetchUrl, isMyList]);

  if (isMyList && list.length === 0) return null;
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-700 w-40 h-60 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  const slideLeft = () => {
    const slider = document.getElementById(`slider-${title}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById(`slider-${title}`);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <div className="relative group">
        <ChevronLeftIcon 
          onClick={slideLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer z-10"
        />
        <div
          id={`slider-${title}`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {isMyList ? (
            list.map((movie) => (
              <RowItem key={movie.id} movie={movie} />
            ))
          ) : (
            movies.map((movie) => (
              <RowItem key={movie.id} movie={movie} />
            ))
          )}
        </div>
        <ChevronRightIcon
          onClick={slideRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer z-10"
        />
      </div>
    </div>
  );
}