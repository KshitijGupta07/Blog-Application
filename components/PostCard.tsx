import Link from "next/link";

export default function PostCard({ post }: { post: any }) {
  const id = String(post._id);
  const authorName = post.authorName || "Unknown Author"; // fallback if missing

  return (
    <div className="card border-0 shadow-sm card-ghost">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          className="card-img-top"
          style={{ objectFit: "cover", maxHeight: 220 }}
          alt={post.title}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-muted">
          {post.content.slice(0, 160)}
          {post.content.length > 160 ? "…" : ""}
        </p>
        <p className="text-sm text-muted mb-2">By: {authorName}</p>
        <Link href={`/posts/${id}`} className="btn btn-outline-primary">
          Read
        </Link>
      </div>
    </div>
  );
}
