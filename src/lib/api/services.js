import { supabase } from '../supabase'

export const servicesAPI = {
  async getServices(filters = {}) {
    let query = supabase
      .from('service_providers')
      .select(`
        *,
        service_categories (*)
      `)
      .eq('is_active', true)

    if (filters.category) {
      query = query.eq('category_id', filters.category)
    }

    const { data, error } = await query.order('rating', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getServiceById(id) {
    const { data, error } = await supabase
      .from('service_providers')
      .select(`
        *,
        service_categories (*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async getServiceCategories() {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  }
}