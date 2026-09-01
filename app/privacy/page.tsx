import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Logo from "../(auth)/_components/Logo";
import Heading from "@/components/Heading";
import GitHubLink from "@/components/GitHubLink";
import BackToApp from "./BackToApp";

export const metadata = {
  title: "Privacy Policy",
  description: "How Expense Tracker collects, uses, and protects your data",
};

const CONTROLLER_NAME = "Cătălin Cheptea";
const CONTROLLER_EMAIL = "vested.slump_6o@icloud.com";
const LAST_UPDATED = "September 1, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto box-content max-w-3xl p-6">
      <Logo />
      <Heading
        title="Privacy Policy"
        subtitle={`Last updated: ${LAST_UPDATED}`}
      />
      <Section title="Who we are">
        <Paragraph>
          Expense Tracker is a personal finance app that lets you record and
          visualize your expenses, income, and savings. It is operated by{" "}
          <b>{CONTROLLER_NAME}</b>, who is the data controller for the personal
          data processed by this app under the EU General Data Protection
          Regulation (GDPR).
        </Paragraph>
        <Paragraph>
          For any privacy-related question or request, contact <EmailLink />.
        </Paragraph>
      </Section>
      <Section title="What data we collect">
        <Paragraph>We only collect what is needed to run the app:</Paragraph>
        <List>
          <Item>
            <b>Account data</b> — your name, email address, and a securely
            hashed password (if you sign up with email and password). If you
            sign in with Google, we instead receive your name, email address,
            and profile picture URL from Google.
          </Item>
          <Item>
            <b>Financial data you enter</b> — expenses, income, savings goals,
            deposits, categories, amounts, dates, and any descriptions or notes
            you add. You choose what to enter; please avoid putting personal
            data of other people in descriptions.
          </Item>
          <Item>
            <b>Preferences</b> — your chosen display currency.
          </Item>
          <Item>
            <b>Technical data</b> — when you sign in, a session record is
            created that includes your IP address and browser user agent. This
            is used to keep you signed in and to protect your account.
          </Item>
        </List>
        <Paragraph>
          We do <b>not</b> use analytics, advertising, or tracking services, and
          we never sell your data.
        </Paragraph>
      </Section>
      <Section title="Why we process your data (legal bases)">
        <List>
          <Item>
            <b>To provide the service</b> (Art. 6(1)(b) GDPR — performance of a
            contract): creating your account, authenticating you, storing and
            displaying your financial records, and showing dashboards.
          </Item>
          <Item>
            <b>To keep the service secure</b> (Art. 6(1)(f) GDPR — legitimate
            interests): session management, preventing unauthorized access and
            abuse.
          </Item>
        </List>
      </Section>
      <Section title="Cookies">
        <Paragraph>
          We only use cookies that are strictly necessary for the app to work —
          there are no advertising, analytics, or third-party tracking cookies,
          which is why no cookie consent banner is shown.
        </Paragraph>
        <Table className="[&_td]:text-foreground mb-3 [&_td]:whitespace-normal">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Cookie</TableHead>
              <TableHead className="font-bold">Purpose</TableHead>
              <TableHead className="font-bold">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Session token</TableCell>
              <TableCell>Keeps you signed in</TableCell>
              <TableCell>Until it expires or you sign out</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Session data cache</TableCell>
              <TableCell>
                Short-lived copy of your session to speed up page loads
              </TableCell>
              <TableCell>5 minutes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sign-in state (Google)</TableCell>
              <TableCell>
                Protects the Google sign-in flow against forgery
              </TableCell>
              <TableCell>A few minutes, during sign-in only</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>
      <Section title="Local storage (theme preference)">
        <Paragraph>
          If you use the light/dark mode toggle, your choice is saved in your
          browser’s <code>localStorage</code> so the site remembers it on your
          next visit. This value never leaves your device, is not a cookie, is
          not transmitted to any server, and contains no personal data. You can
          remove it at any time by clearing your browser’s site data.
        </Paragraph>
      </Section>
      <Section title="Who we share data with">
        <Paragraph>
          We use a small number of service providers (processors) to run the
          app. They process your data on our behalf and under our instructions:
        </Paragraph>
        <List>
          <Item>
            <b>Vercel</b> — hosts the application and serves it to your browser.
          </Item>
          <Item>
            <b>Neon</b> — hosts the PostgreSQL database where your account and
            financial data are stored.
          </Item>
          <Item>
            <b>Google</b> — only if you choose to sign in with Google; Google
            confirms your identity to us. Google’s own privacy policy applies to
            your Google account.
          </Item>
        </List>
        <Paragraph>
          These providers may process data outside the European Economic Area
          (for example, in the United States). Where that happens, transfers are
          protected by safeguards such as the EU Standard Contractual Clauses or
          the EU-U.S. Data Privacy Framework.
        </Paragraph>
      </Section>
      <Section title="How long we keep your data">
        <List>
          <Item>
            <b>Account and financial data</b> — for as long as your account
            exists. When you delete your account, all of it is permanently
            deleted right away.
          </Item>
          <Item>
            <b>Session records</b> — deleted when they expire or when you sign
            out.
          </Item>
        </List>
      </Section>
      <Section title="Your rights">
        <Paragraph>Under the GDPR you have the right to:</Paragraph>
        <List>
          <Item>
            <b>Access</b> your personal data (Art. 15);
          </Item>
          <Item>
            <b>Rectify</b> inaccurate data (Art. 16) — you can edit your records
            directly in the app;
          </Item>
          <Item>
            <b>Erase</b> your data (Art. 17) — use{" "}
            <b>Settings -&gt; Privacy &amp; Data -&gt; Delete Account</b> to
            permanently delete your account and all associated data;
          </Item>
          <Item>
            <b>Restrict</b> processing (Art. 18) and <b>object</b> to processing
            based on legitimate interests (Art. 21);
          </Item>
          <Item>
            <b>Data portability</b> (Art. 20) — use{" "}
            <b>Settings -&gt; Privacy &amp; Data -&gt; Export my Data</b> to
            download all your data as a machine-readable JSON file;
          </Item>
          <Item>
            <b>Lodge a complaint</b> with the data protection supervisory
            authority in your country of residence.
          </Item>
        </List>
        <Paragraph>
          You can exercise the self-service options above at any time. For
          anything else, email <EmailLink /> — we will respond within one month.
        </Paragraph>
      </Section>
      <Section title="Security">
        <Paragraph>
          All traffic is encrypted in transit (HTTPS). Passwords are never
          stored in plain text — only a salted cryptographic hash is kept. Your
          financial records are only accessible from your own account.
        </Paragraph>
      </Section>
      <Section title="Children">
        <Paragraph>
          This app is not directed at children under 16, and we do not knowingly
          collect their data. If you believe a child has created an account,
          contact us and we will delete it.
        </Paragraph>
      </Section>
      <Section title="Changes to this policy">
        <Paragraph>
          If we make material changes to this policy, we will update this page
          and the “Last updated” date above.
        </Paragraph>
      </Section>
      <Section title="Contact">
        <Paragraph>
          {CONTROLLER_NAME} — <EmailLink />
        </Paragraph>
      </Section>
      <div className="mx-auto mb-4 flex max-w-3xs flex-col gap-4">
        <BackToApp />
        <GitHubLink />
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-foreground mb-3">{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6">{children}</ul>;
}

function Item({ children }: { children: React.ReactNode }) {
  return <li className="text-foreground mb-1.5">{children}</li>;
}

function EmailLink() {
  return (
    <a
      href={`mailto:${CONTROLLER_EMAIL}`}
      className="text-primary-light font-semibold"
    >
      {CONTROLLER_EMAIL}
    </a>
  );
}
