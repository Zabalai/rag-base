import { useState } from "react";
import { storeConnectorSecret } from '../api/connectorSecret';

export interface ConnectorField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

export function useConnectorSecret(connector_name: string, fields: ConnectorField[], user_id: string) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach(f => { initial[f.name] = ""; });
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await storeConnectorSecret({
        connector_name,
        secret: values,
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
    values,
    handleChange,
    loading,
    error,
    success,
    handleSubmit,
  };
}
