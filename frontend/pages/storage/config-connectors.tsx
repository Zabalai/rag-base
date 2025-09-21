import React, { useState } from "react";
import { useConnectorsSecret } from '../../hooks/useObjectStorageConnector';
import { useEmailConnector } from '../../hooks/useEmailConnector';
import Layout from '../../components/Layout';
import { ArchiveBoxIcon, EnvelopeIcon } from '@heroicons/react/24/outline';


function ConnectorCredentialsForm({ connectorId, user_id }: { connectorId: string, user_id: string }) {
  if (connectorId === "email") {
    const {
      smtpServer, setSmtpServer,
      smtpUser, setSmtpUser,
      smtpPassword, setSmtpPassword,
      loading, error, success, handleSubmit
    } = useEmailConnector(user_id);
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Email Credentials</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">SMTP Server</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={smtpServer} onChange={e => setSmtpServer(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SMTP User</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={smtpUser} onChange={e => setSmtpUser(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SMTP Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={smtpPassword} onChange={e => setSmtpPassword(e.target.value)} required />
          </div>
          <button type="submit" className={`w-full py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
          {success && <div className="text-green-600 mt-2 text-sm">Credentials saved!</div>}
        </form>
      </div>
    );
  } else {
    const {
      endpoint, setEndpoint,
      accessKey, setAccessKey,
      secretKey, setSecretKey,
      bucket, setBucket,
      loading, error, success, handleSubmit
    } = useConnectorsSecret(user_id);
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{connectorId.charAt(0).toUpperCase() + connectorId.slice(1)} Credentials</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Endpoint</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={endpoint} onChange={e => setEndpoint(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Access Key</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={accessKey} onChange={e => setAccessKey(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Secret Key</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={secretKey} onChange={e => setSecretKey(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bucket (optional)</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={bucket} onChange={e => setBucket(e.target.value)} />
          </div>
          <button type="submit" className={`w-full py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
          {success && <div className="text-green-600 mt-2 text-sm">Credentials saved!</div>}
        </form>
      </div>
    );
  }
}

export default function StorageConfigConnectors() {
  const connectors = [
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Connect to your Google Drive account",
      icon: <ArchiveBoxIcon className="h-10 w-10 mx-auto text-blue-500" />,
    },
    {
      id: "email",
      name: "Email",
      description: "Connect to your email provider",
      icon: <EnvelopeIcon className="h-10 w-10 mx-auto text-green-500" />,
    },
    {
      id: "azure-blob",
      name: "Azure Blob Storage",
      description: "Connect to Azure Blob Storage",
      icon: <ArchiveBoxIcon className="h-10 w-10 mx-auto text-indigo-500" />,
    },
    {
      id: "aws-s3",
      name: "AWS S3",
      description: "Connect to Amazon S3 bucket",
      icon: <ArchiveBoxIcon className="h-10 w-10 mx-auto text-yellow-500" />,
    },
  ];

  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  // Progress bar width: step 1 = 0%, step 2 = 50%, step 3 = 100%
  const progress = step === 1 ? '0%' : step === 2 ? '50%' : '100%';

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {step === 1 ? 'Select a Connector' : 'Enter Credentials'}
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300" style={{ width: progress }}></div>
        </div>
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {connectors.map(conn => (
                <button
                  key={conn.id}
                  type="button"
                  onClick={() => setSelected(conn.id)}
                  className={`border rounded-lg p-6 flex flex-col items-center transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${selected === conn.id ? 'border-green-600 ring-2 ring-green-400' : 'border-gray-300'}`}
                >
                  {conn.icon}
                  <span className="mt-2 font-semibold text-lg">{conn.name}</span>
                  <span className="mt-1 text-gray-500 text-sm text-center">{conn.description}</span>
                </button>
              ))}
            </div>
            <button
              className={`w-full py-3 rounded-lg font-bold text-white transition ${selected ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!selected}
              onClick={() => selected && setStep(2)}
            >
              Next
            </button>
          </>
        )}
        {step === 2 && selected && (
          <ConnectorCredentialsForm connectorId={selected} user_id={"a6b89347-093f-44d3-a6af-9ce6b59d3b52"} />
        )}

      </div>
    </Layout>
  );
}
