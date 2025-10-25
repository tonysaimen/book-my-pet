import React, { useState } from 'react'
import { useApp } from '../../../contexts/AppContext'
import { usePets } from '../../../hooks/usePets'
import PetGrid from '../../../components/Pets/PetGrid'
import PetFilter from '../../../components/Pets/PetFilter'
import SearchBar from '../../../components/UI/SearchBar'

const BrowsePets = () => {
  const { filters, setFilters } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const { pets, loading, error } = usePets(filters)

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Pet</h1>
        <p className="text-gray-600">
          Browse through our wonderful pets looking for their forever homes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1">
          <PetFilter 
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
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search pets by name, breed, or description..."
                className="flex-1"
              />
              <div className="text-sm text-gray-600">
                Showing {filteredPets.length} pets
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pets grid */}
          <PetGrid pets={filteredPets} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default BrowsePets