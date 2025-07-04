import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../services/requests';

const CastCarousel = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(requests.fetchMovieCredits(movieId));
      setCast(response.data.cast.slice(0, 10));
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4">Cast</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {cast.map(person => (
          <div key={person.id} className="flex-shrink-0 w-24 text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2 mx-auto">
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : '/placeholder-person.jpg'
                }
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold truncate">{person.name}</p>
            <p className="text-xs text-gray-400 truncate">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastCarousel;