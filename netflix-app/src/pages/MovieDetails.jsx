import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import MovieInfo from '../components/MovieInfo';
import requests from '../services/requests';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(requests.fetchMovieDetails(id));
      setMovie(response.data);
      
      // Fetch trailer
      const videos = await axios.get(requests.fetchMovieVideos(id));
      const trailer = videos.data.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      setTrailer(trailer);
      setLoading(false);
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflixBlack">
      {trailer && (
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            playing
            controls
          />
        </div>
      )}
      
      <MovieInfo movie={movie} />
    </div>
  );
}