import "@/app/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard",
  description: "Example auth template"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
