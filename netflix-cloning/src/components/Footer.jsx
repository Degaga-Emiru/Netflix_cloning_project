import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 py-8 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-4 mb-6">
          <FaFacebook className="h-6 w-6" />
          <FaInstagram className="h-6 w-6" />
          <FaTwitter className="h-6 w-6" />
          <FaYoutube className="h-6 w-6" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <p className="hover:underline cursor-pointer">Audio Description</p>
            <p className="hover:underline cursor-pointer">Investor Relations</p>
            <p className="hover:underline cursor-pointer">Legal Notices</p>
          </div>
          <div className="space-y-2">
            <p className="hover:underline cursor-pointer">Help Center</p>
            <p className="hover:underline cursor-pointer">Jobs</p>
            <p className="hover:underline cursor-pointer">Cookie Preferences</p>
          </div>
          <div className="space-y-2">
            <p className="hover:underline cursor-pointer">Gift Cards</p>
            <p className="hover:underline cursor-pointer">Terms of Use</p>
            <p className="hover:underline cursor-pointer">Corporate Information</p>
          </div>
          <div className="space-y-2">
            <p className="hover:underline cursor-pointer">Media Center</p>
            <p className="hover:underline cursor-pointer">Privacy</p>
            <p className="hover:underline cursor-pointer">Contact Us</p>
          </div>
        </div>
        
        <button className="border border-gray-500 px-4 py-2 mb-6">
          Service Code
        </button>
        
        <p className="text-sm">© 1997-{new Date().getFullYear()} Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;