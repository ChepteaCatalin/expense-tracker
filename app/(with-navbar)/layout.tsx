import NavBar from "@/components/NavBar/NavBar";

export default function WithNavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mb-[calc(90px+env(safe-area-inset-bottom))] px-6 py-8">
      {children}
      <NavBar />
    </main>
  );
}
