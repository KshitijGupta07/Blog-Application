"use client";
import { useTransition } from "react";

export default function LogoutButton({ onClick }: { onClick: () => Promise<void> }) {
  const [pending, start] = useTransition();
  return (
    <button onClick={() => start(onClick)} className="btn btn-danger" disabled={pending}>
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}
