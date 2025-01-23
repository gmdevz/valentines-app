export const dynamic = "force-dynamic";

async function ValentinePage({ params }) {
  try {
    const response = await fetch(`/api/valentine?id=${params.id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch message");
    }

    const data = await response.json();

    return (
      <div className="min-h-screen bg-pink-50 p-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Valentine's Message for {data.recipientName}
          </h1>
          <p className="text-gray-600">{data.message}</p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-pink-50 p-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Message not found
          </h1>
          <p className="text-gray-600">
            This valentine message doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }
}

export default ValentinePage;
