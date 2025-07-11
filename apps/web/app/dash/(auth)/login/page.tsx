import { UserAuthForm } from '@/components/shared/user-auth-form';
import { env } from '@/env.mjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@feedbase/ui/components/card';
import { createServerClient } from '@supabase/ssr';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign in to Feedbase',
  description: 'Sign in to your Feedbase account.',
};

export default async function SignIn() {
  // Create a Supabase client configured to use cookies
  const cookieStore = cookies();
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  // Retrieve possible session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If there is a session, redirect to workspaces
  if (user) {
    redirect('/');
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full p-5 sm:max-w-md sm:p-6'>
        <CardHeader className='flex flex-col items-center space-y-2'>
          <CardTitle>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Sign in with your email address to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className='px-2'>
          <UserAuthForm authType='sign-in' />
        </CardContent>
        <CardFooter className='flex flex-col items-center'>
          <CardDescription className='text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='font-medium hover:underline'>
              Sign Up
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
