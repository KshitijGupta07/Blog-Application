import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import PostList from "@/components/PostList";

export const runtime = "nodejs";
export const revalidate = 0; // always fetch fresh posts

export default async function PostsPage() {
  // Connect to MongoDB
  await dbConnect();

  // Fetch all posts and populate authorId with name
  const posts = await Post.find()
    .populate("authorId", "name")  // ensures author info is available
    .sort({ createdAt: -1 })       // newest posts first
    .lean();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">All Posts</h2>
      {/* Pass posts to PostList component */}
      <PostList posts={posts as any} />
    </div>
  );
}
