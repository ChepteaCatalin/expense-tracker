import ColorPicker from '@/components/ColorPicker';
import Popover from '@mui/material/Popover';
import { useId, useState } from 'react';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';

export default function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const id = useId();
  const open = !!anchorEl;

  return (
    <>
      <Button
        color="inherit"
        onClick={event => setAnchorEl(event.currentTarget)}
        endIcon={
          <CircleIcon
            sx={{ color: localValue, width: '32px', height: '32px' }}
          />
        }
        sx={{ '& .MuiButton-icon': { ml: 0.5 }, color: 'text.secondary' }}
      >
        {label}
      </Button>
      <Popover
        id={open ? id : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <ColorPicker
          value={localValue}
          onChange={(color: any) => setLocalValue(color.toRgbString())}
          onChangeComplete={(color: any) => onChange(color.toRgbString())}
        />
      </Popover>
    </>
  );
}
