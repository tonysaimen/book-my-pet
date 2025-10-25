import React from 'react'
import { Link } from 'react-router-dom'
import { useServices } from '../../../hooks/useServices'
import Card, { CardContent } from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'

const ServiceProviders = () => {
  const { services, loading } = useServices()

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Providers</h1>
          <p className="text-gray-600 mt-2">Manage service providers on the platform</p>
        </div>
        <Button as={Link} to="/admin/services/add">
          Add Provider
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.service_categories?.name}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  service.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {service.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📞</span>
                    {service.phone}
                  </div>
                )}
                {service.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📧</span>
                    {service.email}
                  </div>
                )}
                {service.rating && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⭐</span>
                    {service.rating} rating
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {service.description}
              </p>

              <div className="flex space-x-2">
                <Button variant="outline" size="small" className="flex-1">
                  Edit
                </Button>
                <Button variant="danger" size="small">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No service providers</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first service provider.</p>
            <Button as={Link} to="/admin/services/add">
              Add Service Provider
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ServiceProviders