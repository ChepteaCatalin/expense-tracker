'use client';

import Link from 'next/link';
import styles from './NavLink.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import { clsx } from 'clsx';

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

  return (
    <Link
      href={href}
      className={clsx(styles.link, { [styles.active]: isActive })}
    >
      <Icon className={styles.icon} />
      <span className={styles.label}>{text}</span>
    </Link>
  );
}
