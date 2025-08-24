import React from 'react';
import { useAppController } from '../controllers/app';

const HomeView: React.FC = () => {
  const { appInfo, loading, error, refreshStats } = useAppController();

  const features = [
    {
      title: 'MVC Architecture',
      description: 'Clean separation of concerns with Model, View, Controller pattern',
      icon: '🏗️',
      color: 'bg-blue-500'
    },
    {
      title: 'React + TypeScript',
      description: 'Modern frontend development with type safety',
      icon: '⚛️',
      color: 'bg-purple-500'
    },
    {
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      icon: '🎨',
      color: 'bg-green-500'
    }
  ];

  const stats = appInfo ? [
    { label: 'Components', value: appInfo.stats.components.toString(), icon: '🧩' },
    { label: 'Routes', value: appInfo.stats.routes.toString(), icon: '🛣️' },
    { label: 'Services', value: appInfo.stats.services.toString(), icon: '🔧' },
    { label: 'Models', value: appInfo.stats.models.toString(), icon: '📊' }
  ] : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading application...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800">{error}</div>
        <button 
          onClick={refreshStats}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Version {appInfo?.version || '1.0.0'}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="text-blue-600">
                {appInfo?.name || 'MVC Demo'}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {appInfo?.description || 'A modern React TypeScript application built with MVC architecture'}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <span className="mr-2">🚀</span>
                Get Started
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <span className="mr-2">📚</span>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Statistics</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Overview of our MVC architecture components and structure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our MVC architecture powerful and efficient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies for optimal performance and developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '⚛️', name: 'React', desc: 'UI Library' },
              { icon: '📘', name: 'TypeScript', desc: 'Type Safety' },
              { icon: '🎨', name: 'Tailwind CSS', desc: 'Styling' },
              { icon: '🔄', name: 'MVC Pattern', desc: 'Architecture' }
            ].map((tech, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-gray-600 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold mb-2">Ready to Build Something Amazing?</h3>
          <p className="text-gray-300 mb-6">
            Start your next project with our MVC architecture template
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
