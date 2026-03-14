import { CategoryIcon } from '@/types/category';
import Box from '@mui/material/Box';
import styles from './Icon.module.css';

export default function CategoryIconButton({
  icon,
  backgroundColor,
  strokeColor,
}: {
  icon?: CategoryIcon;
  backgroundColor: string;
  strokeColor: string;
}) {
  if (!icon) return null;

  return (
    <Box sx={{ p: 0.5, borderRadius: '8px' }}>
      <icon.Component
        // onClick={() => onChange(icon.src)}
        className={styles.icon}
        style={{ backgroundColor, fill: strokeColor }}
      />
    </Box>
  );
}
