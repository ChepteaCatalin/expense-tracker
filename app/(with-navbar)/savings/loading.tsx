import Heading from "@/components/Heading";
import Stack from "@mui/material/Stack";
import { metadata } from "./constants";
import Skeleton from "@mui/material/Skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function SavingsGoalsLoading() {
  return (
    <PageWrapper>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        //TODO: sx={{ mb: 5 }}
      />
      <Stack spacing={3}>
        <SavingsGoalCard />
        <SavingsGoalCard />
      </Stack>
    </PageWrapper>
  );
}

function SavingsGoalCard() {
  return (
    <Skeleton
      variant="rectangular"
      height={331}
      sx={{ borderRadius: "12px" }}
    />
  );
}
