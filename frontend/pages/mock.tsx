import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MockPage() {
  const { data: session, status } = useSession();
  const [ragResult, setRagResult] = useState<string>("");

  useEffect(() => {
    // Fetch mock RAG result from backend (optional)
    fetch("/api/rag/mock")
      .then((res) => res.json())
      .then((data) => setRagResult(data.result));
  }, []);

  if (status === "loading") return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">RAG Mock Page</h1>
        {session ? (
          <div className="mb-4">
            <div className="text-green-600 font-semibold">Logged in as:</div>
            <div className="bg-gray-100 p-2 rounded text-xs">{session.user?.name || session.user?.email}</div>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div className="mb-4">
            <div className="text-red-600">Not logged in</div>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => signIn("keycloak")}>Sign in with Keycloak</button>
          </div>
        )}
        <div className="mt-4">
          <div className="font-semibold">RAG Result:</div>
          <div className="bg-gray-100 p-2 rounded text-sm">{ragResult}</div>
        </div>
      </div>
    </div>
  );
}
