import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function Dashboard() {
  const user = getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
      <p className="mt-4">This is a private dashboard 🎉</p>
    </main>
  );
}
