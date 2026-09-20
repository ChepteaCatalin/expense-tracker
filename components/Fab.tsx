import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function Fab() {
  return (
    <Button
      size="icon-lg"
      className="fixed right-3 bottom-[calc(69px+env(safe-area-inset-bottom))] h-12 w-12 rounded-full lg:bottom-23.75 lg:h-14 lg:w-14"
      aria-label="add"
    >
      <Plus />
    </Button>
  );
}
