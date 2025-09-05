# HabitRace Expo App Skeleton

This directory contains a minimal Expo React Native project scaffold for the HabitRace MVP.

## Files and Structure

```
habitRaceApp/
├── App.tsx                 # entry point for the Expo app
├── app.json                # Expo configuration with Supabase credentials
└── src/
    ├── lib/
    │   └── supabase.ts     # Supabase client configuration
    └── screens/
        ├── AuthScreen.tsx  # email authentication via magic link
        ├── HomeScreen.tsx  # list habits and log completion
        └── CreateHabitScreen.tsx # create new habits
```

## Setup

1. Install Node.js and Expo CLI:

   ```sh
   brew install node
   npm install -g expo-cli
   ```

2. Clone or download this repository and navigate into it:

   ```sh
   cd habitRaceApp
   ```

3. Populate your Supabase connection details in `app.json`.

4. Install dependencies and start the Expo development server:

   ```sh
   npm install
   expo start
   ```

## Notes

- The authentication flow uses email magic link via Supabase. Make sure your Supabase project's email provider is configured.
- Define the database schema and RLS policies in Supabase as described earlier.
