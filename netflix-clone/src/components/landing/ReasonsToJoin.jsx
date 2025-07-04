import { FaTv, FaDownload, FaGlobeAmericas, FaChild } from "react-icons/fa";

const ReasonsToJoin = () => {
  const reasons = [
    {
      title: "Enjoy on your TV",
      description:
        "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      icon: <FaTv className="text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Download your shows to watch offline",
      description:
        "Save your favorites easily and always have something to watch.",
      icon: <FaDownload className="text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Watch everywhere",
      description:
        "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
      icon: <FaGlobeAmericas className="text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Create profiles for kids",
      description:
        "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
      icon: <FaChild className="text-4xl mb-4 mx-auto" />,
    },
  ];

  return (
    <div className="bg-black py-12 px-4 md:px-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
          More Reasons to Join
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              {reason.icon}
              <h3 className="text-xl font-bold text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonsToJoin;