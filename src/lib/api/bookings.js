import { supabase } from '../supabase'

export const bookingsAPI = {
  async getBookings(userId = null) {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        service_providers (
          name,
          service_categories (
            name,
            icon
          )
        ),
        pets (
          name,
          species
        )
      `)

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query.order('booking_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async createBooking(bookingData) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select(`
        *,
        service_providers (
          name,
          service_categories (
            name,
            icon
          )
        )
      `)
      .single()

    if (error) throw error
    return data
  },

  async updateBooking(id, updates) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async cancelBooking(id) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getBookingById(id) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service_providers (
          *,
          service_categories (
            *
          )
        ),
        pets (*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }
}