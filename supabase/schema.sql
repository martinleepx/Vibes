-- ============================================================
-- Free App - Supabase Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- -------------------------------------------------------
-- PROFILES (extends auth.users)
-- -------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update using ( auth.uid() = id );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'display_name',
      new.raw_user_meta_data->>'full_name',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -------------------------------------------------------
-- STREAKS
-- -------------------------------------------------------
create table if not exists public.streaks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  current_streak int default 0 not null,
  longest_streak int default 0 not null,
  total_sober_days int default 0 not null,
  last_confirmed_at timestamp with time zone,
  restores_used_this_month int default 0 not null,
  restore_month int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.streaks enable row level security;

create policy "Users can manage own streak"
  on streaks for all using ( auth.uid() = user_id );

-- -------------------------------------------------------
-- JOURNAL ENTRIES
-- -------------------------------------------------------
create table if not exists public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  prompt text not null,
  content text not null,
  streak_day int default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.journal_entries enable row level security;

create policy "Users can manage own journal entries"
  on journal_entries for all using ( auth.uid() = user_id );

-- -------------------------------------------------------
-- MILESTONES
-- -------------------------------------------------------
create table if not exists public.milestones (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  days int not null,
  achieved_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, days)
);

alter table public.milestones enable row level security;

create policy "Users can manage own milestones"
  on milestones for all using ( auth.uid() = user_id );

-- -------------------------------------------------------
-- ACCOUNTABILITY PARTNERS
-- -------------------------------------------------------
create table if not exists public.accountability_partners (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  partner_id uuid references public.profiles(id) on delete cascade,
  connection_code text unique not null,
  status text default 'pending' not null check (status in ('pending', 'accepted')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.accountability_partners enable row level security;

create policy "Users can view connections they are part of"
  on accountability_partners for select
  using ( auth.uid() = user_id or auth.uid() = partner_id );

create policy "Users can insert their own connection"
  on accountability_partners for insert
  with check ( auth.uid() = user_id );

create policy "Anyone can update a pending connection (to accept)"
  on accountability_partners for update
  using ( auth.uid() = partner_id or auth.uid() = user_id );

create policy "Users can view pending codes to join"
  on accountability_partners for select
  using ( status = 'pending' and partner_id is null );
