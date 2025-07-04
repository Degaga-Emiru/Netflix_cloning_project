import { useState, useEffect } from 'react';

export const useList = () => {
  const [list, setList] = useState([]);

  // Load list from localStorage on initial render
  useEffect(() => {
    const savedList = localStorage.getItem('netflixMyList');
    if (savedList) {
      setList(JSON.parse(savedList));
    }
  }, []);

  // Save list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('netflixMyList', JSON.stringify(list));
  }, [list]);

  const addToList = (item) => {
    // Check if item already exists in list
    if (!list.some(listItem => listItem.id === item.id)) {
      setList([...list, item]);
    }
  };

  const removeFromList = (itemId) => {
    setList(list.filter(item => item.id !== itemId));
  };

  const isInList = (itemId) => {
    return list.some(item => item.id === itemId);
  };

  return { list, addToList, removeFromList, isInList };
};