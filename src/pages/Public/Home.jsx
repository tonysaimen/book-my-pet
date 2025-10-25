import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'
import PetMatchmaker from '../../components/AI/PetMatchmaker'
import { usePets } from '../../hooks/usePets'

const Home = () => {
  const { pets } = usePets({ species: 'dog', age: '0-1' })

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Matching',
      description: 'Smart algorithms help you find pets that perfectly match your lifestyle and preferences.'
    },
    {
      icon: '🔒',
      title: 'Trusted Partners',
      description: 'All our shelters and service providers are thoroughly vetted for quality and reliability.'
    },
    {
      icon: '📱',
      title: 'All-in-One Platform',
      description: 'From adoption to ongoing care, manage everything in one convenient place.'
    },
    {
      icon: '⚡',
      title: 'Quick & Easy',
      description: 'Streamlined processes make pet adoption and service booking faster than ever.'
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-blue-600 block">Pet Companion</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Adopt, care, and cherish with BOOK MY PET. Your all-in-one platform 
              for pet adoption and professional care services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                as={Link} 
                to="/pets" 
                size="large"
                className="text-lg px-8 py-4"
              >
                🐕 Browse Pets
              </Button>
              <Button 
                as={Link} 
                to="/services" 
                variant="outline" 
                size="large"
                className="text-lg px-8 py-4"
              >
                ✂️ Book Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Matchmaker Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Your Perfect Match with AI
            </h2>
            <p className="text-lg text-gray-600">
              Answer a few questions and let our AI find the ideal pet for your lifestyle
            </p>
          </div>
          <PetMatchmaker />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose BOOK MY PET?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing pet adoption and care with technology and compassion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home