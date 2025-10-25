export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]{10,}$/
  return re.test(phone)
}

export const validateRequired = (value) => {
  return value && value.trim().length > 0
}

export const validateNumber = (value, min = 0, max = null) => {
  const num = Number(value)
  if (isNaN(num)) return false
  if (num < min) return false
  if (max !== null && num > max) return false
  return true
}

export const validateAdoptionForm = (formData) => {
  const errors = {}

  if (!validateRequired(formData.fullName)) {
    errors.fullName = 'Full name is required'
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required'
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Valid phone number is required'
  }

  if (!validateRequired(formData.address)) {
    errors.address = 'Address is required'
  }

  if (!validateRequired(formData.experience)) {
    errors.experience = 'Please describe your pet experience'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}