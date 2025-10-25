import { supabase } from '../supabase'

export const petsAPI = {
  async getPets(filters = {}) {
    let query = supabase
      .from('pets')
      .select('*')
      .eq('status', 'available')

    if (filters.species) {
      query = query.eq('species', filters.species)
    }
    if (filters.breed) {
      query = query.ilike('breed', `%${filters.breed}%`)
    }
    if (filters.gender) {
      query = query.eq('gender', filters.gender)
    }
    if (filters.age) {
      // Handle age ranges
      const [min, max] = filters.age.split('-').map(Number)
      if (max) {
        query = query.gte('age', min).lte('age', max)
      } else {
        query = query.gte('age', min)
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getPetById(id) {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async addPet(petData) {
    const { data, error } = await supabase
      .from('pets')
      .insert([petData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updatePet(id, updates) {
    const { data, error } = await supabase
      .from('pets')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deletePet(id) {
    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}