import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../components/AuthContext';

const RowItem = ({ movie }) => {
  const { user } = useAuth();

  const addToList = async () => {
    if (!user) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        myList: arrayUnion(movie)
      });
    } catch (error) {
      console.error('Error adding to list:', error);
    }
  };

  return (
    <div className="relative">
      {/* Movie card content */}
      <button onClick={addToList} className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1">
        <PlusIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};