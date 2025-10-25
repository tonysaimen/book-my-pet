import React from 'react'
import Card, { CardContent } from '../UI/Card'
import Button from '../UI/Button'

const PetForm = ({ pet, onSubmit, loading, mode = 'create' }) => {
  const [formData, setFormData] = React.useState({
    name: pet?.name || '',
    species: pet?.species || '',
    breed: pet?.breed || '',
    age: pet?.age || '',
    gender: pet?.gender || '',
    description: pet?.description || '',
    adoption_fee: pet?.adoption_fee || '',
    image_url: pet?.image_url || '',
    size: pet?.size || 'medium',
    energy_level: pet?.energy_level || 'medium',
    good_with_kids: pet?.good_with_kids || true,
    good_with_pets: pet?.good_with_pets || true,
    vaccinated: pet?.vaccinated || true
  })

  const speciesOptions = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'bird', label: 'Bird' },
    { value: 'other', label: 'Other' }
  ]

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]

  const energyOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            </div>

            <div>
              <label htmlFor="name" className="form-label">
                Pet Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter pet name"
              />
            </div>

            <div>
              <label htmlFor="species" className="form-label">
                Species *
              </label>
              <select
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select species</option>
                {speciesOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="breed" className="form-label">
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="input"
                placeholder="Enter breed"
              />
            </div>

            <div>
              <label htmlFor="age" className="form-label">
                Age (years) *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                max="30"
                className="input"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label htmlFor="gender" className="form-label">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select gender</option>
                {genderOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="input"
              >
                {sizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="adoption_fee" className="form-label">
                Adoption Fee ($) *
              </label>
              <input
                type="number"
                id="adoption_fee"
                name="adoption_fee"
                value={formData.adoption_fee}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="energy_level" className="form-label">
                Energy Level
              </label>
              <select
                id="energy_level"
                name="energy_level"
                value={formData.energy_level}
                onChange={handleChange}
                className="input"
              >
                {energyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center">
                <input
                  id="good_with_kids"
                  name="good_with_kids"
                  type="checkbox"
                  checked={formData.good_with_kids}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="good_with_kids" className="ml-2 block text-sm text-gray-900">
                  Good with children
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="good_with_pets"
                  name="good_with_pets"
                  type="checkbox"
                  checked={formData.good_with_pets}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="good_with_pets" className="ml-2 block text-sm text-gray-900">
                  Good with other pets
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="vaccinated"
                  name="vaccinated"
                  type="checkbox"
                  checked={formData.vaccinated}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="vaccinated" className="ml-2 block text-sm text-gray-900">
                  Vaccinated
                </label>
              </div>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="image_url" className="form-label">
                Image URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="input"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="input"
                placeholder="Describe the pet's personality, history, special needs, and any other important information..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {mode === 'create' ? 'Add Pet' : 'Update Pet'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PetForm