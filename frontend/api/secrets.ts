// API handler for storing connector credentials
export async function storeConnectorCredentials({ connector, api_key, secret, user_id }: {
  connector: string;
  api_key: string;
  secret: string;
  user_id: string;
}) {
  const url = `https://secret-manager.localhost.com/api/v1/secrets/object-storage?user_id=${user_id}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ connector, api_key, secret }),
  });
  if (!res.ok) {
    throw new Error("Failed to save credentials");
  }
  return await res.json();
}
