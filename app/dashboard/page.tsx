import { auth } from "@/auth";
import CreatePostForm from "@/components/CreatePostForm";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import PostList from "@/components/PostList";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) return <p className="text-center text-muted">Please sign in.</p>;

  await dbConnect();
  const posts = await Post.find({ authorId: (session.user as any).id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="vstack gap-3">
      <div className="card card-ghost border-0 shadow-sm p-4">
        <h2 className="h3 mb-1">Your dashboard</h2>
        <p className="text-body-secondary mb-0">Create a post or manage your recent ones.</p>
      </div>
      <CreatePostForm />
      {/* @ts-ignore */}
      <PostList posts={posts as any[]} />
    </div>
  );
}
