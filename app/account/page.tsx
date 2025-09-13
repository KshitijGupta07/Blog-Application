import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { auth } from "@/auth";
import AccountClient from "./AccountClient"

export const runtime = "nodejs";

export default async function AccountServerPage() {
  const session = await auth();
  if (!session?.user) return <p className="text-center">Please sign in.</p>;

  await dbConnect();
  const posts = await Post.find({ authorId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return <AccountClient posts={JSON.parse(JSON.stringify(posts))} session={session} />;
}
