import { requireAuth } from "@/lib/auth-utils";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Suspense } from "react";
import SignOutBtn from "./SignOutBtn";
import Section from "../_components/Section";
import LoadingFallback from "./LoadingFallback";

export default function AccountPage() {
  return (
    <Section title="Account">
      <Suspense fallback={<LoadingFallback />}>
        <AccountDetails />
      </Suspense>
    </Section>
  );
}

async function AccountDetails() {
  const { user } = await requireAuth();

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar
          src={user.image || undefined}
          alt={user.name}
          sx={{
            width: 56,
            height: 56,
            bgcolor: "primary.main",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          {getInitials(user.name)}
        </Avatar>
        <Stack spacing={0.5}>
          <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>{user.email}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <SignOutBtn />
    </Stack>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
