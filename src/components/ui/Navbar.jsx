'use client';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation'

export default function Navbar({ user }) {

  const supabase = createClient();
  const router = useRouter();
  
  console.log(user);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
    } else {
      console.error('Logout error:', error.message)
    }
  }


   return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">HireReady</Link>
      </div>
      <div className="space-x-4">
        <Link href="/profile" className="hover:text-blue-500">Profile</Link>
        <Link href="/better-resume" className="hover:text-blue-500">Better Resume</Link>
        {user && (
          <button
          onClick={handleSignOut}
          className="hover:text-blue-500 cursor-pointer"
        >
          Logout
        </button>
        )}
      </div>
    </nav>
  );
}