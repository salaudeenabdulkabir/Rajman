-- ============================================================
-- RAJMAN GRAPHICS DESIGN AND PRINT — SUPABASE DATABASE SCHEMA
-- ============================================================

-- 1. Extensions
create extension if not exists "uuid-ossp";

-- 2. Categories Table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 3. Products Table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  category_id uuid references public.categories(id) on delete set null,
  price numeric,
  price_label text not null default 'Contact for price',
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  is_available boolean not null default true,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Product Images Table
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 5. Gallery Items Table
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  caption text,
  image_url text not null,
  category text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 6. Testimonials Table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  text text not null,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  photo_url text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 7. Contact Messages Table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- 8. Site Settings Table
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_featured on public.products(is_featured) where is_featured = true;
create index if not exists idx_product_images_product on public.product_images(product_id);
create index if not exists idx_gallery_featured on public.gallery_items(is_featured) where is_featured = true;
create index if not exists idx_testimonials_published on public.testimonials(is_published) where is_published = true;
create index if not exists idx_contact_messages_read on public.contact_messages(is_read);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- CATEGORIES POLICIES
create policy "Allow public read access on categories"
  on public.categories for select
  to public
  using (true);

create policy "Allow authenticated CRUD on categories"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

-- PRODUCTS POLICIES
create policy "Allow public read on active products"
  on public.products for select
  to public
  using (is_archived = false and is_available = true);

create policy "Allow authenticated full access on products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- PRODUCT IMAGES POLICIES
create policy "Allow public read on product images"
  on public.product_images for select
  to public
  using (true);

create policy "Allow authenticated full access on product images"
  on public.product_images for all
  to authenticated
  using (true)
  with check (true);

-- GALLERY POLICIES
create policy "Allow public read on published gallery items"
  on public.gallery_items for select
  to public
  using (is_published = true);

create policy "Allow authenticated full access on gallery items"
  on public.gallery_items for all
  to authenticated
  using (true)
  with check (true);

-- TESTIMONIALS POLICIES
create policy "Allow public read on published testimonials"
  on public.testimonials for select
  to public
  using (is_published = true);

create policy "Allow authenticated full access on testimonials"
  on public.testimonials for all
  to authenticated
  using (true)
  with check (true);

-- CONTACT MESSAGES POLICIES
-- Allow any visitor to send a contact message
create policy "Allow public insert on contact messages"
  on public.contact_messages for insert
  to public
  with check (true);

-- Only authenticated admins can read and update messages
create policy "Allow authenticated read and manage on contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);

create policy "Allow authenticated update on contact messages"
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated delete on contact messages"
  on public.contact_messages for delete
  to authenticated
  using (true);

-- SITE SETTINGS POLICIES
create policy "Allow public read on site settings"
  on public.site_settings for select
  to public
  using (true);

create policy "Allow authenticated manage on site settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- STORAGE BUCKETS SETUP
-- ============================================================
insert into storage.buckets (id, name, public)
values 
  ('products', 'products', true),
  ('gallery', 'gallery', true),
  ('brand', 'brand', true)
on conflict (id) do nothing;

-- Storage RLS
create policy "Allow public read on storage objects"
  on storage.objects for select
  to public
  using (bucket_id in ('products', 'gallery', 'brand'));

create policy "Allow authenticated uploads to storage"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('products', 'gallery', 'brand'));

create policy "Allow authenticated updates on storage"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('products', 'gallery', 'brand'))
  with check (bucket_id in ('products', 'gallery', 'brand'));

create policy "Allow authenticated deletes on storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('products', 'gallery', 'brand'));
