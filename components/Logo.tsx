import logo from "@/public/logo.png";
import logoLight from "@/public/logo-light.png";
import Image from "next/image";

export default function Logo({ width = 150 }: { width?: number }) {
  const sharedProps = {
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
    placeholder: "blur",
    ...(width ? { style: { width } } : {}),
  } as const;

  return (
    <div className="mb-4 flex flex-col items-center">
      <Image
        src={logoLight}
        alt="Expense Tracker Logo"
        className="pointer-events-none h-auto rounded-full select-none dark:hidden"
        {...sharedProps}
      />
      <Image
        src={logo}
        alt="Expense Tracker Logo"
        className="pointer-events-none hidden h-auto rounded-full select-none dark:block"
        {...sharedProps}
      />
    </div>
  );
}
