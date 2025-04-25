const Footer = () => {
    const footerLinks = [
      [
        { text: "FAQ", url: "#" },
        { text: "Investor Relations", url: "#" },
        { text: "Privacy", url: "#" },
        { text: "Speed Test", url: "#" }
      ],
      [
        { text: "Help Center", url: "#" },
        { text: "Jobs", url: "#" },
        { text: "Cookie Preferences", url: "#" },
        { text: "Legal Notices", url: "#" }
      ],
      [
        { text: "Account", url: "#" },
        { text: "Ways to Watch", url: "#" },
        { text: "Corporate Information", url: "#" },
        { text: "Only on Netflix", url: "#" }
      ],
      [
        { text: "Media Center", url: "#" },
        { text: "Terms of Use", url: "#" },
        { text: "Contact Us", url: "#" }
      ]
    ];
  
    return (
      <footer className="bg-black text-gray-500 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="mb-8">Questions? Call 1-844-505-2993</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {footerLinks.map((column, colIndex) => (
              <div key={colIndex}>
                <ul className="space-y-3">
                  {column.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url} className="hover:underline">{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          <div className="mb-8">
            <select className="bg-black border border-gray-600 p-2">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>
  
          <p>Netflix Clone (Not the real Netflix)</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;