// app/posts/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import Link from "next/link";
import { isValidObjectId } from "@/lib/isValidObjectId";

export const runtime = "nodejs";

type PostView = {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  authorName?: string;
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!isValidObjectId(id)) notFound();

  await dbConnect();
  const session = await auth();

  const post = await Post.findById(id)
    .select("title content imageUrl authorId authorName")
    .lean<PostView | null>();
  if (!post) notFound();

  const postId = String(post._id);
  const authorId = String(post.authorId);
  const authorName = post.authorName ?? "Unknown";

  // ✅ make a stable, narrowed userId string
  const userId = String(((session as any)?.user?.id) ?? "");
  const isAuthor = userId === authorId;

  async function deleteAction() {
    "use server";
    const s = await auth();
    const uid = String(((s as any)?.user?.id) ?? "");
    if (!uid || uid !== authorId) return;

    await dbConnect();
    await Post.deleteOne({ _id: postId, authorId: uid });
    redirect("/dashboard");
  }

  return (
    <div className="card card-ghost border-0 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0">{post.title}</h1>
        <span className="text-muted">by {authorName}</span>
      </div>

      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title || "Post image"}
          className="img-fluid rounded mt-3"
        />
      ) : null}

      <article className="mt-3" style={{ whiteSpace: "pre-wrap" }}>
        {post.content}
      </article>

      {isAuthor && (
        <div className="mt-4 d-flex gap-2">
          <Link href={`/posts/${postId}/edit`} className="btn btn-outline-secondary">
            Edit
          </Link>
          <form action={deleteAction}>
            <button className="btn btn-danger">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
}
