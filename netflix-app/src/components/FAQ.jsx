import React, { useState } from 'react';

const faqs = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 199 to ₹ 799 a month. No extra costs, no contracts."
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles."
  },
  {
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded">
              <button
                className="w-full text-left p-4 md:p-6 text-lg md:text-2xl bg-gray-900 hover:bg-gray-800 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-2xl">
                  {activeIndex === index ? '×' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-4 md:p-6 bg-gray-900 text-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg md:text-xl mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-grow max-w-md px-4 py-3 bg-black bg-opacity-70 border border-gray-600 rounded"
            />
            <button className="bg-netflixRed text-white px-6 py-3 rounded-md font-medium text-xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}