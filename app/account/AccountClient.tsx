"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountClient({ posts, session }: { posts: any[]; session: any }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  if (!session?.user) {
    return <p className="text-center text-slate-600">Please sign in.</p>;
  }

  return (
    <div className="space-y-8">
      {/* User Info */}
      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="text-xl font-bold">Account</h2>
        <p>
          <strong>Name:</strong> {session.user.name}
        </p>
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
      </div>

      {/* My Posts */}
      <div className="rounded-xl border bg-white p-6 shadow">
        <h3 className="text-lg font-semibold">My Posts</h3>
        {posts.length === 0 && (
          <p className="text-slate-500">You haven’t written any posts yet.</p>
        )}

        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={String(post._id)}
              className="flex items-center justify-between border-b pb-2"
            >
              <Link
                href={`/posts/${post._id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
              <div className="flex gap-2">
                {/* Edit Button */}
                <Link
                  href={`/posts/${post._id}/edit`}
                  className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
                >
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => setDeletingId(String(post._id))}
                  className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation Popup */}
      {deletingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-lg w-96">
            <h2 className="text-lg font-bold text-slate-900">
              Confirm Deletion
            </h2>
            <p className="mt-2 text-slate-600">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await fetch(`/api/posts/${deletingId}`, { method: "DELETE" });
                  setDeletingId(null);
                  router.refresh(); // reload list after delete
                }}
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
