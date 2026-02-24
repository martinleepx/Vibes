import { Redirect } from 'expo-router';

// Redirect base /onboarding path to the welcome step
export default function OnboardingRedirect() {
  return <Redirect href="/onboarding/welcome" />;
}
