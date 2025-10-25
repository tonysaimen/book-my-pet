import React from 'react'
import Card, { CardContent } from '../UI/Card'

const PetFilter = ({ filters, onFilterChange, className = '' }) => {
  const speciesOptions = [
    { value: '', label: 'All Species' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'rabbit', label: 'Rabbits' },
    { value: 'bird', label: 'Birds' },
    { value: 'other', label: 'Other' }
  ]

  const genderOptions = [
    { value: '', label: 'Any Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]

  const ageOptions = [
    { value: '', label: 'Any Age' },
    { value: '0-1', label: 'Puppy/Kitten (0-1)' },
    { value: '1-3', label: 'Young (1-3)' },
    { value: '3-7', label: 'Adult (3-7)' },
    { value: '7+', label: 'Senior (7+)' }
  ]

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFilterChange({
      species: '',
      gender: '',
      age: '',
      breed: ''
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Species Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Species
            </label>
            <select
              value={filters.species}
              onChange={(e) => handleFilterChange('species', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {speciesOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <select
              value={filters.age}
              onChange={(e) => handleFilterChange('age', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {ageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Breed Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breed
            </label>
            <input
              type="text"
              value={filters.breed}
              onChange={(e) => handleFilterChange('breed', e.target.value)}
              placeholder="Search by breed..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PetFilter