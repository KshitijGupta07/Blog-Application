// app/login/page.tsx
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import Link from "next/link";

export default function LoginPage() {
  // credentials login
  async function loginAction(formData: FormData) {
    "use server";
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/dashboard",
      });
    } catch (err) {
      if (err instanceof AuthError && err.type === "CredentialsSignin") {
        // optional: surface a nicer message via redirect or search param
        throw new Error("Invalid email or password.");
      }
      throw err;
    }
  }

  // google login (separate server action, no nested form)
  async function googleAction() {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <div className="card card-ghost border-0 shadow-sm p-4">
          <h1 className="h3">Login</h1>

          {/* ONE form only */}
          <form action={loginAction} className="mt-3 vstack gap-3" noValidate>
            <div>
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="d-flex gap-2">
              {/* Submit credentials */}
              <button type="submit" className="btn btn-gradient">
                Login
              </button>

              {/* Trigger a different server action from the SAME form */}
              <button
                type="submit"
                formAction={googleAction}
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
              >
                <i className="bi bi-google" />
                Continue with Google
              </button>
            </div>
          </form>

          <p className="mt-3 mb-0 text-body-secondary">
            No account? <Link href="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
