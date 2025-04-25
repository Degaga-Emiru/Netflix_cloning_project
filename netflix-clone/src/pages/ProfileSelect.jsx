import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';

const ProfileSelect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Sample profiles data
  const profiles = [
    {
      id: 1,
      name: 'User 1',
      image: 'https://i.pravatar.cc/150?img=1',
      isUser: true
    },
    {
      id: 2,
      name: 'User 2',
      image: 'https://i.pravatar.cc/150?img=2',
      isUser: true
    },
    {
      id: 3,
      name: 'Kids',
      image: 'https://i.pravatar.cc/150?img=3',
      isKids: true
    },
    {
      id: 4,
      name: 'Add Profile',
      image: '',
      isAdd: true
    }
  ];

  const handleProfileSelect = (profile) => {
    if (profile.isAdd) {
      // Handle add profile logic
      console.log('Add new profile');
    } else {
      // Navigate to browse page
      navigate('/browse');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center text-white p-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Who's watching?</h1>
        <p className="text-lg text-gray-400">{user?.email}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleProfileSelect(profile)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-md mb-2 
              ${profile.isAdd ? 'bg-gray-600 flex items-center justify-center' : ''}
              ${profile.isKids ? 'border-2 border-netflix-red' : ''}
              group-hover:border-2 group-hover:border-white transition-all`}
            >
              {profile.isAdd ? (
                <FaPlus className="text-4xl text-gray-400" />
              ) : (
                <>
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  {profile.isUser && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <FaPencilAlt className="text-white text-xl" />
                    </div>
                  )}
                </>
              )}
            </div>
            <p className={`text-gray-400 group-hover:text-white transition-colors ${profile.isKids ? 'text-netflix-red' : ''}`}>
              {profile.name}
            </p>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/')}
        className="mt-16 border border-gray-600 px-6 py-2 text-gray-400 hover:text-white hover:border-white transition-colors"
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelect;