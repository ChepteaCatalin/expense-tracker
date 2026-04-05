import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { categoryIcons } from '@/utils/category-icons';
import Grid from '@mui/material/Grid';
import { CategoryItem } from '@/types/expense';

export default function CategoryListItem({
  category,
  currency,
}: {
  category: CategoryItem;
  currency: string;
}) {
  const Icon = categoryIcons.find(
    icon => icon.src === category.icon,
  )?.Component;

  return (
    <Card sx={{ borderRadius: '10px' }}>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          p: 1.25,
          '&:last-child': { pb: 1.25 },
        }}
      >
        <Grid container alignItems="center" gap={1} flexWrap="nowrap">
          {Icon && (
            <Icon
              style={{
                width: '32px',
                height: '32px',
                fontWeight: '32px',
                padding: '3px',
                borderRadius: '50%',
                backgroundColor: category.backgroundColor,
                fill: category.strokeColor,
                flex: 'none',
              }}
            />
          )}
          <Typography
            color="text.pale"
            fontSize="0.875rem"
            fontWeight={500}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {category.name}
          </Typography>
        </Grid>
        <Grid container gap={2.5} flexWrap="nowrap" sx={{ flex: 'none' }}>
          <Typography
            fontSize="0.8125rem"
            color="text.secondary"
            whiteSpace="nowrap"
            lineHeight="21px"
          >
            {category.percentage.toFixed(2)}%
          </Typography>
          <Typography
            fontSize="0.875rem"
            fontWeight={500}
            color="text.pale"
            whiteSpace="nowrap"
          >
            {`${category.amount} ${currency}`}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
