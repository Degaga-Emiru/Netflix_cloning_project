import { FaCheck, FaPlus, FaTv, FaDownload, FaChildren } from 'react-icons/fa';

const ReasonsToJoin = () => {
  const reasons = [
    {
      icon: <FaCheck className="text-netflix-red text-4xl mb-4" />,
      title: "Watch Anywhere",
      description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
    },
    {
      icon: <FaPlus className="text-netflix-red text-4xl mb-4" />,
      title: "Cancel Anytime",
      description: "No commitments. Cancel online anytime with just a few clicks."
    },
    {
      icon: <FaTv className="text-netflix-red text-4xl mb-4" />,
      title: "Award-Winning Content",
      description: "Enjoy Netflix originals, popular movies, and hit TV shows."
    },
    {
      icon: <FaDownload className="text-netflix-red text-4xl mb-4" />,
      title: "Download & Go",
      description: "Download your shows to watch offline wherever you go."
    },
    {
      icon: <FaChildren className="text-netflix-red text-4xl mb-4" />,
      title: "Kids Friendly",
      description: "Dedicated kids profile with parental controls included."
    }
  ];

  return (
    <div className="bg-black text-white py-16 px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">More Reasons to Join</h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {reasons.map((reason, index) => (
          <div key={index} className="bg-gray-900 p-6 rounded-lg">
            {reason.icon}
            <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
            <p className="text-gray-400">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsToJoin;