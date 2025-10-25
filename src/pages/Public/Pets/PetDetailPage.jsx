import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { petsAPI } from '../../../lib/api/pets'
import { useApp } from '../../../contexts/AppContext'
import { useAuth } from '../../../contexts/AuthContext'
import Card, { CardContent } from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'

const PetDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { setError, setSuccess } = useApp()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adopting, setAdopting] = useState(false)

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true)
        const petData = await petsAPI.getPetById(id)
        setPet(petData)
      } catch (error) {
        setError('Failed to load pet details')
        console.error('Error fetching pet:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPet()
    }
  }, [id, setError])

  const handleAdopt = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/pets/${id}` } })
      return
    }

    setAdopting(true)
    try {
      // Simulate adoption process
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess(`Adoption application submitted for ${pet.name}! We'll contact you soon.`)
      navigate('/pets')
    } catch (error) {
      setError('Failed to submit adoption application')
    } finally {
      setAdopting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h2>
          <p className="text-gray-600 mb-4">The pet you're looking for doesn't exist.</p>
          <Button as={Link} to="/pets">
            Back to Pets
          </Button>
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
                <Link to="/pets" className="text-gray-400 hover:text-gray-500">
                  Pets
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-900">{pet.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pet Images */}
        <div>
          <Card>
            <img
              src={pet.image_url || '/api/placeholder/600/400'}
              alt={pet.name}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  pet.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {pet.status === 'available' ? 'Available for Adoption' : 'Adopted'}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {pet.species}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {pet.gender}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pet Details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <span>{pet.breed}</span>
                <span>•</span>
                <span>{pet.age} years old</span>
                <span>•</span>
                <span className="text-2xl font-bold text-green-600">${pet.adoption_fee}</span>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {pet.description || 'No description available for this pet.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Species</h3>
                  <p className="text-lg font-medium text-gray-900 capitalize">{pet.species}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Breed</h3>
                  <p className="text-lg font-medium text-gray-900">{pet.breed || 'Mixed'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Age</h3>
                  <p className="text-lg font-medium text-gray-900">{pet.age} years</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="text-lg font-medium text-gray-900 capitalize">{pet.gender}</p>
                </div>
              </div>

              {pet.status === 'available' && (
                <Button
                  onClick={handleAdopt}
                  loading={adopting}
                  className="w-full py-3 text-lg"
                >
                  🏡 Adopt {pet.name}
                </Button>
              )}

              {pet.status !== 'available' && (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">
                    {pet.name} has found a loving home!
                  </p>
                  <Button as={Link} to="/pets" variant="outline">
                    Browse Other Pets
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adoption Process</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>1. Submit adoption application</p>
                <p>2. Virtual or in-person meet & greet</p>
                <p>3. Home check (if required)</p>
                <p>4. Finalize adoption paperwork</p>
                <p>5. Welcome your new family member!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PetDetailPage