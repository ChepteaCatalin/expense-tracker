import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import NextLink from "next/link";
import linkStyles from "@/app/(auth)/_components/Link.module.css";
import Section from "../_components/Section";
import DeleteAccountBtn from "./DeleteAccountBtn";

export default function PrivacyPage() {
  return (
    <Section title="Privacy & Data">
      <Grid container spacing={3} sx={{ flexDirection: "column" }}>
        <Grid>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Download a copy of all your data (profile, categories, expenses,
            income, and savings) as a JSON file.
          </Typography>
          <Button
            component="a"
            href="/api/export"
            variant="outlined"
            fullWidth
            startIcon={<DownloadIcon />}
          >
            Export My Data
          </Button>
        </Grid>
        <Divider />
        <Grid>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Permanently delete your account and all associated data — expenses,
            income, savings, and categories. This cannot be undone.
          </Typography>
          <DeleteAccountBtn />
        </Grid>
        <Divider />
        <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
          Read how we handle your data in our{" "}
          <NextLink href="/privacy" className={linkStyles.link}>
            Privacy Policy
          </NextLink>
          .
        </Typography>
      </Grid>
    </Section>
  );
}
