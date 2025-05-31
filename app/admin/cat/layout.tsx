export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {children}
    </div>
  );
}
