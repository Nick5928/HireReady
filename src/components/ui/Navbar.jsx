import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">HireReady</Link>
      </div>
      <div className="space-x-4">
        <Link href="/profile" className="hover:text-blue-500">Features</Link>
        <Link href="/optimize-resume" className="hover:text-blue-500">Login</Link>
      </div>
    </nav>
  );
}