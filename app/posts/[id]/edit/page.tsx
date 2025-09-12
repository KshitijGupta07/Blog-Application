import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { isValidObjectId } from "lib/isValidObjectId";

export const runtime = "nodejs";

// Local type just for this page (keeps models simple)
type PostView = {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
};

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!isValidObjectId(id)) notFound();

  await dbConnect();
  const session = await auth();

  const post = await Post.findById(id)
    .select("title content imageUrl authorId")
    .lean<PostView | null>();
  if (!post) notFound();

  const postId = String(post._id);
  const authorId = String(post.authorId);

  // only authors may edit
  if (!session?.user || String((session.user as any).id) !== authorId) {
    return redirect(`/posts/${postId}`);
  }

  // Server action: update directly via Mongoose (no fragile fetch)
  async function updateAction(formData: FormData) {
    "use server";
    const s = await auth();
    const uid = String((s?.user as any)?.id || "");
    if (!uid || uid !== authorId) return;

    await dbConnect();

    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();

    await Post.updateOne(
      { _id: postId, authorId: uid },
      {
        $set: {
          title,
          content,
          imageUrl: imageUrl || undefined,
        },
      }
    );

    redirect(`/posts/${postId}`);
  }

  return (
    <div className="card card-ghost border-0 shadow-sm p-4">
      <h1 className="h4 mb-3">Edit post</h1>

      <form action={updateAction} className="vstack gap-3">
        {/* Title */}
        <div>
          <label htmlFor="edit-title" className="form-label">
            Title
          </label>
          <input
            id="edit-title"
            name="title"
            type="text"
            defaultValue={post.title ?? ""}   
            required
            className="form-control"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="edit-content" className="form-label">
            Content
          </label>
          <textarea
            id="edit-content"
            name="content"
            defaultValue={post.content ?? ""}  
            required
            rows={5}
            className="form-control"
          />
        </div>

        {/* Image URL (optional) */}
        <div>
          <label htmlFor="edit-imageUrl" className="form-label">
            Image URL <span className="text-body-secondary">(optional)</span>
          </label>
          <input
            id="edit-imageUrl"
            name="imageUrl"
            type="url"
            inputMode="url"
            defaultValue={post.imageUrl ?? ""}
            className="form-control"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-gradient">
            Save
          </button>
          <a href={`/posts/${postId}`} className="btn btn-outline-secondary">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
