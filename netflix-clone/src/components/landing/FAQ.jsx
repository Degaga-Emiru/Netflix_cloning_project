import { useState } from 'react';

const FAQ = ({ onSignupClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
    },
    {
      question: "How much does Netflix cost?",
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $9.99 to $19.99 a month. No extra costs, no contracts."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app."
    },
    {
      question: "How do I cancel?",
      answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees - start or stop your account anytime."
    },
    {
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
      question: "Is Netflix good for kids?",
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space."
    }
  ];

  return (
    <div className="bg-black text-white py-16 px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-2">
            <button 
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full bg-gray-900 text-left p-4 flex justify-between items-center hover:bg-gray-800 transition"
            >
              <span className="text-xl">{faq.question}</span>
              <span className="text-2xl">{activeIndex === index ? '×' : '+'}</span>
            </button>
            <div className={`bg-gray-900 px-4 py-2 ${activeIndex === index ? 'block' : 'hidden'}`}>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg md:text-xl mb-8">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="flex flex-col md:flex-row justify-center max-w-2xl mx-auto gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="flex-grow p-4 bg-black/70 border border-gray-600 rounded-md"
          />
          <button 
            onClick={onSignupClick}
            className="bg-netflix-red text-white py-4 px-6 text-xl rounded-md font-semibold hover:bg-red-700 transition"
          >
            Get Started &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;