import { CategoryIcon } from '@/types/category';
import Box from '@mui/material/Box';
import styles from './Icon.module.css';
import Link from 'next/link';

export default function CategoryIconButton({
  id,
  icon,
  backgroundColor,
  strokeColor,
}: {
  id: number;
  icon?: CategoryIcon;
  backgroundColor: string;
  strokeColor: string;
}) {
  if (!icon) return null;

  return (
    <Link href={`/categories/${id}/manage`}>
      <Box sx={{ p: 0.5, borderRadius: '8px' }}>
        <icon.Component
          // onClick={() => onChange(icon.src)}
          className={styles.icon}
          style={{ backgroundColor, fill: strokeColor }}
        />
      </Box>
    </Link>
  );
}
