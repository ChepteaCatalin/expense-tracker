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
  const notMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Link
      href={href}
      className={clsx(styles.link, { [styles.active]: isActive })}
    >
      <Icon fontSize={notMobile ? 'large' : 'medium'} />
      <Typography
        fontSize="0.875rem"
        fontWeight={600}
        lineHeight={notMobile ? 1.3 : 1.2}
      >
        {text}
      </Typography>
    </Link>
  );
}
