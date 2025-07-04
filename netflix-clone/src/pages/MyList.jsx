import Nav from '../components/Nav';
import Row from '../components/Row';
import { useList } from '../hooks/useList';

const MyList = () => {
  const { list } = useList();

  return (
    <div className="relative bg-netflix-black min-h-screen">
      <Nav />
      <div className="pt-16">
        {list.length > 0 ? (
          <Row title="My List" movies={list} />
        ) : (
          <div className="text-white text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Your list is empty</h2>
            <p className="text-gray-400">Add movies and TV shows to your list to watch them later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;