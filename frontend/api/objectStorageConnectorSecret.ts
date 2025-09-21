// API handler for storing object storage connector secrets
export async function storeConnectorsSecret({ endpoint, access_key, secret_key, bucket, user_id }: {
  endpoint: string;
  access_key: string;
  secret_key: string;
  bucket?: string;
  user_id: string;
}) {
  const url = `https://secret-manager.localhost.com/api/v1/secrets/object-storage?user_id=${user_id}`;
  const payload = { endpoint, access_key, secret_key, bucket };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to save credentials");
  }
  return await res.json();
}
