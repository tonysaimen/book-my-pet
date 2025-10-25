import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_SUCCESS':
      return { ...state, success: action.payload }
    case 'SET_FILTERS':
      return { ...state, filters: action.payload }
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, error: null, success: null }
    default:
      return state
  }
}

const initialState = {
  loading: false,
  error: null,
  success: null,
  filters: {
    species: '',
    breed: '',
    age: '',
    gender: ''
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const setLoading = (loading) => dispatch({ type: 'SET_LOADING', payload: loading })
  const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error })
  const setSuccess = (success) => dispatch({ type: 'SET_SUCCESS', payload: success })
  const setFilters = (filters) => dispatch({ type: 'SET_FILTERS', payload: filters })
  const clearNotifications = () => dispatch({ type: 'CLEAR_NOTIFICATIONS' })

  const value = {
    ...state,
    setLoading,
    setError,
    setSuccess,
    setFilters,
    clearNotifications
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}