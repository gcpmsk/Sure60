-- Run once in Supabase SQL editor to enable subject-wise test folders
alter table public.tests add column if not exists subject text;
