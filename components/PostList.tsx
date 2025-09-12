import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: any[] }) {
  if (!posts?.length) {
    return <p className="text-center text-muted">No posts yet.</p>;
  }
  return (
    <div className="row g-3">
      {posts.map((p) => (
        <div key={String(p._id)} className="col-12 col-md-6 col-lg-4">
          <PostCard post={p} />
        </div>
      ))}
    </div>
  );
}
