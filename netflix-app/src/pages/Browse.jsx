import React from 'react';
import BrowseHeader from '../pages/BrowseHeader';
import Row from '../pages/Row';
import useList from '../hooks/useList';
import requests from '../services/requests';

export default function Browse() {
  const list = useList();

  return (
    <div className="relative min-h-screen">
      <BrowseHeader />
      
      <div className="pt-32 pb-12 px-4 md:px-12">
        <Row title="My List" movies={list} isMyList />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="TV Shows" fetchUrl={requests.fetchTVShows} />
        <Row title="Popular" fetchUrl={requests.fetchPopular} />
        <Row title="Upcoming" fetchUrl={requests.fetchUpcoming} />
      </div>
    </div>
  );
}