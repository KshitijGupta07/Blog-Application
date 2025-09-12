import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { isValidObjectId } from "mongoose";

export const runtime = "nodejs";

type RouteParams = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: RouteParams) {
  await dbConnect();
  const session = await auth();
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = (await req.json()) as Partial<{ title: string; content: string; imageUrl?: string }>;
  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (String(post.authorId) !== String((session.user as any).id))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (typeof body.title === "string") post.title = body.title;
  if (typeof body.content === "string") post.content = body.content;
  post.imageUrl = body.imageUrl?.trim() || undefined;

  await post.save();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  await dbConnect();
  const session = await auth();
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (String(post.authorId) !== String((session.user as any).id))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await post.deleteOne();
  return NextResponse.json({ ok: true });
}
