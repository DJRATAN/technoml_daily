import { redirect } from 'next/navigation';

/**
 * Catch-all 404 handler.
 * Redirects any unknown routes back to the home page.
 */
export default function NotFound() {
  redirect('/');
}
