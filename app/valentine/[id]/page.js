"use client";

import { useState, useEffect } from "react";

export default function ValentinePage({ params }) {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`/api/valentine/${params.id}`);
        if (!response.ok) {
          throw new Error("Message not found");
        }
        const data = await response.json();
        setMessage(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessage();
  }, [params.id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-pink-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            A Valentine for {message.recipientName}
          </h1>
          <div className="space-y-4">
            <div className="p-4 bg-pink-50 rounded-lg">
              <p className="text-gray-800">{message.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
