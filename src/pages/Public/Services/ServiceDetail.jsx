import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { servicesAPI } from '../../../lib/api/services'
import { useApp } from '../../../contexts/AppContext'
import ServiceBooking from '../../../components/Services/ServiceBooking'
import ServiceProviderCard from '../../../components/Services/ServiceProviderCard'
import Card, { CardContent } from '../../../components/UI/Card'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'

const ServiceDetail = () => {
  const { id } = useParams()
  const { setError } = useApp()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showBooking, setShowBooking] = useState(false)

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const serviceData = await servicesAPI.getServiceById(id)
        setService(serviceData)
      } catch (error) {
        setError('Failed to load service details')
        console.error('Error fetching service:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchService()
    }
  }, [id, setError])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <p className="text-gray-600 mb-4">The service you're looking for doesn't exist.</p>
          <Link to="/services" className="btn btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <Link to="/services" className="text-gray-400 hover:text-gray-500">
                  Services
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-900">{service.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">
                      {service.service_categories?.icon}
                    </span>
                    <span className="text-lg text-gray-600">
                      {service.service_categories?.name}
                    </span>
                    {service.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">⭐</span>
                        <span className="ml-1 font-medium">{service.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                {service.is_active && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                )}
              </div>

              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {service.description || 'No description available for this service.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-lg font-medium text-gray-900">{service.phone}</p>
                  </div>
                )}
                {service.email && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-lg font-medium text-gray-900">{service.email}</p>
                  </div>
                )}
                {service.address && (
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="text-lg font-medium text-gray-900">{service.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Service Provider Info */}
          <ServiceProviderCard provider={service} />
        </div>

        {/* Booking Section */}
        <div className="lg:col-span-1">
          {showBooking ? (
            <ServiceBooking 
              service={service} 
              onBookingSuccess={() => setShowBooking(false)}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{service.service_categories?.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Book This Service
                </h3>
                <p className="text-gray-600 mb-6">
                  Schedule an appointment with {service.name}
                </p>
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Book Now
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail