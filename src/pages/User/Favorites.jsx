import React from 'react'
import { Link } from 'react-router-dom'
import Card, { CardContent } from '../../components/UI/Card'
import Button from '../../components/UI/Button'

const Favorites = () => {
  const favoritePets = [
    {
      id: 1,
      name: 'Luna',
      species: 'cat',
      breed: 'Siamese',
      age: 3,
      adoption_fee: 150,
      image_url: '/api/placeholder/300/200',
      status: 'available'
    },
    {
      id: 2,
      name: 'Max',
      species: 'dog',
      breed: 'Labrador Mix',
      age: 1,
      adoption_fee: 200,
      image_url: '/api/placeholder/300/200',
      status: 'available'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        <p className="text-gray-600 mt-2">Pets you've saved for later</p>
      </div>

      {favoritePets.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">❤️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start browsing pets and add your favorites!</p>
            <Button as={Link} to="/pets">
              Browse Pets
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={pet.image_url}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                  <span className="text-sm text-gray-500">{pet.age} yrs</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {pet.species}
                    </span>
                    <span className="text-sm text-gray-600">{pet.breed}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ${pet.adoption_fee}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button as={Link} to={`/pets/${pet.id}`} className="w-full">
                    View Details
                  </Button>
                  <Button variant="outline" className="w-full">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Adoption Tips */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Adopt?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Adoption Process</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1. Submit adoption application</li>
                <li>2. Meet & greet with the pet</li>
                <li>3. Home check (if required)</li>
                <li>4. Finalize adoption paperwork</li>
                <li>5. Welcome your new family member!</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our team is here to help you find the perfect pet and guide you through the adoption process.
              </p>
              <Button variant="outline" size="small">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Favorites
