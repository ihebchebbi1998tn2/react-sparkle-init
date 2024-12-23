import React from 'react';
import { Rocket, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Fast Performance",
      description: "Lightning-fast loading times and smooth interactions.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure by Default",
      description: "Built with security best practices from the ground up.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Modern Stack",
      description: "Using the latest web technologies and frameworks.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Amazing Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;