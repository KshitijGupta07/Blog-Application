"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);
    const body = {
      title: String(fd.get("title") || ""),
      content: String(fd.get("content") || ""),
      imageUrl: (String(fd.get("imageUrl") || "").trim() || undefined)
    };
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create post");
      }
      form.reset();
      router.refresh();
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card card-ghost border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Create Post</h5>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={onSubmit} ref={formRef} className="row g-3">
          <div className="col-12">
            <label className="form-label">Title</label>
            <input name="title" className="form-control" required />
          </div>
          <div className="col-12">
            <label className="form-label">Content</label>
            <textarea name="content" rows={5} className="form-control" required />
          </div>
          <div className="col-12">
            <label className="form-label">Image URL (optional)</label>
            <input name="imageUrl" className="form-control" placeholder="https://..." />
          </div>
          <div className="col-12 d-flex gap-2">
            <button className="btn btn-gradient" disabled={loading}>{loading ? "Posting..." : "Post"}</button>
            <button type="reset" className="btn btn-outline-secondary">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
