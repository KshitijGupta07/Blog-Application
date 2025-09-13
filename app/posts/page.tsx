import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import PostList from "@/components/PostList";

export const runtime = "nodejs";

export default async function PostsPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">All Posts</h2>
      <PostList posts={posts as any} />
    </div>
  );
}
