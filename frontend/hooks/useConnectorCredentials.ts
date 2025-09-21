import { useState } from "react";
import { storeConnectorCredentials } from '../api/secrets';

export function useConnectorCredentials(connectorId: string, user_id: string) {
  const [apiKey, setApiKey] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await storeConnectorCredentials({
        connector: connectorId,
        api_key: apiKey,
        secret,
        user_id,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    apiKey,
    setApiKey,
    secret,
    setSecret,
    loading,
    error,
    success,
    handleSubmit,
  };
}
