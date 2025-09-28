import PostCard from "./PostCard";

export default function PostList({ posts, currentUserId }: { posts: any[], currentUserId: string }) {
  if (!posts?.length) return <p className="text-center text-muted">No posts yet.</p>;

  return (
    <div className="row g-3">
      {posts.map((post) => (
        <div key={String(post._id)} className="col-12 col-md-6 col-lg-4">
          <PostCard post={post} currentUserId={currentUserId} />
        </div>
      ))}
    </div>
  );
}
