import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import PostList from "@/components/PostList";
import CreatePostForm from "@/components/CreatePostForm";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) return <p className="text-center text-muted">Please sign in.</p>;

  await dbConnect();

  // Fetch all posts
  const posts = await Post.find({})
    .populate("authorId", "name")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="vstack gap-3">
      <div className="card card-ghost border-0 shadow-sm p-4">
        <h2 className="h3 mb-1">Dashboard</h2>
        <p className="text-body-secondary mb-0">Create a post or view all posts.</p>
      </div>

      <CreatePostForm />

      {/* Pass posts + current user id for edit/delete check */}
      {/* @ts-ignore */}
      <PostList posts={posts} currentUserId={(session.user as any).id} />
    </div>
  );
}
