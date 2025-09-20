import Link from 'next/link';
import { BellIcon, SunIcon, MoonIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from "next-auth/react";

const Topbar = () => {
  const { data: session, status } = useSession();
  const loggedIn = !!session;

  return (
    <header className="w-full h-20 bg-gray-950 border-b border-gray-900 flex items-center px-8 shadow-lg">
      {/* Center: Logo + App Name */}
      <div className="flex flex-1 items-center justify-center gap-4">
        <SparklesIcon className="h-8 w-8 text-green-400" />
        <span className="font-bold text-2xl text-gray-100 tracking-tight">ZabalAI - RAG</span>
        {loggedIn && (
          <span className="ml-2 px-2 py-1 bg-gray-900 rounded text-sm text-green-300">Client Name</span>
        )}
      </div>
      {/* Right: Icons + User */}
      <div className="flex items-center gap-6 min-w-[220px] justify-end">
        <button className="relative">
          <BellIcon className="h-6 w-6 text-green-400" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400"></span>
        </button>
        <button className="bg-gray-900 rounded-full p-2 border border-gray-800 hover:bg-green-900/30">
          <SunIcon className="h-5 w-5 text-gray-400" />
        </button>
        {loggedIn ? (
          <div className="flex items-center gap-2 relative group">
            <img src={`https://ui-avatars.com/api/?name=${session.user?.name?.[0] || 'U'}&background=1a2e2b&color=fff&size=32`} alt="avatar" className="h-10 w-10 rounded-full border-2 border-green-400" />
            <span className="text-gray-200 font-semibold">{session.user?.name || session.user?.email}</span>
            <button className="px-2 py-1 bg-gray-900 rounded hover:bg-green-900/30 text-gray-200 ml-2">▼</button>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-44 bg-gray-900 border border-gray-800 rounded shadow-lg hidden group-hover:block z-10">
              <Link href="/account" className="block px-4 py-2 hover:bg-green-900/30 text-gray-200">Account Settings</Link>
              <button className="block w-full text-left px-4 py-2 hover:bg-green-900/30 text-gray-200" onClick={() => signOut()}>Logout</button>
            </div>
          </div>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow" onClick={() => signIn('keycloak')}>
            <UserIcon className="h-6 w-6" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
