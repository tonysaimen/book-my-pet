export const mockServices = [
  {
    id: '1',
    name: 'Paws & Claws Grooming',
    category_id: '1',
    description: 'Professional grooming services for all breeds. We offer bathing, haircuts, nail trimming, and more.',
    address: '123 Pet Street, Animal City',
    phone: '+1-555-0101',
    email: 'grooming@pawsclaws.com',
    rating: 4.8,
    image_url: '/api/placeholder/400/300',
    is_active: true,
    service_categories: {
      id: '1',
      name: 'Grooming',
      description: 'Professional pet grooming services',
      icon: '✂️'
    }
  },
  {
    id: '2',
    name: 'Animal Care Hospital',
    category_id: '2',
    description: '24/7 emergency veterinary care with experienced veterinarians and modern facilities.',
    address: '456 Vet Lane, Animal City',
    phone: '+1-555-0102',
    email: 'info@animalcare.com',
    rating: 4.9,
    image_url: '/api/placeholder/400/300',
    is_active: true,
    service_categories: {
      id: '2',
      name: 'Veterinary',
      description: 'Medical care for your pets',
      icon: '🏥'
    }
  },
  {
    id: '3',
    name: 'Pet Training Academy',
    category_id: '3',
    description: 'Certified behavior training for dogs of all ages. Positive reinforcement methods.',
    address: '789 Training Ave, Animal City',
    phone: '+1-555-0103',
    email: 'train@petacademy.com',
    rating: 4.7,
    image_url: '/api/placeholder/400/300',
    is_active: true,
    service_categories: {
      id: '3',
      name: 'Training',
      description: 'Behavioral training sessions',
      icon: '🎓'
    }
  }
]