"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(
      \`\${process.env.NEXT_PUBLIC_API_URL}/auth/login\`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include"
      }
    );
    if (res.ok) router.push("/dashboard");
    else setErr((await res.json()).msg);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 p-8 bg-white shadow rounded"
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <input
          className="input"
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="btn w-full">Login</button>
        <p className="text-center text-sm">
          No account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
