import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blogify",
  description: "A clean blog app with Next.js, NextAuth and MongoDB"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body className="bg-body-tertiary">
        <div className="container py-4">
          
          <Navbar />
          <main className="mt-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
