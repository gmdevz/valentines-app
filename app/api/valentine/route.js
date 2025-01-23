import { v4 as uuidv4 } from "uuid";

// Use a more persistent storage solution
const valentineMessages = new Map();

export async function POST(request) {
  const { recipientName, message } = await request.json();
  const uniqueId = uuidv4();

  valentineMessages.set(uniqueId, {
    recipientName,
    message,
    createdAt: new Date().toISOString(),
  });

  return Response.json({
    uniqueId,
    shareLink: `/valentine/${uniqueId}`,
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const message = valentineMessages.get(id);

  if (message) {
    return Response.json(message);
  }
  return Response.json({ error: "Message not found" }, { status: 404 });
}
