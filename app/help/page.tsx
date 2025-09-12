import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="card card-ghost border-0 shadow-sm p-4 text-center">
      <h1 className="h3 mb-2">Help & Support</h1>
      <p className="lead text-body-secondary">If you need any help, just contact me on <strong>Instagram</strong> or <strong>Email</strong>.</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Link href="https://instagram.com/your_instagram_username" target="_blank" className="btn btn-gradient d-flex align-items-center gap-2">
          <i className="bi bi-instagram fs-4" /> Instagram
        </Link>
        <a href="mailto:kshitijvgupta@gmail.com" className="btn btn-outline-primary d-flex align-items-center gap-2">
          <i className="bi bi-envelope-fill fs-4" /> Email
        </a>
      </div>
      <hr className="my-4" />
      <div>
        <p className="mb-1 fw-semibold">Connect with me:</p>
        <p><i className="bi bi-instagram text-danger me-2" /><Link href="https://instagram.com/your_instagram_username" target="_blank">instagram.com/your_instagram_username</Link></p>
        <p><i className="bi bi-envelope-fill text-primary me-2" /><a href="mailto:kshitijvgupta@gmail.com">kshitijvgupta@gmail.com</a></p>
      </div>
    </div>
  );
}
