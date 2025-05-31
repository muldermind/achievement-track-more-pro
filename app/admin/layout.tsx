// app/admin/layout.tsx
import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
