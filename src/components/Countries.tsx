import React from 'react';
import { Search, Clock, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Top Talent <span className="text-[#2C54E7]">Fast</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            24/7 AI-powered recruitment technology connecting European talent with leading Japanese companies
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Search className="w-12 h-12 text-[#2C54E7] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">AI-powered candidate matching system</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-[#2C54E7] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Round-the-clock recruitment support</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-[#2C54E7] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Network</h3>
              <p className="text-gray-600">Access to European talent pool</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
