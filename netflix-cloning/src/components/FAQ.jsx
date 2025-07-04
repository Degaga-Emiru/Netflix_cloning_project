import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What is Netflix?',
    answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There\'s always something new to discover and new TV shows and movies are added every week!'
  },
  {
    question: 'How much does Netflix cost?',
    answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $9.99 to $19.99 a month. No extra costs, no contracts.'
  },
  {
    question: 'Where can I watch?',
    answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you\'re on the go and without an internet connection. Take Netflix with you anywhere.'
  },
  {
    question: 'How do I cancel?',
    answer: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.'
  },
  {
    question: 'What can I watch on Netflix?',
    answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.'
  },
  {
    question: 'Is Netflix good for kids?',
    answer: 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-16 px-4 md:px-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 md:p-6 bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl text-left">{faq.question}</h3>
              {openIndex === index ? (
                <MinusIcon className="h-6 w-6" />
              ) : (
                <PlusIcon className="h-6 w-6" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 md:p-6 bg-gray-800">
                <p className="text-lg">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;