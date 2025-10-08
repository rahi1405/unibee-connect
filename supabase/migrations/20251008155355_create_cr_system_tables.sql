/*
  # Create Class Representative (CR) System

  1. New Tables
    - `departments`
      - `id` (text, primary key) - Department code (e.g., '04' for CSE)
      - `name` (text) - Full department name (e.g., 'Computer Science and Engineering')
      - `created_at` (timestamptz)
    
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique) - CUET email
      - `role` (text) - 'student', 'teacher', 'cr', 'admin'
      - `department_id` (text) - Foreign key to departments
      - `batch` (text) - For students (e.g., '22')
      - `is_verified` (boolean) - For CR verification
      - `created_at` (timestamptz)
    
    - `notices`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `department_id` (text)
      - `level` (integer)
      - `term` (integer)
      - `uploaded_by` (uuid) - Foreign key to users
      - `created_at` (timestamptz)
    
    - `resources`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text) - 'pdf', 'video', 'link', etc.
      - `url` (text)
      - `folder` (text) - 'resources', 'materials', 'sources', 'notes'
      - `department_id` (text)
      - `level` (integer)
      - `term` (integer)
      - `uploaded_by` (uuid) - Foreign key to users
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for appropriate access control
*/

-- Create departments table with common departments
CREATE TABLE IF NOT EXISTS departments (
  id text PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Insert common departments
INSERT INTO departments (id, name) VALUES
  ('04', 'Computer Science and Engineering'),
  ('02', 'Electrical and Electronic Engineering'),
  ('01', 'Mechanical Engineering'),
  ('03', 'Civil Engineering'),
  ('05', 'Electronics and Telecommunication Engineering'),
  ('06', 'Industrial and Production Engineering'),
  ('07', 'Chemical Engineering'),
  ('08', 'Architecture'),
  ('09', 'Urban and Regional Planning'),
  ('10', 'Building Engineering and Construction Management'),
  ('11', 'Materials and Metallurgical Engineering'),
  ('12', 'Petroleum and Mining Engineering')
ON CONFLICT (id) DO NOTHING;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'student',
  department_id text REFERENCES departments(id),
  batch text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create notices table
CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  department_id text REFERENCES departments(id),
  level integer NOT NULL,
  term integer NOT NULL,
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  folder text NOT NULL,
  department_id text REFERENCES departments(id),
  level integer NOT NULL,
  term integer NOT NULL,
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Departments policies (readable by all authenticated users)
CREATE POLICY "Departments are viewable by authenticated users"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Notices policies
CREATE POLICY "Notices are viewable by students in same department"
  ON notices FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = notices.department_id
    )
  );

CREATE POLICY "Verified CRs can insert notices"
  ON notices FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'cr'
      AND users.is_verified = true
      AND users.department_id = notices.department_id
    )
  );

CREATE POLICY "CRs can update own notices"
  ON notices FOR UPDATE
  TO authenticated
  USING (uploaded_by = auth.uid())
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "CRs can delete own notices"
  ON notices FOR DELETE
  TO authenticated
  USING (uploaded_by = auth.uid());

-- Resources policies
CREATE POLICY "Resources are viewable by students in same department"
  ON resources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.department_id = resources.department_id
    )
  );

CREATE POLICY "Verified CRs can insert resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'cr'
      AND users.is_verified = true
      AND users.department_id = resources.department_id
    )
  );

CREATE POLICY "CRs can update own resources"
  ON resources FOR UPDATE
  TO authenticated
  USING (uploaded_by = auth.uid())
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "CRs can delete own resources"
  ON resources FOR DELETE
  TO authenticated
  USING (uploaded_by = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department_id);
CREATE INDEX IF NOT EXISTS idx_notices_department_level_term ON notices(department_id, level, term);
CREATE INDEX IF NOT EXISTS idx_resources_department_level_term_folder ON resources(department_id, level, term, folder);