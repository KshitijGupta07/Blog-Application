import Link from "next/link";
import { auth, signOut } from "@/auth";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="navbar navbar-expand-lg bg-white rounded-3 shadow-sm px-3">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand navbar-brand-gradient">Blogify</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map(i => (
              <li key={i.href} className="nav-item">
                <Link className="nav-link" href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            {!session?.user ? (
              <>
                <Link href="/login" className="btn btn-outline-primary">Login</Link>
                <Link href="/register" className="btn btn-gradient">Register</Link>
              </>
            ) : (
              <>
                <Link href="/account" className="btn btn-outline-success">Account</Link>
                <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                  <button className="btn btn-danger">Logout</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
