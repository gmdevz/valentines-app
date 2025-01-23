import { v4 as uuidv4 } from "uuid";

// In-memory storage (replace with a database in production)
const valentineMessages = {};

export async function POST(request) {
  try {
    const { recipientName, message } = await request.json();

    // Generate unique ID
    const uniqueId = uuidv4();

    // Store the message
    valentineMessages[uniqueId] = {
      recipientName,
      message,
      createdAt: new Date().toISOString(),
    };

    // Return the unique ID for sharing
    return Response.json({
      uniqueId,
      shareLink: `/valentine/${uniqueId}`,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to create valentine",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const message = valentineMessages[id];

  if (message) {
    return Response.json(message);
  } else {
    return Response.json({ error: "Message not found" }, { status: 404 });
  }
}
