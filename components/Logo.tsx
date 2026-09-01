import logo from "@/public/logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="mb-4 flex flex-col items-center">
      <Image
        src={logo}
        alt="Expense Tracker Logo"
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        className="pointer-events-none h-auto w-37.5 rounded-full select-none"
      />
    </div>
  );
}
