import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/UI/Button'
import Card, { CardContent, CardHeader, CardFooter } from '../../../components/UI/Card'

const AddPet = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    color: '',
    description: '',
    image_url: '',
    adoption_fee: '',
    status: 'available'
  })

  const [loading, setLoading] = useState(false)

  const speciesOptions = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'other']
  const genderOptions = ['male', 'female']
  const sizeOptions = ['small', 'medium', 'large']
  const statusOptions = ['available', 'adopted', 'pending']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      console.log('Adding pet:', formData)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Success - redirect to pet list
      navigate('/admin/pets')
    } catch (error) {
      console.error('Error adding pet:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-responsive py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Pet</h1>
          <p className="text-gray-600 mt-2">Add a new pet to the adoption system</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/pets')}
        >
          Back to Pet List
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Pet Information</h2>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Pet Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Enter pet name"
                />
              </div>

              <div>
                <label className="form-label">Species *</label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select Species</option>
                  {speciesOptions.map(species => (
                    <option key={species} value={species}>
                      {species.charAt(0).toUpperCase() + species.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter breed"
                />
              </div>

              <div>
                <label className="form-label">Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className="input"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="form-label">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Size</option>
                  {sizeOptions.map(size => (
                    <option key={size} value={size}>
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter color"
                />
              </div>

              <div>
                <label className="form-label">Adoption Fee ($)</label>
                <input
                  type="number"
                  name="adoption_fee"
                  value={formData.adoption_fee}
                  onChange={handleChange}
                  min="0"
                  className="input"
                  placeholder="Enter adoption fee"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="form-label">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="input"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="input"
                placeholder="Describe the pet's personality, habits, special needs, etc."
              />
            </div>

            {/* Status */}
            <div>
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/pets')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="min-w-32"
            >
              {loading ? (
                <>
                  <div className="loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Adding...
                </>
              ) : (
                'Add Pet'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Preview Section */}
      {formData.name && (
        <Card className="mt-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt={formData.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{formData.name}</h3>
                <div className="mt-2 space-y-1 text-gray-600">
                  <p><strong>Species:</strong> {formData.species || 'Not specified'}</p>
                  <p><strong>Breed:</strong> {formData.breed || 'Not specified'}</p>
                  <p><strong>Age:</strong> {formData.age ? `${formData.age} years` : 'Not specified'}</p>
                  <p><strong>Gender:</strong> {formData.gender || 'Not specified'}</p>
                  <p><strong>Size:</strong> {formData.size || 'Not specified'}</p>
                  <p><strong>Status:</strong> {formData.status}</p>
                </div>
                {formData.description && (
                  <div className="mt-4">
                    <p className="text-gray-700">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AddPet