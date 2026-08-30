import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";

export const metadata = {
  title: "Categories",
  description: "Manage your expense and income categories",
};

export default function CategoriesLoading() {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ mb: 1.5, borderRadius: "10px" }}
        />
      }
    >
      <Box>
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{ borderRadius: "10px" }}
        />
        <Grid container spacing={3} sx={{ mt: 3, flexDirection: "column" }}>
          <Divider />
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{ borderRadius: "4px" }}
          />
        </Grid>
      </Box>
    </TitledCardPageWrapper>
  );
}
