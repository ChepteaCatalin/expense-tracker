import Box from "@mui/material/Box";
import { categoryIcons } from "@/utils/category-icons";
import type { Category } from "@/types/category";
import Typography from "@mui/material/Typography";
import { Controller, useFormState } from "react-hook-form";

export default function CategoriesInput({
  categories,
  disabled,
}: {
  categories: Category[];
  disabled: boolean;
}) {
  const { errors } = useFormState();

  return (
    <Box>
      <Box>
        <Typography>Category *</Typography>
        {errors.categoryId && (
          <Typography color="error" variant="body2">
            {String(errors.categoryId.message)}
          </Typography>
        )}
      </Box>
      <Controller
        name="categoryId"
        render={({ field: { onChange, value } }) => (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 100px)",
              maxHeight: "458px",
              overflowY: "auto",
              alignContent: "start",
              columnGap: 1,
              rowGap: 4,
              mt: 1,
            }}
          >
            {categories.map((category) => {
              const icon = categoryIcons.find(
                (icon) => category.icon === icon.src,
              );

              if (!icon) return null;

              const isSelected = category.id == value;

              return (
                <Box
                  key={category.id}
                  sx={{
                    backgroundColor: isSelected
                      ? category.backgroundColor
                      : "transparent",
                    borderRadius: "8px",
                    p: 0.5,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={() => !disabled && onChange(category.id)}
                >
                  <icon.Component
                    style={{
                      display: "block",
                      borderRadius: "50%",
                      padding: "3px",
                      boxSizing: "content-box",
                      marginLeft: "auto",
                      marginRight: "auto",
                      backgroundColor: category.backgroundColor,
                      fill: category.strokeColor,
                    }}
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      mt: 0.3,
                      px: 1,
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      color: (theme) =>
                        isSelected
                          ? theme.palette.getContrastText(
                              category.backgroundColor,
                            )
                          : "common.white",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      />
    </Box>
  );
}
