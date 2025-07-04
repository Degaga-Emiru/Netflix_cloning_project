import React from 'react';
import Row from '../pages/Row';
import requests from '../services/requests';

const TVShows = () => {
  return (
    <div className="pt-32 pb-12 px-4 md:px-12">
      <Row title="Popular TV Shows" fetchUrl={requests.fetchTVShows} />
      <Row title="Top Rated TV Shows" fetchUrl={requests.fetchTopRatedTV} />
      <Row title="Trending TV Shows" fetchUrl={requests.fetchTrendingTV} />
    </div>
  );
};

export default TVShows;