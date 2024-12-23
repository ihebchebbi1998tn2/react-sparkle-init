import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift">
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Your Next Project
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Build something amazing with modern web technologies
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;