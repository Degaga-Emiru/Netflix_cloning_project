import { useState, useEffect } from 'react';

export function useList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem('netflixMyList');
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  const addToList = (item) => {
    const newList = [...list, item];
    setList(newList);
    localStorage.setItem('netflixMyList', JSON.stringify(newList));
  };

  const removeFromList = (itemId) => {
    const newList = list.filter(item => item.id !== itemId);
    setList(newList);
    localStorage.setItem('netflixMyList', JSON.stringify(newList));
  };

  const isInList = (itemId) => {
    return list.some(item => item.id === itemId);
  };

  return { list, addToList, removeFromList, isInList };
}