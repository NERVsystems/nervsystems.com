export default function PartnersSection() {
  const partners = [
    {
      name: "NVIDIA Inception",
      description: "Member of NVIDIA Inception Program for AI startups",
      logo: "/img/nvidia-inception-badge.png", // Placeholder - needs official badge
      link: "https://www.nvidia.com/en-us/startups/",
      placeholder: true
    },
    {
      name: "National University of Singapore",
      description: "Incubated at NUS Enterprise",
      logo: "/img/nus-logo.png", // Placeholder - needs official logo
      link: "https://enterprise.nus.edu.sg/",
      placeholder: true
    },
    {
      name: "King's College London",
      description: "Affiliated with War Studies Department",
      logo: "/img/kcl-logo.png", // Placeholder - needs official logo
      link: "https://www.kcl.ac.uk/warstudies",
      placeholder: true
    }
  ];

  return (
    <section id="partners" className="relative py-16 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Trusted by Leading Organizations
          </h3>
          <p className="text-tactical-textDim text-sm max-w-3xl mx-auto">
            NERV Systems is backed by NVIDIA Inception, incubated at National University of Singapore, and affiliated with King&apos;s College London War Studies
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 text-center"
            >
              {/* Logo Placeholder */}
              {partner.placeholder ? (
                <div className="h-20 flex items-center justify-center mb-4 bg-white/5 rounded border border-white/10">
                  <span className="text-tactical-textDim text-xs font-mono">
                    {partner.name} Logo
                  </span>
                </div>
              ) : (
                <div className="h-20 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              {/* Partner Name */}
              <h4 className="font-bold text-white mb-2 group-hover:text-tactical-accent transition-colors">
                {partner.name}
              </h4>

              {/* Description */}
              <p className="text-xs text-tactical-textDim">
                {partner.description}
              </p>
            </a>
          ))}
        </div>

        {/* Note about official badges */}
        <div className="mt-8 text-center">
          <p className="text-xs text-tactical-textDim/50 italic">
            Official partner logos will be added upon receipt of branding assets
          </p>
        </div>
      </div>
    </section>
  );
}
