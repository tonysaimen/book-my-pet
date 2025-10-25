-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  user_type TEXT DEFAULT 'user' CHECK (user_type IN ('user', 'admin', 'shelter')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create pets table
CREATE TABLE pets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL CHECK (species IN ('dog', 'cat', 'rabbit', 'bird', 'other')),
  breed TEXT,
  age INTEGER NOT NULL CHECK (age >= 0),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  description TEXT,
  image_url TEXT,
  adoption_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'pending', 'adopted')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create service_categories table
CREATE TABLE service_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create service_providers table
CREATE TABLE service_providers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES service_categories(id),
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  service_provider_id UUID REFERENCES service_providers(id) NOT NULL,
  pet_id UUID REFERENCES pets(id),
  service_type TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create favorites table
CREATE TABLE favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  pet_id UUID REFERENCES pets(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, pet_id)
);

-- Insert sample service categories
INSERT INTO service_categories (name, description, icon) VALUES
('Grooming', 'Professional pet grooming services', '✂️'),
('Veterinary', 'Medical care for your pets', '🏥'),
('Training', 'Behavioral training sessions', '🎓'),
('Boarding', 'Safe boarding facilities', '🏠');

-- Insert sample service providers
INSERT INTO service_providers (name, category_id, description, address, phone, email, rating) VALUES
('Paws & Claws Grooming', (SELECT id FROM service_categories WHERE name = 'Grooming'), 'Professional grooming for all breeds', '123 Pet Street', '+1-555-0101', 'grooming@pawsclaws.com', 4.8),
('Animal Care Hospital', (SELECT id FROM service_categories WHERE name = 'Veterinary'), '24/7 emergency veterinary care', '456 Vet Lane', '+1-555-0102', 'info@animalcare.com', 4.9),
('Pet Training Academy', (SELECT id FROM service_categories WHERE name = 'Training'), 'Certified behavior training', '789 Training Ave', '+1-555-0103', 'train@petacademy.com', 4.7),
('Happy Paws Boarding', (SELECT id FROM service_categories WHERE name = 'Boarding'), 'Luxury boarding facilities', '321 Boarding Rd', '+1-555-0104', 'stay@happypaws.com', 4.6);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Pets: Public can read available pets, admins can do everything
CREATE POLICY "Anyone can view available pets" ON pets FOR SELECT USING (status = 'available');
CREATE POLICY "Admins can manage all pets" ON pets FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin'));

-- Service categories and providers: Public read access
CREATE POLICY "Anyone can view service categories" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view service providers" ON service_providers FOR SELECT USING (true);

-- Bookings: Users can manage their own bookings
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- Favorites: Users can manage their own favorites
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL USING (auth.uid() = user_id);