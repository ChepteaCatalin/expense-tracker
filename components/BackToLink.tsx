import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import type { UrlObject } from 'url';

export default function BackToLink({
  href,
  pageName,
  sx,
}: {
  href: string | UrlObject;
  pageName: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Link href={href}>
      <Button
        sx={{
          py: 0,
          px: 0.5,
          '& .MuiButton-startIcon': { mr: 0.5 },
          ...sx,
        }}
        startIcon={<ChevronLeftIcon />}
      >
        Back to {pageName}
      </Button>
    </Link>
  );
}
