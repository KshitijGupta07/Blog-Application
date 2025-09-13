// app/page.tsx
'use client'
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container py-5">
      {/* ✅ Hero / Welcome Section */}
      <div className="text-center my-5">
        <h1 className="display-4 fw-bold">
          Welcome to <span className="text-success">Blogify</span>
        </h1>
        <p className="lead text-body-secondary">
          Create posts, edit them, and manage your content with a clean UI.
        </p>
        <div className="mt-4">
        
        </div>
      </div>

      {/* ✅ Mission Section */}
      <section className="text-center my-5">
        <h2 className="h4 fw-bold">Why Blogify?</h2>
        <p className="text-body-secondary">
          Blogify is your personal space to share ideas, stories, and knowledge.
          Whether you want to write a quick note or a detailed article, Blogify
          gives you the tools to create, edit, and manage posts with ease.
        </p>
      </section>

      {/* ✅ Features Section */}
      <section className="row text-center my-5 g-4">
        <div className="col-md-4">
          <div className="p-3">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.jSeOK7_wid_7oWm3cP6TmgHaH_?pid=Api"
              alt="Create posts illustration"
              className="img-fluid mb-3 rounded shadow-sm feature-img"
              style={{ maxHeight: "200px", transition: "transform 0.3s ease" }}
            />
            <h3 className="h5">Create & Share</h3>
            <p>
              Write blogs with a clean editor and publish them instantly for the
              world to see.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.M9NcyUW47-WJGuIcVMybzgHaFZ?pid=Api"
              alt="Manage posts illustration"
              className="img-fluid mb-3 rounded shadow-sm feature-img"
              style={{ maxHeight: "200px", transition: "transform 0.3s ease" }}
            />
            <h3 className="h5">Manage Posts</h3>
            <p>
              Edit or delete your posts anytime. Stay in control of your content.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3">
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.YNH0MUj_TEvaPzD4jqFXpwAAAA?pid=Api"
              alt="Dashboard view illustration"
              className="img-fluid mb-3 rounded shadow-sm feature-img"
              style={{ maxHeight: "200px", transition: "transform 0.3s ease" }}
            />
            <h3 className="h5">Dashboard View</h3>
            <p>
              Track all your posts in one place and manage them with a simple
              dashboard view.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="text-center my-5">
        <h2 className="h4 fw-bold">Start Your Journey Today</h2>
        <p className="text-body-secondary">
          Join hundreds of writers already sharing their stories on Blogify. It
          takes less than a minute to register and start writing!
        </p>
        <Link href="/register" className="btn btn-success btn-lg mt-3">
          Get Started
        </Link>
      </section>

      {/* ✅ Extra CSS for Hover Effect */}
      <style jsx>{`
        .feature-img:hover {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
