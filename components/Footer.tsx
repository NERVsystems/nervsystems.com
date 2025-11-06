export default function Footer() {
  return (
    <footer className="bg-tactical-surface border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/img/Screenshot 2025-06-20 at 20.44.53.png"
                alt="NERV Systems"
                className="h-10 w-auto"
              />
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
              <li>
                <a href="#nerva" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  NERVA AI
                </a>
              </li>
              <li>
                <a href="#features" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  Platform
                </a>
              </li>
              <li>
                <a href="#platform" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  TAK Integration
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  Solutions & Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Affiliations */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <div className="text-tactical-textDim text-sm space-y-2 mb-6">
              <p>Email: contact@nervsystems.com</p>
              <p>Asia Pacific Operations</p>
            </div>
            <div className="text-xs text-tactical-textDim/70 space-y-1">
              <p>🔷 NVIDIA Inception Member</p>
              <p>🎓 NUS Enterprise Incubated</p>
              <p>🎖️ King&apos;s College London Affiliated</p>
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
