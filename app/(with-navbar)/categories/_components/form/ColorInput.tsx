import ColorPicker from "@/components/ColorPicker";
import { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export default function ColorInput({
  label,
  value,
  onChange,
  disabled,
}: ColorInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(value);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="lg" disabled={disabled}>
            {label}
            <Circle
              style={{ fill: localValue, color: localValue }}
              data-icon="inline-end"
            />
          </Button>
        }
      />
      <PopoverContent>
        <ColorPicker
          value={localValue}
          onChange={(color: any) => setLocalValue(color.toRgbString())}
          onChangeComplete={(color: any) => onChange(color.toRgbString())}
        />
      </PopoverContent>
    </Popover>
  );
}
