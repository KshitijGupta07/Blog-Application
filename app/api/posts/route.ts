import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";

export const runtime = "nodejs";

// --- CREATE POST ---
export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await auth();
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, imageUrl } = await req.json();
  if (typeof title !== "string" || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const doc = await Post.create({
    title,
    content,
    imageUrl: typeof imageUrl === "string" && imageUrl.trim() ? imageUrl.trim() : undefined,
    authorId: (session.user as any).id,
    authorName: session.user.name ?? undefined,
  });

  return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 });
}

// --- GET ALL POSTS ---
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // Fetch all posts, newest first
    const posts = await Post.find({}).populate("authorId","name").sort({ createdAt: -1 }).lean();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
