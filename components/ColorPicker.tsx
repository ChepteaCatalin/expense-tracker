import ColorPickerComponent, {
  type ColorPickerProps,
} from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";

export default function ColorPicker({ ...props }: ColorPickerProps) {
  return <ColorPickerComponent {...props} />;
}
