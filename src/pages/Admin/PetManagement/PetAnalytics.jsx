import React from 'react'
import { usePets } from '../../hooks/usePets'
import Card, { CardContent } from '../../components/UI/Card'

const PetAnalytics = () => {
  const { pets } = usePets()

  const stats = {
    totalPets: pets.length,
    availablePets: pets.filter(pet => pet.status === 'available').length,
    adoptedPets: pets.filter(pet => pet.status === 'adopted').length,
    pendingPets: pets.filter(pet => pet.status === 'pending').length,
  }

  const speciesBreakdown = pets.reduce((acc, pet) => {
    acc[pet.species] = (acc[pet.species] || 0) + 1
    return acc
  }, {})

  const ageGroups = {
    '0-1': pets.filter(pet => pet.age <= 1).length,
    '2-5': pets.filter(pet => pet.age > 1 && pet.age <= 5).length,
    '6+': pets.filter(pet => pet.age > 5).length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pet Analytics</h1>
        <p className="text-gray-600 mt-2">Overview of pets in the system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-blue-600">🐾</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-green-600">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">{stats.availablePets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-purple-600">🏡</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Adopted</p>
                <p className="text-2xl font-bold text-gray-900">{stats.adoptedPets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-yellow-600">⏳</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingPets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Species Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Species Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(speciesBreakdown).map(([species, count]) => (
                <div key={species} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {species}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(count / stats.totalPets) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Age Groups */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Distribution</h3>
            <div className="space-y-4">
              {Object.entries(ageGroups).map(([ageGroup, count]) => (
                <div key={ageGroup} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {ageGroup} years
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(count / stats.totalPets) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Pet Additions</h3>
          <div className="space-y-3">
            {pets.slice(0, 5).map((pet) => (
              <div key={pet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={pet.image_url || '/api/placeholder/40/40'}
                    alt={pet.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{pet.name}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {pet.species} • {pet.breed}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  pet.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : pet.status === 'adopted'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {pet.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PetAnalytics