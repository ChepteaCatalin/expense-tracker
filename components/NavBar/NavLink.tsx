'use client';

import Link from 'next/link';
import styles from './NavLink.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import { clsx } from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';

export default function NavLink({
  href,
  Icon,
  text,
}: {
  href: string;
  Icon: React.ElementType;
  text: string;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = href.startsWith(`/${segment}`);
  const isDesktop = useMediaQuery('(pointer: fine)');

  return (
    <Link
      href={href}
      className={clsx(styles.link, { [styles.active]: isActive })}
      style={isDesktop ? { gap: '4px', padding: '8px 16px' } : undefined}
    >
      <Icon fontSize={isDesktop ? 'large' : 'medium'} />
      <Typography
        sx={{
          fontSize: '0.875rem',
          fontWeight: 600,
          lineHeight: isDesktop ? 1.3 : 1.2,
        }}
      >
        {text}
      </Typography>
    </Link>
  );
}
