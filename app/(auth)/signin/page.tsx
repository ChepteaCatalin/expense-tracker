import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Logo from "../_components/Logo";
import Form from "./Form";
import Link from "next/link";
import linkStyles from "../_components/Link.module.css";
import GitHubLink from "@/components/GitHubLink";
import Box from "@mui/material/Box";

const spacing = 2.5;

export const metadata = {
  title: "Sign In",
  description: "Sign in to manage your finances with Expense Tracker",
};

export default function SignInPage() {
  return (
    <Grid
      component="main"
      container
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: `calc(100vh - ${2 * spacing * 8}px)`,
        my: spacing,
      }}
    >
      <Logo />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: spacing,
          mx: spacing,
          gap: spacing,
          borderRadius: "10px",
          maxWidth: "400px",
        }}
      >
        <Typography component="h1" sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
          Sign In
        </Typography>
        <Form />
        <Grid container spacing={0.5} sx={{ mt: -0.75 }}>
          <Typography>{`Don't have an account?`}</Typography>
          <Link href="/signup" className={linkStyles.link}>
            Sign Up
          </Link>
        </Grid>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center", mt: -0.75 }}
        >
          By signing in, you agree to our{" "}
          <Link href="/privacy" className={linkStyles.link}>
            Privacy Policy
          </Link>
          .
        </Typography>
      </Card>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <GitHubLink />
      </Box>
    </Grid>
  );
}
