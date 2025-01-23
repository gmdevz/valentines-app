"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const ValentineCard = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/valentine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setShareLink(data.shareLink);
      setSubmitted(true);
      setQrCode(data.shareLink); // Set the QR code URL
    } catch (error) {
      console.error("Failed to submit valentine:", error);
      alert("Failed to create valentine. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Create Your Valentine's Message
          </h1>
          <p className="text-gray-600">Write a special message for someone</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Who's the lucky crush?
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                placeholder="Who's the lucky crush?"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Write your valentine's message here..."
                className="w-full p-2 border rounded-md min-h-[100px]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Generate Valentine's Card
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-pink-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">
                Your unique link:
              </h3>
              <p className="text-sm text-gray-600 break-all">{shareLink}</p>
            </div>

            <div className="flex justify-center">
              <QRCodeCanvas value={qrCode} size={128} />
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                onClick={() => navigator.clipboard.writeText(shareLink)}
              >
                Copy Link
              </button>
              <button
                className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors"
                onClick={() => setSubmitted(false)}
              >
                Create New
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 mt-6">
          Made with ❤️ for your special someone
        </div>
      </div>
    </div>
  );
};

export default ValentineCard;
