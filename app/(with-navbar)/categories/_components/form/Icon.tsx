import { CategoryIcon } from '@/types/category';
import styles from './Icon.module.css';
import { Controller, useWatch } from 'react-hook-form';
import Box from '@mui/material/Box';

export default function Icon({
  icon,
  disabled,
}: {
  icon: CategoryIcon;
  disabled: boolean;
}) {
  const strokeColor = useWatch({ name: 'strokeColor' });
  const backgroundColor = useWatch({ name: 'backgroundColor' });
  const isSelected = useWatch({ name: 'icon' }) === icon.src;

  return (
    <Controller
      name="icon"
      render={({ field: { onChange } }) => (
        <Box
          sx={{
            p: 0.5,
            borderRadius: '8px',
            ...(isSelected && {
              backgroundColor: 'rgba(30, 215, 96, 0.10)',
              boxShadow:
                '0 2px 6px rgba(30, 215, 96, 0.14), inset 0 0 0 1px rgba(30, 215, 96, 0.28)',
            }),
          }}
        >
          <icon.Component
            onClick={() => !disabled && onChange(icon.src)}
            className={styles.icon}
            style={{
              ...(isSelected ? { backgroundColor, fill: strokeColor } : {}),
              ...(disabled ? { cursor: 'not-allowed' } : {}),
            }}
          />
        </Box>
      )}
    />
  );
}
