/**
 * Mock authentication service for prototype
 * All auth functions are stubbed out for UI preview mode
 */

export async function signInWithGoogle() {
  console.log('Mock: Google sign in (disabled in prototype)');
  return { success: true };
}

export async function signInWithApple() {
  console.log('Mock: Apple sign in (disabled in prototype)');
  return { success: true };
}

export async function signOut() {
  console.log('Mock: Sign out (disabled in prototype)');
  return { success: true };
}

export async function getCurrentUser() {
  console.log('Mock: Get current user (disabled in prototype)');
  return {
    user: {
      id: 'dev-preview-user',
      email: 'preview@free.app',
    },
    error: null,
  };
}
