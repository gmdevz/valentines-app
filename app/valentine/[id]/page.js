async function ValentinePage({ params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/valentine?id=${params.id}`
  );
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
}

export default ValentinePage;
