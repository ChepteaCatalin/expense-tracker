import { getAllCategoriesByType } from '@/data/category';
import { UnauthorizedError } from '@/utils/error';
import { notFound, redirect } from 'next/navigation';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { categoryIcons } from '@/utils/category-icons';
import styles from '../_components/CategoryIconButton.module.css';
import Typography from '@mui/material/Typography';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { isValidCategoryType } from '../utils';
import TypeToggle from '../_components/TypeToggle/TypeToggle';
import PageWrapper from '../_components/PageWrapper';

export const metadata = {
  title: 'Categories',
  description: 'Manage your expense and income categories',
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const { type } = await searchParams;

  if (!isValidCategoryType(type)) notFound();

  try {
    var categories = await getAllCategoriesByType(type);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  return (
    <PageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<TypeToggle />}
    >
      <Box>
        {categories.length ? (
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
                      fontSize="0.875rem"
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
        ) : (
          <Grid container direction="column" alignItems="center">
            <SearchOffIcon
              sx={{ fontSize: '60px', fill: 'rgb(210, 210, 210)' }}
            />
            <Typography>No {type} categories found</Typography>
          </Grid>
        )}
        <Grid container direction="column" spacing={3} mt={3}>
          <Divider />
          <Link href={{ pathname: '/categories/new', query: { type } }}>
            <Button variant="contained" startIcon={<AddIcon />} fullWidth>
              New Category
            </Button>
          </Link>
        </Grid>
      </Box>
    </PageWrapper>
  );
}
