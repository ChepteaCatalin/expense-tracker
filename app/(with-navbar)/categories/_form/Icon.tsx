import Image from 'next/image';
import { CategoryIcon } from '../types';
import styles from './Icon.module.css';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

export default function Icon({ icon }: { icon: CategoryIcon }) {
  return (
    <Controller
      name="icon"
      render={({ field: { value, onChange } }) => (
        <Image
          src={icon.src}
          alt={icon.alt}
          width={40}
          height={40}
          onClick={() => onChange(icon.src)}
          className={clsx(styles.icon, {
            [styles.selected]: value === icon.src,
          })}
        />
      )}
    />
  );
}
