import React from 'react'
import { Link } from 'react-router-dom'
import Card, { CardContent } from '../UI/Card'

const PetCard = ({ pet }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        <img
          src={pet.image_url || '/api/placeholder/300/200'}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            pet.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {pet.status === 'available' ? 'Available' : 'Adopted'}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{pet.name}</h3>
          <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{pet.age} yrs</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {pet.species}
            </span>
            {pet.breed && (
              <span className="text-sm text-gray-600 truncate">{pet.breed}</span>
            )}
          </div>
          <span className="text-sm font-medium text-gray-900">
            ${pet.adoption_fee}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[2.5rem]">
          {pet.description || 'No description available.'}
        </p>
        
        <Link
          to={`/pets/${pet.id}`}
          className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors block font-medium"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  )
}

export default PetCard