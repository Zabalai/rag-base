
// Unified API handler for storing connector secrets
export async function storeConnectorSecret({ connector_name, secret, user_id }: {
  connector_name: string;
  secret: any;
  user_id: string;
}) {
  const url = `https://secret-manager.localhost.com/api/v1/secrets/connector?user_id=${user_id}`;
  const payload = { connector_name, secret };
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
