import { CategoryIcon } from '../types';
import styles from './Icon.module.css';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

export default function Icon({ icon }: { icon: CategoryIcon }) {
  return (
    <Controller
      name="icon"
      render={({ field: { value, onChange } }) => (
        <icon.Component
          onClick={() => onChange(icon.src)}
          className={clsx(styles.icon, {
            [styles.selected]: value === icon.src,
          })}
        />
      )}
    />
  );
}
