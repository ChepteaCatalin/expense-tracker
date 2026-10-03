export default function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-9">
      <h1 className="text-primary-light text-4xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground font-semibold">{subtitle}</p>
      )}
    </div>
  );
}
