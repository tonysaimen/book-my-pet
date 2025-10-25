import React from 'react'
import Card, { CardContent } from '../UI/Card'

const ServiceProviderCard = ({ provider }) => {
  const getRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐')
    }
    
    if (hasHalfStar) {
      stars.push('½')
    }
    
    return stars.join('')
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
              {provider.service_categories?.icon || '🔧'}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {provider.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-2">
              {provider.service_categories?.name}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              {provider.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span>{provider.rating}</span>
                  <span className="ml-1">({getRatingStars(provider.rating)})</span>
                </div>
              )}
              
              {provider.phone && (
                <span>📞 {provider.phone}</span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {provider.description}
            </p>
            
            {provider.address && (
              <div className="flex items-start text-sm text-gray-500 mb-3">
                <span className="mr-2">📍</span>
                <span className="flex-1">{provider.address}</span>
              </div>
            )}
            
            {provider.email && (
              <div className="text-sm text-gray-500">
                <span className="mr-2">📧</span>
                {provider.email}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceProviderCard