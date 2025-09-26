// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="card card-ghost border-0 shadow-sm p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0">About</h1>
        <span className="badge text-bg-light">Blogify</span>
      </div>

      <div className="row g-4 align-items-center">
        {/* Photo */}
        <div className="col-12 col-md-4 text-center">
          <div className="ratio ratio-1x1" style={{ maxWidth: 220, marginInline: "auto" }}>
            <Image
              src="/me.jpg"              // <- place your photo at /public/me.jpg
              alt="Kshitij Gupta"
              width={600}
              height={600}
              className="rounded-circle object-fit-cover shadow-sm"
              priority
            />
          </div>
          <div className="mt-3">
            <h2 className="h5 mb-1">Kshitij Gupta</h2>
            <p className="text-body-secondary mb-0">Builder & maintainer</p>
          </div>

          <div className="d-flex gap-2 justify-content-center mt-3">
            <Link
              href="https://www.instagram.com/kshitij_0417_/"
              className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram" /> Instagram
            </Link>
            <a
              href="mailto:kshitijvgupta@gmail.com"
              className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-envelope" /> Email
            </a>
          </div>
        </div>

        {/* Copy + features */}
        <div className="col-12 col-md-8">
          <p className="text-body-secondary">
            A clean, distraction-free space to share your ideas. Write, edit, and manage posts with
            a smooth, friendly experience.
          </p>

          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0 d-flex gap-2">
              <i className="bi bi-check-circle text-success"></i>
              Create, edit, and delete posts with a simple, guided flow.
            </li>
            <li className="list-group-item px-0 d-flex gap-2">
              <i className="bi bi-check-circle text-success"></i>
              Personal dashboard that shows your latest work at a glance.
            </li>
            <li className="list-group-item px-0 d-flex gap-2">
              <i className="bi bi-check-circle text-success"></i>
              Account area to view your profile details and manage your content.
            </li>
            <li className="list-group-item px-0 d-flex gap-2">
              <i className="bi bi-check-circle text-success"></i>
              Polished UI with thoughtful states, toasts, and helpful error messages.
            </li>
        
            <li className="list-group-item px-0 d-flex gap-2">
              <i className="bi bi-check-circle text-success"></i>
              Privacy-minded design — your content stays in your account.
            </li>
          </ul>

          <div className="alert alert-light border mt-4 mb-0">
            Have feedback or ideas? Ping me on Instagram or drop me an email — I’d love to hear from you.
          </div>
        </div>
      </div>
    </div>
  );
}
