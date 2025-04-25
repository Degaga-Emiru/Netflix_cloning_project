import { useNavigate } from 'react-router-dom';

const profiles = [
  {
    id: 1,
    name: 'User 1',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'User 2',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Kids',
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Add Profile',
    image: 'https://i.pravatar.cc/150?img=4',
    isAdd: true,
  },
];

export default function ProfileSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl md:text-6xl mb-12">Who's watching?</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => !profile.isAdd && navigate('/browse')}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden mb-2 group-hover:border-2 group-hover:border-white ${profile.isAdd ? 'bg-gray-600 flex items-center justify-center' : ''}`}>
              {profile.isAdd ? (
                <span className="text-4xl">+</span>
              ) : (
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
              )}
            </div>
            <p className="text-gray-400 group-hover:text-white">
              {profile.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}