import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) return <p className="text-center text-muted">Please sign in.</p>;

  return (
    <div className="card card-ghost border-0 shadow-sm p-4">
      <h2 className="h3">Account</h2>
      <div className="row g-3 mt-1">
        <div className="col-sm-6">
          <div className="p-3 border rounded">Name: {session.user.name}</div>
        </div>
        <div className="col-sm-6">
          <div className="p-3 border rounded">Email: {session.user.email}</div>
        </div>
      </div>
    </div>
  );
}
