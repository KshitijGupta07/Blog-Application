import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { genSalt, hash } from "bcryptjs";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function registerAction(formData: FormData) {
    "use server";
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    await dbConnect();
    const exists = await UserModel.findOne({ email }).lean();
    if (exists) return;

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    await UserModel.create({ name, email, passwordHash });
    redirect("/login");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <div className="card card-ghost border-0 shadow-sm p-4">
          <h1 className="h3">Register</h1>
          <form action={registerAction} className="mt-3 vstack gap-3">
            <div>
              <label className="form-label">Name</label>
              <input name="name" className="form-control" required />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" required />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-control" required minLength={6} />
            </div>
            <button className="btn btn-gradient">Create account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
