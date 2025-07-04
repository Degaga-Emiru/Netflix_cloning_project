import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

export function useList() {
  const [list, setList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setList(docSnapshot.data().myList || []);
      }
    });

    return unsubscribe;
  }, [user]);

  const addToList = async (movie) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      myList: arrayUnion(movie),
    });
  };

  const removeFromList = async (movieId) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      myList: arrayRemove(list.find((item) => item.id === movieId)),
    });
  };

  return { list, addToList, removeFromList };
}