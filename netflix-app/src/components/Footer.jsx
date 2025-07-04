import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "Jobs", "Contact Us"]
  },
  {
    title: "Support",
    links: ["Account", "Plans", "Help Center"]
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie Preferences"]
  },
  {
    title: "Follow Us",
    links: ["Facebook", "Twitter", "Instagram"]
  }
];

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p>Questions? Call 000-800-040-1843</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to="#" className="hover:text-white">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mb-8">
          <select className="bg-black text-white px-4 py-2 border border-gray-600 rounded">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>
        
        <div>
          <p>Netflix India</p>
        </div>
      </div>
    </footer>
  );
}