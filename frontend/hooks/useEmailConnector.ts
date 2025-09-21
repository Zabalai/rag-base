import { useState } from "react";
import { storeEmailConnectorSecret } from '../api/emailConnectorSecret';

export function useEmailConnector(user_id: string) {
  const [smtpServer, setSmtpServer] = useState("");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await storeEmailConnectorSecret({
        smtp_server: smtpServer,
        smtp_user: smtpUser,
        smtp_password: smtpPassword,
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
    smtpServer,
    setSmtpServer,
    smtpUser,
    setSmtpUser,
    smtpPassword,
    setSmtpPassword,
    loading,
    error,
    success,
    handleSubmit,
  };
}
