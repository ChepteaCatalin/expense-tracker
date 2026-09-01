import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Heading from "@/components/Heading";
import GitHubLink from "@/components/GitHubLink";

export const metadata = {
  title: "Settings",
  description: "Manage your account and preferences",
};

export default function SettingsLayout({
  account,
  password,
  preferences,
  privacy,
}: {
  account: React.ReactNode;
  password: React.ReactNode;
  preferences: React.ReactNode;
  privacy: React.ReactNode;
}) {
  return (
    <Box sx={{ boxSizing: "content-box", maxWidth: "600px", mx: "auto" }}>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Grid container spacing={6} sx={{ flexDirection: "column" }}>
        {account}
        {password}
        {preferences}
        {privacy}
        <GitHubLink />
      </Grid>
    </Box>
  );
}
