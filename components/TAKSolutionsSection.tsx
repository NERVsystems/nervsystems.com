export default function TAKSolutionsSection() {
  const hostingTiers = [
    {
      name: "Starter",
      price: "$495",
      period: "/month",
      users: "Up to 50 users",
      nerva: "NERVA Lite (3 capabilities)",
      features: [
        "Basic TAK Server",
        "Standard plugins",
        "99% uptime SLA",
        "Email support",
        "Monthly security patches"
      ]
    },
    {
      name: "Professional",
      price: "$1,495",
      period: "/month",
      users: "Up to 250 users",
      nerva: "Full NERVA (all 6 capabilities)",
      popular: true,
      features: [
        "Enterprise TAK Server",
        "Premium plugins",
        "99.9% uptime SLA",
        "24/7 support",
        "Federation support",
        "AI system monitoring"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      users: "1,000+ users",
      nerva: "Custom NERVA + Training",
      features: [
        "Custom TAK infrastructure",
        "White-label options",
        "99.99% uptime SLA",
        "Dedicated support",
        "Multi-region deployment",
        "Compliance packages"
      ]
    }
  ];

  const consultingPackages = [
    {
      name: "Assessment",
      price: "$4,500",
      duration: "1-day on-site",
      features: [
        "TAK requirements assessment",
        "Infrastructure design recommendations",
        "User requirement documentation",
        "Plugin selection guidance",
        "30-day email support"
      ]
    },
    {
      name: "Deployment",
      price: "$15,000",
      duration: "Full deployment",
      popular: true,
      features: [
        "Everything in Assessment",
        "TAK Server deployment (up to 100 users)",
        "Plugin installation & configuration",
        "System integration",
        "Basic operator training (1 day)",
        "90-day priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "$45,000+",
      duration: "Large-scale",
      features: [
        "Everything in Deployment",
        "Large-scale deployment (100+ users)",
        "AI capability integration roadmap",
        "Custom plugin development",
        "Advanced training program (3 days)",
        "180-day dedicated support"
      ]
    }
  ];

  const trainingPrograms = [
    {
      name: "TAK Operator Fundamentals",
      duration: "1 day",
      price: "$595",
      perStudent: true,
      description: "TAK interface basics, map navigation, team coordination, and plugin usage"
    },
    {
      name: "NERVA AI Assistant Training",
      duration: "1 day",
      price: "$795",
      perStudent: true,
      description: "Natural language interface, automated mission planning, and AI workflows"
    },
    {
      name: "Advanced Mission Planning with AI",
      duration: "2 days",
      price: "$1,495",
      perStudent: true,
      popular: true,
      description: "Complex operations, intelligence fusion, edge computing, and scenario exercises"
    }
  ];

  return (
    <section id="solutions" className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            TAK Solutions & Services
          </h2>
          <p className="text-tactical-textDim text-xl max-w-3xl mx-auto">
            Complete TAK/ATAK deployment, managed hosting, consulting, and training for Asia Pacific
          </p>
        </div>

        {/* Managed Hosting */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">Managed TAK Hosting</h3>
          <p className="text-tactical-textDim text-center mb-12 max-w-2xl mx-auto">
            AI-enhanced TAK servers with NERVA integration. Your server doesn&apos;t just route data—it analyzes it.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {hostingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-tactical-accent' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{tier.name}</h4>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-tactical-textDim ml-2">{tier.period}</span>
                  </div>
                  <p className="text-sm text-tactical-textDim mb-1">{tier.users}</p>
                  <p className="text-xs font-mono text-tactical-accent">{tier.nerva}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="mt-1.5">
                        <div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div>
                      </div>
                      <span className="text-sm text-tactical-textDim">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Consulting */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">Deployment Consulting</h3>
          <p className="text-tactical-textDim text-center mb-12 max-w-2xl mx-auto">
            Expert TAK deployment with AI capability integration roadmap included
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {consultingPackages.map((pkg, index) => (
              <div
                key={index}
                className={`relative tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-tactical-accent' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                  <div className="text-3xl font-bold text-white mb-2">{pkg.price}</div>
                  <p className="text-sm text-tactical-textDim">{pkg.duration}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="mt-1.5">
                        <div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div>
                      </div>
                      <span className="text-sm text-tactical-textDim">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium">
                  Request Quote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">Training Programs</h3>
          <p className="text-tactical-textDim text-center mb-12 max-w-2xl mx-auto">
            TAK operator training with NERVA AI assistant certification
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <div
                key={index}
                className={`relative tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                  program.popular ? 'ring-2 ring-tactical-accent' : ''
                }`}
              >
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-2">{program.name}</h4>
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-bold text-white">{program.price}</span>
                    {program.perStudent && (
                      <span className="text-sm text-tactical-textDim ml-2">/student</span>
                    )}
                  </div>
                  <p className="text-sm text-tactical-textDim mb-3">Duration: {program.duration}</p>
                  <p className="text-sm text-tactical-textDim">{program.description}</p>
                </div>

                <button className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>

          {/* Volume Discounts */}
          <div className="mt-8 text-center">
            <p className="text-sm text-tactical-textDim">
              <span className="font-semibold text-white">Volume Discounts:</span> 5-10 students (10% off) • 11-20 students (20% off) • 21+ students (30% off)
            </p>
          </div>
        </div>

        {/* Additional Services */}
        <div className="tactical-border p-8 bg-white/5 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Additional TAK Services</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-bold text-white mb-2">System Administration</h4>
              <p className="text-sm text-tactical-textDim mb-2">
                Ongoing TAK server management with AI monitoring
              </p>
              <p className="text-tactical-accent font-mono text-sm">From $450/month</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Plugin Development</h4>
              <p className="text-sm text-tactical-textDim mb-2">
                Custom TAK plugins with NERVA AI integration
              </p>
              <p className="text-tactical-accent font-mono text-sm">From $15,000</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Edge Hardware</h4>
              <p className="text-sm text-tactical-textDim mb-2">
                NERV Edge compute (GPU in a helmet) for field deployment
              </p>
              <p className="text-tactical-accent font-mono text-sm">Contact for pricing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
