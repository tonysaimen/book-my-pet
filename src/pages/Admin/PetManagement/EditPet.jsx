import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { petsAPI } from '../../../lib/api/pets'
import { useApp } from '../../../contexts/AppContext'
import PetForm from '../../../components/Pets/PetForm'
import Card, { CardHeader, CardContent } from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'

const EditPet = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setError, setSuccess } = useApp()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

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

  const handleSubmit = async (formData) => {
    setUpdating(true)
    try {
      await petsAPI.updatePet(id, formData)
      setSuccess('Pet updated successfully!')
      navigate('/admin/pets')
    } catch (error) {
      setError(error.message)
    } finally {
      setUpdating(false)
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
          <p className="text-gray-600 mb-4">The pet you're trying to edit doesn't exist.</p>
          <Button onClick={() => navigate('/admin/pets')}>
            Back to Pets
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Pet</h1>
            <p className="text-gray-600 mt-2">Update information for {pet.name}</p>
          </div>
          <Button
            onClick={() => navigate('/admin/pets')}
            variant="outline"
          >
            Back to Pets
          </Button>
        </div>
      </div>

      <PetForm
        pet={pet}
        onSubmit={handleSubmit}
        loading={updating}
        mode="edit"
      />
    </div>
  )
}

export default EditPet