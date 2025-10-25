import React from 'react'
import Card, { CardContent } from '../UI/Card'

const PetDetail = ({ pet }) => {
  if (!pet) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No pet information available.</p>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pet Image */}
          <div>
            <img
              src={pet.image_url || '/api/placeholder/500/400'}
              alt={pet.name}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Pet Information */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  pet.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {pet.status === 'available' ? 'Available' : 'Adopted'}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {pet.species}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 capitalize">
                  {pet.gender}
                </span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Breed</h3>
                <p className="text-lg font-medium text-gray-900">{pet.breed || 'Mixed'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Age</h3>
                <p className="text-lg font-medium text-gray-900">{pet.age} years</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Adoption Fee</h3>
                <p className="text-lg font-medium text-green-600">${pet.adoption_fee}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Size</h3>
                <p className="text-lg font-medium text-gray-900 capitalize">
                  {pet.size || 'Medium'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About {pet.name}</h3>
              <p className="text-gray-700 leading-relaxed">
                {pet.description || 'No description available for this pet.'}
              </p>
            </div>

            {/* Characteristics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Characteristics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Energy Level:</span>
                  <span className="font-medium">{pet.energy_level || 'Medium'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Good with Kids:</span>
                  <span className="font-medium">{pet.good_with_kids ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Good with Pets:</span>
                  <span className="font-medium">{pet.good_with_pets ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Vaccinated:</span>
                  <span className="font-medium">{pet.vaccinated ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PetDetail