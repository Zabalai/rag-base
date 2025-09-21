// API handler for storing email connector secrets
export async function storeEmailConnectorSecret({ smtp_server, smtp_user, smtp_password, user_id }: {
  smtp_server: string;
  smtp_user: string;
  smtp_password: string;
  user_id: string;
}) {
  const url = `https://secret-manager.localhost.com/api/v1/secrets/email?user_id=${user_id}`;
  const payload = { smtp_server, smtp_user, smtp_password };
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
