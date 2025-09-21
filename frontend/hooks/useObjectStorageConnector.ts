import { useState } from "react";
import { storeConnectorsSecret } from '../api/objectStorageConnectorSecret';

export function useConnectorsSecret(user_id: string) {
  const [endpoint, setEndpoint] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [bucket, setBucket] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await storeConnectorsSecret({
        endpoint,
        access_key: accessKey,
        secret_key: secretKey,
        bucket: bucket || undefined,
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
    endpoint,
    setEndpoint,
    accessKey,
    setAccessKey,
    secretKey,
    setSecretKey,
    bucket,
    setBucket,
    loading,
    error,
    success,
    handleSubmit,
  };
}
