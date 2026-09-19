-- ============================================================
-- RAJMAN GRAPHICS DESIGN AND PRINT — SEED DATA
-- ============================================================

-- 1. Insert Initial Categories
insert into public.categories (name, slug, description, sort_order)
values
  ('Photo Frames', 'photo-frames', 'Beautiful custom frames that turn your favourite photos into wall art.', 1),
  ('Custom Mugs', 'custom-mugs', 'Start every morning with a memory — personalised mugs made just for you.', 2),
  ('Throw Pillows', 'throw-pillows', 'Soft, premium pillows printed with your most meaningful photos.', 3),
  ('Personalized Gifts', 'personalized-gifts', 'Thoughtful, one-of-a-kind gifts designed around the person you love.', 4),
  ('Event Prints', 'event-prints', 'Banners, backdrops, and branded print materials for every occasion.', 5)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order;

-- 2. Insert Initial Site Settings
insert into public.site_settings (key, value)
values
  ('general', '{
    "site_name": "Rajman Graphics Design and Print",
    "tagline": "Turning Moments Into Memories",
    "phone": "+234 916 012 9087",
    "whatsapp": "+2349160129087",
    "email": "ibrahimrajman@gmail.com",
    "address_line": "Aratumi Junction, Iba, Ojo, Lagos, Nigeria",
    "opening_hours": "Daily, 9:00 AM – 8:00 PM",
    "footer_summary": "Rajman Graphics Design and Print creates custom keepsakes and print products that help turn meaningful moments into lasting memories."
  }'::jsonb),
  ('homepage', '{
    "hero_headline": "Turning Moments Into Memories",
    "hero_subtext": "Beautifully designed and personalized keepsakes made to celebrate the moments that matter most.",
    "hero_primary_cta": "Explore Our Designs",
    "hero_secondary_cta": "Order on WhatsApp",
    "about_summary": "Rajman Graphics Design and Print is a Lagos-based creative print business focused on helping people preserve memories and celebrate life''s most special moments."
  }'::jsonb),
  ('social', '{
    "whatsapp": "+2349160129087",
    "instagram": "",
    "facebook": "",
    "tiktok": "",
    "x": ""
  }'::jsonb)
on conflict (key) do update set
  value = excluded.value,
  updated_at = now();
