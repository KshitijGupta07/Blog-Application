export default function Footer() {
  return (
    <footer className="text-center text-muted mt-5">
      <hr />
      <p className="small mb-0">© {new Date().getFullYear()} Blogify. Built with Next.js + MongoDB.</p>
    </footer>
  );
}
