import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        {session ? (
          <div className="mb-4">
            <div className="text-green-600 font-semibold">Logged in as:</div>
            <div className="bg-gray-100 p-2 rounded text-xs">{session.user?.name || session.user?.email}</div>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div className="mb-4">
            <div className="text-red-600">Not logged in</div>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => signIn("keycloak")}>Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
}
