export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto box-content max-w-152.5">{children}</div>;
}
