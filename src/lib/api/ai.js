// Mock AI service - replace with actual AI API integration
export const aiAPI = {
  async getPetRecommendations(userPreferences) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const recommendations = {
      pets: [],
      reasoning: "Based on your lifestyle and preferences, we recommend the following pets:"
    }

    // Mock recommendation logic
    if (userPreferences.lifestyle === 'active') {
      recommendations.pets.push({
        type: 'Dog',
        species: 'dog',
        breed: 'Active breeds like Labrador, Border Collie',
        emoji: '🐕',
        reason: 'Perfect for your active lifestyle - they love exercise and outdoor activities!'
      })
    }

    if (userPreferences.home === 'apartment') {
      recommendations.pets.push({
        type: 'Cat',
        species: 'cat',
        breed: 'Indoor cats like Persian, Ragdoll',
        emoji: '🐈',
        reason: 'Great for apartment living - they are independent and don\'t need much space'
      })
    }

    if (userPreferences.experience === 'first_time') {
      recommendations.pets.push({
        type: 'Rabbit',
        species: 'rabbit',
        breed: 'Friendly breeds like Holland Lop',
        emoji: '🐇',
        reason: 'Ideal for first-time owners - gentle and relatively low maintenance'
      })
    }

    // Fallback recommendations
    if (recommendations.pets.length === 0) {
      recommendations.pets = [
        {
          type: 'Mixed Breed Dog',
          species: 'dog',
          breed: 'Mixed Breed',
          emoji: '🐶',
          reason: 'Mixed breeds are often healthy, adaptable, and make wonderful companions!'
        }
      ]
    }

    return recommendations
  },

  async chatWithBot(message) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const lowerMessage = message.toLowerCase()

    // Simple response logic - replace with actual AI service
    if (lowerMessage.includes('adopt') || lowerMessage.includes('adoption')) {
      return {
        message: "To adopt a pet, simply browse our available pets, click on one you like, and fill out the adoption application. Our team will review your application and contact you within 24-48 hours. All pets are vaccinated, spayed/neutered, and ready for their forever homes! 🏡"
      }
    }

    if (lowerMessage.includes('service') || lowerMessage.includes('groom') || lowerMessage.includes('vet')) {
      return {
        message: "We offer various pet services including grooming, veterinary care, training, and boarding. You can book services through our website by selecting the service type, choosing a provider, and picking an available time slot. All our service providers are verified professionals! ✂️🏥"
      }
    }

    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee')) {
      return {
        message: "Adoption fees typically range from $50-$300 depending on the pet's age, breed, and medical needs. This includes vaccinations, spay/neuter surgery, and microchipping. Service prices vary - you can see specific pricing when booking services. We also offer payment plans for adoption fees! 💰"
      }
    }

    if (lowerMessage.includes('apartment') || lowerMessage.includes('small') || lowerMessage.includes('space')) {
      return {
        message: "For apartment living, consider cats, small dog breeds, rabbits, or birds. These pets typically adapt well to smaller spaces. Look for pets labeled 'good for apartments' in their profiles. Remember, all pets need exercise and mental stimulation regardless of space! 🏢"
      }
    }

    // Default response
    return {
      message: "I'm here to help with pet adoption and care services! You can ask me about:\n• How to adopt a pet\n• Available services and booking\n• Costs and fees\n• Pet recommendations\n• Or anything else pet-related! 🐾"
    }
  }
}