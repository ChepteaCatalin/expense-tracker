import { getAllCategoriesByType } from "@/data/category";
import { UnauthorizedError } from "@/utils/error";
import { notFound, redirect } from "next/navigation";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import Box from "@mui/material/Box";
import { categoryIcons } from "@/utils/category-icons";
import Typography from "@mui/material/Typography";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { isValidCategoryType } from "../utils";
import TypeToggle from "../_components/TypeToggle";
import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";

export const metadata = {
  title: "Categories",
  description: "Manage your expense and income categories",
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
    if (err instanceof UnauthorizedError) redirect("/signin");
    notFound();
  }

  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<TypeToggle />}
    >
      <Box>
        {categories.length ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 100px)",
              maxHeight: "458px",
              overflowY: "auto",
              alignContent: "start",
              columnGap: 1,
              rowGap: 4,
            }}
          >
            {categories.map((category) => {
              const Icon = categoryIcons.find(
                (icon) => category.icon === icon.src,
              )!.Component;

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}/manage`}
                  style={{ textDecoration: "none" }}
                >
                  <Box>
                    <Icon
                      style={{
                        display: "block",
                        borderRadius: "50%",
                        padding: "3px",
                        boxSizing: "content-box",
                        marginLeft: "auto",
                        marginRight: "auto",
                        cursor: "pointer",
                        backgroundColor: category.backgroundColor,
                        fill: category.strokeColor,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "common.white",
                        textAlign: "center",
                        mt: 0.3,
                        px: 1,
                        fontSize: "0.875rem",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
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
          <Grid
            container
            sx={{ alignItems: "center", flexDirection: "column" }}
          >
            <SearchOffIcon
              sx={{ fontSize: "60px", fill: "rgb(210, 210, 210)" }}
            />
            <Typography>No {type} categories found</Typography>
          </Grid>
        )}
        <Grid container spacing={3} sx={{ mt: 3, flexDirection: "column" }}>
          <Divider />
          <Link href={{ pathname: "/categories/new", query: { type } }}>
            <Button variant="contained" startIcon={<AddIcon />} fullWidth>
              New Category
            </Button>
          </Link>
        </Grid>
      </Box>
    </TitledCardPageWrapper>
  );
}
