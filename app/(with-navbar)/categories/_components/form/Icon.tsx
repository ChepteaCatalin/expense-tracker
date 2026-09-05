import { type CategoryIcon } from "@/types/category";
import { useWatch } from "react-hook-form";
import { Radio } from "@base-ui/react/radio";

export default function Icon({ icon }: { icon: CategoryIcon }) {
  const strokeColor = useWatch({ name: "strokeColor" });
  const backgroundColor = useWatch({ name: "backgroundColor" });
  const isSelected = useWatch({ name: "icon" }) === icon.src;

  const label = icon.src
    .split("/")
    .pop()!
    .replace(".svg", "")
    .replaceAll("-", " ");

  return (
    <Radio.Root
      value={icon.src}
      aria-label={label}
      title={label}
      className="hover:not-data-checked:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 data-checked:border-primary/40 data-checked:bg-primary/10 flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-transparent transition-colors outline-none focus-visible:ring-3 data-checked:shadow-sm data-disabled:cursor-not-allowed data-disabled:opacity-50"
    >
      <icon.Component
        aria-hidden
        className="fill-muted-foreground pointer-events-none box-content size-10 shrink-0 rounded-full p-0.75 transition-colors"
        style={isSelected ? { backgroundColor, fill: strokeColor } : undefined}
      />
    </Radio.Root>
  );
}
