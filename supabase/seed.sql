-- TSM Seed: clear demo data + seed athletes/profiles + policies
create extension if not exists pgcrypto;

-- Clear previous demo/seed data
delete from contact_messages;
delete from analysis_reports;
delete from athlete_profiles;

-- Keep existing non-demo accounts, remove generated non-admin roles for reseed
delete from profiles
where coalesce(role, '') in ('member','scout','coach','club official','premium member','admin')
  and coalesce(email, '') <> ''
  and role <> 'admin';

-- Profiles policy: admin sees all profiles, users see self
alter table profiles enable row level security;
drop policy if exists "Admin sees all profiles" on profiles;
create policy "Admin sees all profiles" on profiles
for select using (
  auth.uid() in (select id from profiles where role = 'admin')
  or id = auth.uid()
  or user_id = auth.uid()
);

-- Messaging table + policies
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  scout_id uuid references profiles(id),
  athlete_id uuid references athlete_profiles(id),
  scout_name text not null,
  scout_club text,
  message text not null,
  contact_email text not null,
  status text default 'unread',
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;
drop policy if exists "Scouts send messages" on contact_messages;
create policy "Scouts send messages" on contact_messages
for insert with check (scout_id = auth.uid() or scout_id in (select id from profiles where user_id = auth.uid()));

drop policy if exists "Admin sees all messages" on contact_messages;
create policy "Admin sees all messages" on contact_messages
for select using (
  auth.uid() in (select id from profiles where role = 'admin' or user_id = auth.uid() and role = 'admin')
  or scout_id in (select id from profiles where user_id = auth.uid())
);

-- AI reports table
create table if not exists analysis_reports (
  id uuid primary key default gen_random_uuid(),
  scout_id uuid references profiles(id),
  athlete_id uuid references athlete_profiles(id),
  mode text not null,
  payload jsonb not null,
  created_at timestamptz default now()
);

alter table analysis_reports enable row level security;
drop policy if exists "Scouts manage own analysis" on analysis_reports;
create policy "Scouts manage own analysis" on analysis_reports
for all using (
  scout_id in (select id from profiles where user_id = auth.uid())
)
with check (
  scout_id in (select id from profiles where user_id = auth.uid())
);

drop policy if exists "Admins view all analysis" on analysis_reports;
create policy "Admins view all analysis" on analysis_reports
for select using (
  auth.uid() in (select id from profiles where role = 'admin' or (user_id = auth.uid() and role = 'admin'))
);

