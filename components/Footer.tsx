export default function Footer() {
  return (
    <footer className="bg-tactical-surface border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/img/Screenshot 2025-06-20 at 20.44.53.png"
                alt="NERV Logo"
                className="h-10 w-auto"
              />
              <span className="font-mono font-bold text-lg text-white tracking-wider">
                NERV SYSTEMS
              </span>
            </div>
            <p className="text-tactical-textDim text-sm leading-relaxed">
              Tactical AI for Mission Planning and Edge Intelligence
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              {['Features', 'Platform', 'Contact', 'Documentation'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-tactical-textDim hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <div className="text-tactical-textDim text-sm space-y-2">
              <p>Email: contact@nervsystems.com</p>
              <p>Location: United States</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center text-tactical-textDim text-sm">
            <p>
              © 2025 NERV Systems. All rights reserved.
            </p>
            <p className="mt-4 md:mt-0">
              Built for the tactical edge
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
