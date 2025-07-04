import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import MovieCard from '../components/MovieCard';
import Row from '../pages/Row';
import requests from '../services/requests';

const MyList = () => {
  const { user } = useAuth();
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyList = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'users'), 
          where('uid', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setMyList(userData.myList || []);
        }
      } catch (error) {
        console.error('Error fetching my list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, [user]);

  if (loading) {
    return (
      <div className="pt-32 pb-12 px-4 md:px-12">
        <h2 className="text-2xl font-bold mb-8">My List</h2>
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-700 w-40 h-60 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-12 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-8">My List</h2>
      
      {myList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {myList.map((item) => (
            <MovieCard key={item.id} movie={item} showRemoveButton />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Your list is empty</p>
          <p className="text-gray-500">Add movies and TV shows to watch later</p>
        </div>
      )}
      
      {/* Recommended content */}
      <Row title="Recommended For You" fetchUrl={requests.fetchTrending} />
    </div>
  );
};

export default MyList;