import React from 'react'
import { Link } from 'react-router-dom'
import Card, { CardContent } from '../UI/Card'

const ServiceCard = ({ service }) => {
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Grooming': '✂️',
      'Veterinary': '🏥',
      'Training': '🎓',
      'Boarding': '🏠'
    }
    return icons[categoryName] || '🔧'
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        <img
          src={service.image_url || '/api/placeholder/300/200'}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{service.name}</h3>
          <span className="text-2xl ml-2">
            {getCategoryIcon(service.service_categories?.name)}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          {service.service_categories?.name}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="ml-1 text-sm text-gray-700">
              {service.rating || '4.5'}
            </span>
          </div>
          {service.is_active && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Available
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[2.5rem]">
          {service.description || 'Professional pet care services.'}
        </p>
        
        <div className="space-y-2">
          <Link
            to={`/services/${service.id}`}
            className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors block font-medium"
          >
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceCard