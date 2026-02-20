# Free - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo CLI installed globally: `npm install -g expo-cli`

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create a new project (or use existing)
   - Go to Project Settings > API
   - Copy the URL and anon/public key
   - Paste into `.env` file

3. Configure OAuth providers in Supabase:

   **For Google Sign-In:**
   - Go to Authentication > Providers > Google
   - Enable Google provider
   - Follow the instructions to create OAuth credentials in Google Cloud Console
   - Add credentials to both Supabase dashboard and `.env` file

   **For Apple Sign-In:**
   - Go to Authentication > Providers > Apple
   - Enable Apple provider
   - Follow the instructions to configure Apple Sign-In in Apple Developer Portal
   - This requires an Apple Developer account ($99/year)

### 3. Database Setup

Run this SQL in your Supabase SQL editor to create the required tables:

```sql
-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Run the App

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

For web (limited functionality):
```bash
npm run web
```

Or start the development server and scan QR code:
```bash
npm start
```

## Project Structure

```
/app                    # Expo Router pages
  /_layout.tsx         # Root layout with auth listener
  /index.tsx           # Entry point (auth redirect)
  /login.tsx           # Login screen
  /onboarding.tsx      # Onboarding flow (placeholder)
/components            # Reusable UI components
  /Button.tsx          # Primary button component
  /SocialButton.tsx    # Social sign-in buttons
/constants            # App constants
  /Colors.ts           # Color palette and design tokens
/services             # API and service layers
  /supabase.ts         # Supabase client configuration
  /auth.ts             # Authentication service
/types                # TypeScript type definitions
```

## Development Notes

### Authentication Flow

1. User opens app → `index.tsx` checks auth state
2. If not authenticated → redirect to `/login`
3. User taps Google/Apple sign-in → OAuth flow
4. On success → redirect to `/onboarding`
5. After onboarding → redirect to home screen (TBD)

### Design System

The app uses a calming color palette with blues and greens:
- Primary: `#4A90A4` (calm blue)
- Secondary: `#68B68D` (peaceful green)
- Background: `#F8FBFC` (light blue-tinted white)

All design tokens are defined in `/constants/Colors.ts`.

### Testing OAuth Locally

- **Google Sign-In**: Works in Expo Go and on physical devices
- **Apple Sign-In**: Only works on physical iOS devices or iOS Simulator (not in Expo Go)
- For testing, use Google Sign-In first

## Troubleshooting

### "Supabase credentials not configured" warning
- Make sure `.env` file exists and has the correct values
- Restart the Metro bundler after changing `.env`

### OAuth redirect not working
- Check that the redirect URI in Supabase matches: `free://auth/callback`
- Make sure the `scheme` in `app.json` matches: `"scheme": "free"`

### Apple Sign-In not available
- Apple Sign-In only works on iOS
- Requires an Apple Developer account
- For testing, use Google Sign-In on Android or web

## Next Steps

- [ ] Complete onboarding flow (3-4 screens)
- [ ] Build home screen with streak counter
- [ ] Implement "I stayed free today" confirmation
- [ ] Add crisis intervention (Break the Chain) screen
- [ ] Set up daily notifications

## Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
