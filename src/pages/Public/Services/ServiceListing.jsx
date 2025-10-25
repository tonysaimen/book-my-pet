import React, { useState } from 'react'
import { useServices } from '../../../hooks/useServices'
import ServiceCard from '../../../components/Services/ServiceCard'
import ServiceFilter from '../../../components/Services/ServiceFilter'
import SearchBar from '../../../components/UI/SearchBar'

const ServiceListing = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minRating: ''
  })
  
  const { services, loading, error } = useServices(filters)

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    service.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
    service.service_categories?.name.toLowerCase().includes(filters.search.toLowerCase())
  )

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Services</h1>
        <p className="text-gray-600">
          Professional care services for your beloved pets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1">
          <ServiceFilter 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Search and results header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <SearchBar
                value={filters.search}
                onChange={(value) => handleFilterChange({ ...filters, search: value })}
                placeholder="Search services by name, category, or description..."
                className="flex-1"
              />
              <div className="text-sm text-gray-600">
                Showing {filteredServices.length} services
              </div>
            </div>

            {error && (
              <div className="alert alert-error mb-6">
                {error}
              </div>
            )}
          </div>

          {/* Services grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔧</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceListing