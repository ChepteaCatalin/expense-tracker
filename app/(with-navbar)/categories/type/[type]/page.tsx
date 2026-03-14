import { getAllCategoriesByType } from '@/data/category';
import { CategoryType } from '@/types/category';
import { UnauthorizedError } from '@/utils/error';
import { notFound, redirect } from 'next/navigation';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { categoryIcons } from '@/utils/category-icons';
import styles from './Icon.module.css';
import Typography from '@mui/material/Typography';

export default async function CategoriesByTypePage({
  params,
}: PageProps<'/categories/type/[type]'>) {
  const { type } = await params;

  if (!isValidCategoryType(type)) notFound();

  try {
    var categories = await getAllCategoriesByType(type);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 100px)',
          maxHeight: '458px',
          overflowY: 'auto',
          alignContent: 'start',
          columnGap: 1,
          rowGap: 4,
        }}
      >
        {categories.map(category => {
          const Icon = categoryIcons.find(
            icon => category.icon === icon.src,
          )!.Component;

          return (
            <Link
              key={category.id}
              href={`/categories/${category.id}/manage`}
              style={{ textDecoration: 'none' }}
            >
              <Box>
                <Icon
                  className={styles.icon}
                  style={{
                    backgroundColor: category.backgroundColor,
                    fill: category.strokeColor,
                  }}
                />
                <Typography
                  color="rgb(227, 227, 227)"
                  textAlign="center"
                  mt={0.3}
                  px={1}
                  sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
      <Grid container direction="column" spacing={3} mt={3}>
        <Divider />
        <Link href="/categories/new">
          <Button variant="contained" startIcon={<AddIcon />} fullWidth>
            New category
          </Button>
        </Link>
      </Grid>
    </Box>
  );
}

function isValidCategoryType(value: string): value is CategoryType {
  const VALID_CATEGORY_TYPES: CategoryType[] = ['expense', 'income'];

  return VALID_CATEGORY_TYPES.includes(value as CategoryType);
}
