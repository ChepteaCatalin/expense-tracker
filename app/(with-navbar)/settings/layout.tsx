import Heading from "@/components/Heading_v2";
import GitHubLink from "@/components/GitHubLink";

export const metadata = {
  title: "Settings",
  description: "Manage your account and preferences",
};

export default function SettingsLayout({
  account,
  password,
  preferences,
}: {
  account: React.ReactNode;
  password: React.ReactNode;
  preferences: React.ReactNode;
}) {
  return (
    <div className="mx-auto box-content max-w-150">
      <Heading title={metadata.title} subtitle={metadata.description} />
      <div className="grid gap-8">
        {account}
        {password}
        {preferences}
        <div className="mx-auto">
          <GitHubLink />
        </div>
      </div>
    </div>
  );
}
