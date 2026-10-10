import NavBar from "@/components/NavBar/NavBar";
import SessionRenewal from "@/components/SessionRenewal";

export default function WithNavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mb-[calc(90px+env(safe-area-inset-bottom))] px-6 py-8">
      {children}
      <NavBar />
      <SessionRenewal />
    </main>
  );
}