with src(full_name,email,age,sport,role,status,membership_type) as (
  values
  ('Eren Demir','eren.demir@gmail.com',20,'football','Scout','Active','Pro'),
  ('Alper Yalcin','alper.yalcin@gmail.com',20,'football','Coach','Active','Pro'),
  ('Baris Kose','baris637@gmail.com',17,'football','Scout','Inactive','Pro'),
  ('Ahmet Yildiz','yildiz97@hotmail.com',17,'football','Coach','Pending','Pro'),
  ('Mustafa Duman','mustafa.duman@gmail.com',24,'football','Member','Inactive','Free'),
  ('Yasin Gokce','gokce59@hotmail.com',15,'football','Member','Active','Free'),
  ('Kuzey Guler','kuzey.guler@gmail.com',33,'football','Member','Pending','Free'),
  ('Tolga Akar','tolga.akar@gmail.com',18,'football','Premium Member','Inactive','Premium'),
  ('Mustafa Aktas','mustafa.aktas@gmail.com',24,'football','Premium Member','Active','Premium'),
  ('Furkan Uysal','furkan.uysal@gmail.com',20,'football','Member','Inactive','Free'),
  ('Ozan Erdogan','ozan715@gmail.com',31,'football','Premium Member','Active','Premium'),
  ('Cem Kurt','kurt75@hotmail.com',58,'football','Member','Active','Free'),
  ('Cem Bulut','bulut67@hotmail.com',16,'football','Member','Active','Free'),
  ('Cagan Kara','cagan.kara@gmail.com',18,'football','Premium Member','Active','Premium'),
  ('Gokhan Cakir','gokhan.cakir@gmail.com',19,'football','Scout','Active','Pro'),
  ('Cem Erdogan','cem44@gmail.com',15,'football','Member','Active','Free'),
  ('Bora Aydin','aydin89@hotmail.com',15,'football','Premium Member','Active','Premium'),
  ('Kuzey Kurt','kuzey.kurt@gmail.com',24,'football','Member','Active','Free'),
  ('Kerem Ozdemir','kerem.ozdemir@gmail.com',13,'football','Member','Active','Free'),
  ('Kaan Yavuz','kaan.yavuz@gmail.com',23,'football','Premium Member','Inactive','Premium'),
  ('Mert Simsek','mert.simsek@gmail.com',54,'football','Member','Active','Free'),
  ('Eren Kara','eren.kara@gmail.com',21,'football','Member','Active','Free'),
  ('Can Kara','can678@gmail.com',12,'football','Scout','Active','Pro'),
  ('Onur Korkmaz','onur.korkmaz@gmail.com',29,'football','Member','Inactive','Free'),
  ('Sarp Simsek','simsek64@hotmail.com',21,'football','Scout','Active','Pro'),
  ('Berk Bulut','berk576@gmail.com',23,'football','Premium Member','Active','Premium'),
  ('Mustafa Karakaya','mustafa396@gmail.com',18,'football','Premium Member','Inactive','Premium'),
  ('Efe Aslan','efe421@gmail.com',22,'football','Member','Active','Free'),
  ('Eren Arslan','eren824@gmail.com',21,'football','Member','Active','Free'),
  ('Sarp Tekin','tekin90@hotmail.com',16,'football','Member','Active','Free'),
  ('Emre Aktas','emre.aktas@gmail.com',20,'football','Premium Member','Active','Premium'),
  ('Doruk Dogan','doruk.dogan@gmail.com',13,'football','Club Official','Active','Pro'),
  ('Enes Kaya','kaya22@hotmail.com',16,'football','Member','Active','Free'),
  ('Yigit Ozkan','ozkan38@hotmail.com',33,'football','Premium Member','Active','Premium'),
  ('Alper Akar','alper877@gmail.com',16,'football','Club Official','Active','Pro'),
  ('Batuhan Aslan','batuhan.aslan@gmail.com',18,'football','Premium Member','Active','Premium'),
  ('Atlas Ozturk','atlas298@gmail.com',21,'football','Premium Member','Active','Premium'),
  ('Yasin Kose','yasin494@gmail.com',16,'football','Scout','Active','Pro'),
  ('Mustafa Kaya','mustafa832@gmail.com',31,'football','Member','Inactive','Free'),
  ('Onur Aktas','onur.aktas@gmail.com',33,'football','Club Official','Active','Pro'),
  ('Kerem Aslan','kerem274@gmail.com',23,'football','Member','Pending','Free'),
  ('Burak Bulut','burak.bulut@gmail.com',20,'football','Admin','Active','Pro'),
  ('Emre Duman','duman43@hotmail.com',17,'football','Member','Inactive','Free'),
  ('Ege Celik','ege27@gmail.com',13,'football','Member','Active','Free'),
  ('Ibrahim Duman','ibrahim.duman@gmail.com',15,'football','Member','Pending','Free'),
  ('Furkan Simsek','simsek46@hotmail.com',19,'football','Member','Active','Free'),
  ('Kuzey Demir','kuzey486@gmail.com',18,'football','Member','Pending','Free'),
  ('Kerem Dogan','kerem26@gmail.com',12,'football','Premium Member','Active','Premium'),
  ('Huseyin Erdogan','erdogan18@hotmail.com',18,'football','Member','Active','Free'),
  ('Mert Koc','koc10@hotmail.com',25,'football','Member','Active','Free'),
  ('Baris Celik','baris10@gmail.com',28,'football','Member','Active','Free'),
  ('Volkan Arslan','arslan22@hotmail.com',13,'football','Scout','Inactive','Pro'),
  ('Cem Aktas','aktas73@hotmail.com',44,'football','Member','Active','Free'),
  ('Bora Polat','bora718@gmail.com',13,'football','Member','Active','Free'),
  ('Ege Kilic','ege.kilic@gmail.com',21,'football','Premium Member','Active','Premium'),
  ('Volkan Erdogan','volkan693@gmail.com',55,'football','Member','Active','Free'),
  ('Taha Aydin','aydin51@hotmail.com',29,'football','Member','Active','Free'),
  ('Semih Sen','sen47@hotmail.com',19,'football','Member','Pending','Free'),
  ('Eren Kilic','eren.kilic@gmail.com',15,'football','Member','Active','Free'),
  ('Efe Gunes','gunes62@hotmail.com',14,'football','Premium Member','Active','Premium'),
  ('Atlas Cetin','atlas.cetin@gmail.com',15,'football','Member','Active','Free'),
  ('Miran Guler','miran603@gmail.com',23,'football','Member','Active','Free'),
  ('Kaan Arslan','arslan23@hotmail.com',17,'football','Scout','Active','Pro'),
  ('Batuhan Celikten','batuhan.celikten@gmail.com',17,'football','Premium Member','Active','Premium'),
  ('Semih Avci','avci57@hotmail.com',26,'football','Premium Member','Active','Premium'),
  ('Kaan Kara','kaan.kara3519@gmail.com',20,'football','Coach','Active','Pro'),
  ('Yigit Yildiz','yigit466@gmail.com',14,'football','Premium Member','Suspended','Premium'),
  ('Arda Erdogan','arda.erdogan@gmail.com',18,'football','Member','Active','Free'),
  ('Miran Dogan','miran337@gmail.com',18,'football','Member','Pending','Free'),
  ('Bora Erdogan','bora.erdogan@gmail.com',19,'football','Premium Member','Active','Premium'),
  ('Kutay Demir','demir51@hotmail.com',20,'football','Member','Active','Free'),
  ('Gokhan Duman','gokhan23@gmail.com',20,'football','Member','Active','Free'),
  ('Cagan Kilic','cagan.kilic@gmail.com',16,'football','Member','Active','Free'),
  ('Yasin Duman','yasin.duman@gmail.com',19,'football','Member','Pending','Free'),
  ('Huseyin Gunes','huseyin.gunes@gmail.com',21,'football','Member','Active','Free'),
  ('Doruk Kara','doruk.kara@gmail.com',20,'football','Scout','Inactive','Pro'),
  ('Atlas Korkmaz','atlas.korkmaz@gmail.com',33,'football','Premium Member','Pending','Premium'),
  ('Kaan Korkmaz','kaan.korkmaz@gmail.com',14,'football','Member','Suspended','Free'),
  ('Kaan Gok','kaan.gok@gmail.com',16,'football','Premium Member','Active','Premium')
), ins_profiles as (
  insert into profiles (id, user_id, full_name, email, role, status, subscription_tier, created_at)
  select
    gen_random_uuid(),
    gen_random_uuid(),
    full_name,
    email,
    lower(role),
    status,
    membership_type,
    now()
  from src
  returning id, full_name, email
)
insert into athlete_profiles (id, user_id, slug, full_name, sport, position, nationality, birth_date, is_published, created_at)
select
  gen_random_uuid(),
  p.id,
  regexp_replace(lower(p.full_name), '[^a-z0-9]+', '-', 'g') || '-' || substr(md5(p.email),1,4),
  p.full_name,
  'football',
  'Forward',
  'TR',
  now() - (s.age::text || ' years')::interval,
  true,
  now()
from ins_profiles p
join src s using (full_name, email);

-- Remaining PDF athletes should be inserted with the same pattern above.