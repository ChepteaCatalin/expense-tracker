import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Logo from "@/components/Logo";
import Heading from "@/components/Heading";
import GitHubLink from "@/components/GitHubLink";
import BackToApp from "./BackToApp";

export const metadata = {
  title: "Privacy Policy",
  description: "How Expense Tracker collects, uses, and protects your data",
};

const CONTROLLER_NAME = "Cătălin Cheptea";
const CONTROLLER_EMAIL = "vested.slump_6o@icloud.com";
const LAST_UPDATED = "October 8, 2026";

const MD_LAW = "Law No. 195/2024";

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
          <b>{CONTROLLER_NAME}</b>, who is the <b>data controller</b> for the
          personal data processed by this app.
        </Paragraph>
        <Paragraph>
          For any privacy-related question or request, contact <EmailLink />. We
          have not appointed a Data Protection Officer, as this is not required
          for the type and scale of processing we carry out (Art. 37 GDPR and
          Art. 37 of {MD_LAW}).
        </Paragraph>
      </Section>
      <Section title="Which laws apply">
        <Paragraph>We process personal data in accordance with:</Paragraph>
        <List>
          <Item>
            <b>
              Law No. 195 of 25 July 2024 on personal data protection of the
              Republic of Moldova
            </b>{" "}
            (“{MD_LAW}”), in force since 23 August 2026; and
          </Item>
          <Item>
            the <b>EU General Data Protection Regulation</b> (Regulation (EU)
            2016/679, “GDPR”), for users located in the European Union or the
            European Economic Area (EEA).
          </Item>
        </List>
        <Paragraph>
          {MD_LAW} closely follows the GDPR, and the article numbers cited in
          this policy are the same in both laws unless stated otherwise.
        </Paragraph>
      </Section>
      <Section title="What data we collect">
        <List>
          <Item>
            <b>Account data</b> — your name, email address, and a securely
            hashed password (if you sign up with email and password). If you
            sign in with Google, we instead receive your name, email address,
            profile picture URL, and Google account identifier from Google. We
            do not store Google access or refresh tokens.
          </Item>
          <Item>
            <b>Financial data you enter</b> — expenses, income, savings goals,
            deposits, categories, amounts, dates, and any descriptions or notes
            you add. You decide what to enter. Please do not enter sensitive
            information (for example, health data) or personal data about other
            people in descriptions or notes.
          </Item>
          <Item>
            <b>Preferences</b> — your chosen display currency.
          </Item>
          <Item>
            <b>Session data</b> — when you sign in, a session record is created
            with a random token and its creation and expiry dates. We do not
            store your IP address or browser user agent with it.
          </Item>
          <Item>
            <b>Security data</b> — to protect sign-in, sign-up, and password
            change against brute-force attacks, we count recent attempts per IP
            address, per email address, and per account. These counters are
            stored only as keyed cryptographic hashes, not as plain IP or email
            addresses.
          </Item>
          <Item>
            <b>Time zone</b> — your device’s time zone name (for example,
            Europe/Chisinau), sent with each request in a cookie so that dates
            such as “today” match your calendar day. It is not stored on our
            servers.
          </Item>
          <Item>
            <b>Hosting logs</b> — our hosting provider automatically processes
            technical request data (such as IP address, requested URL, and time)
            to deliver the app and keep it secure.
          </Item>
        </List>
        <Paragraph>
          We collect this data directly from you, or from Google if you choose
          to sign in with Google.
        </Paragraph>
        <Paragraph>
          Your name and email address (and a password, if you do not use Google)
          are required to create an account. Without them we cannot provide the
          service. Everything else you enter is up to you.
        </Paragraph>
        <Paragraph>
          We do <b>not</b> use analytics, advertising, or tracking services. We
          do not sell your data, use it for marketing, or profile you, and we do
          not make decisions about you based solely on automated processing
          (Art. 22).
        </Paragraph>
      </Section>
      <Section title="Why we process your data (legal bases)">
        <DataTable
          headers={["Purpose", "Data", "Legal basis"]}
          rows={[
            [
              "Creating and running your account, signing you in, storing and displaying your financial records and dashboards, showing dates in your time zone, exporting your data on request",
              "Account, financial, preferences, session, and time zone data",
              "Performance of a contract with you — Art. 6(1)(b)",
            ],
            [
              "Protecting accounts against brute-force attacks and abuse, and keeping the service secure",
              "Security data, hosting logs",
              "Legitimate interests — Art. 6(1)(f). Our interest, and yours, is keeping accounts and financial data safe. We use the minimum data needed, stored in hashed form and kept only briefly.",
            ],
            [
              "Answering your privacy requests and keeping a record that we did",
              "Your request and our correspondence",
              "Legal obligation — Art. 6(1)(c)",
            ],
          ]}
        />
      </Section>
      <Section title="Cookies and local storage">
        <Paragraph>
          We only use cookies that are strictly necessary for the app to work.
          There are no advertising, analytics, or third-party tracking cookies.
          Strictly necessary cookies do not require your consent, which is why
          no cookie banner is shown. On HTTPS, the cookie names below are
          prefixed with <code>__Secure-</code>.
        </Paragraph>
        <DataTable
          headers={["Name", "Purpose", "Duration"]}
          rows={[
            [
              "better-auth.session_token",
              "Keeps you signed in",
              "7 days, renewed while you use the app; deleted when you sign out",
            ],
            [
              "better-auth.session_data",
              "Short-lived signed copy of your session to speed up page loads",
              "5 minutes",
            ],
            [
              "better-auth.state",
              "Protects the Google sign-in flow against forgery",
              "5 minutes, during Google sign-in only",
            ],
            [
              "tz",
              "Your device’s time zone name (e.g. Europe/Chisinau), so dates like “today” match your calendar day",
              "Until you close your browser",
            ],
          ]}
        />
        <Paragraph>
          If you use the light/dark mode toggle, your choice is saved in your
          browser’s <code>localStorage</code> under the key <code>theme</code>{" "}
          so the site remembers it. This value never leaves your device and
          contains no personal data. You can remove it at any time by clearing
          your browser’s site data.
        </Paragraph>
      </Section>
      <Section title="Who we share data with">
        <Paragraph>
          We use a small number of service providers (processors). They process
          your data only on our behalf, under our instructions, and under data
          processing agreements (Art. 28):
        </Paragraph>
        <List>
          <Item>
            <b>Vercel Inc.</b> (United States) — hosts the application and
            delivers it to your browser through its global network.
          </Item>
          <Item>
            <b>Neon</b> (United States) — hosts the PostgreSQL database where
            your account and financial data are stored. The database is located
            in the European Union (Frankfurt, Germany).
          </Item>
        </List>
        <Paragraph>
          If you choose to sign in with Google, <b>Google</b> confirms your
          identity to us and acts as an independent controller of your Google
          account data under its own privacy policy. When you open Settings,
          your Google profile picture is loaded directly from Google’s servers,
          which means Google receives your IP address for that request.
        </Paragraph>
        <Paragraph>
          We do not share your data with anyone else, unless we are legally
          required to disclose it to a competent public authority.
        </Paragraph>
      </Section>
      <Section title="International data transfers">
        <Paragraph>
          Your account and financial data are stored in the EU. Under {MD_LAW},
          transfers from the Republic of Moldova to EEA member states do not
          require any special authorization (Art. 44).
        </Paragraph>
        <Paragraph>
          Because Vercel and Neon are U.S. companies, your data may also be
          processed in the United States or other countries outside Moldova and
          the EEA. These transfers are protected by the{" "}
          <b>Standard Contractual Clauses adopted by the European Commission</b>{" "}
          in our providers’ data processing agreements. These clauses are a
          valid safeguard under Art. 46 GDPR and Art. 46 of {MD_LAW}. For users
          in the EEA, transfers to providers certified under the EU-U.S. Data
          Privacy Framework may also rely on that framework. You can ask us for
          a copy of the relevant safeguards at <EmailLink />.
        </Paragraph>
      </Section>
      <Section title="How long we keep your data">
        <DataTable
          headers={["Data", "Retention"]}
          rows={[
            [
              "Account, financial data, and preferences",
              "Until you delete your account. Deletion is immediate and permanent. Residual copies in our database provider’s short-term recovery history are overwritten automatically within 24 hours.",
            ],
            [
              "Session records",
              "Until you sign out or the session expires (7 days after last use). Expired records are deleted automatically within 24 hours.",
            ],
            [
              "Security counters (hashed)",
              "Deleted automatically within 48 hours. Counters linked to your account or email are deleted immediately when you delete your account.",
            ],
            [
              "Hosting logs",
              "Deleted automatically by our hosting provider, currently within 1 day",
            ],
            [
              "Time zone",
              "Kept only in a cookie in your browser until you close it; never stored on our servers",
            ],
            [
              "Privacy requests and related correspondence",
              "As long as needed to handle the request and demonstrate that we did so, and no longer than 3 years",
            ],
          ]}
        />
      </Section>
      <Section title="Your rights">
        <Paragraph>You have the right to:</Paragraph>
        <List>
          <Item>
            <b>Be informed</b> about how your data is processed (Art. 12–14) —
            this policy;
          </Item>
          <Item>
            <b>Access</b> your personal data and receive a copy (Art. 15) — use{" "}
            <b>Settings -&gt; Privacy &amp; Data -&gt; Export my Data</b>;
          </Item>
          <Item>
            <b>Rectify</b> inaccurate data (Art. 16) — you can edit your records
            directly in the app, or ask us to correct your account details;
          </Item>
          <Item>
            <b>Erasure</b> (Art. 17) — use{" "}
            <b>Settings -&gt; Privacy &amp; Data -&gt; Delete Account</b> to
            permanently delete your account and all associated data;
          </Item>
          <Item>
            <b>Restrict</b> processing (Art. 18);
          </Item>
          <Item>
            <b>Data portability</b> (Art. 20) — the export is a structured,
            machine-readable JSON file;
          </Item>
          <Item>
            <b>Object</b> to processing based on legitimate interests (Art. 21);
          </Item>
          <Item>
            <b>
              Not be subject to decisions based solely on automated processing
            </b>{" "}
            (Art. 22) — we do not make any such decisions.
          </Item>
        </List>
        <Paragraph>
          If we rectify, erase, or restrict your data, we will inform any
          recipients it was disclosed to, unless this is impossible or involves
          disproportionate effort (Art. 19).
        </Paragraph>
        <Paragraph>
          You can use the self-service options above at any time. For anything
          else, email <EmailLink />, preferably from your account’s email
          address so we can verify your identity. Exercising your rights is free
          of charge. We will respond without undue delay and within one month.
          For complex or numerous requests, we may extend this by up to two
          further months, and we will tell you within the first month if we do.
        </Paragraph>
      </Section>
      <Section title="Complaints">
        <Paragraph>
          If you believe we process your data unlawfully, please contact us
          first so we can try to resolve it. You also have the right to lodge a
          complaint with a data protection supervisory authority and to seek a
          judicial remedy (Art. 77–79 GDPR; Art. 74 of {MD_LAW}):
        </Paragraph>
        <List>
          <Item>
            <b>Republic of Moldova</b> — National Center for Personal Data
            Protection (Centrul Național pentru Protecția Datelor cu Caracter
            Personal), 48 Serghei Lazo St., MD-2004 Chișinău;{" "}
            <ExternalLink href="https://datepersonale.md">
              datepersonale.md
            </ExternalLink>
            ;{" "}
            <ExternalLink href="mailto:centru@datepersonale.md">
              centru@datepersonale.md
            </ExternalLink>
            .
          </Item>
          <Item>
            <b>EU/EEA</b> — the supervisory authority of your country of
            residence, place of work, or place of the alleged infringement (
            <ExternalLink href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_en">
              list of authorities
            </ExternalLink>
            ).
          </Item>
        </List>
      </Section>
      <Section title="Security">
        <Paragraph>
          All traffic is encrypted in transit (HTTPS), and the database is
          encrypted at rest by our provider. Passwords are never stored in plain
          text, only as a salted cryptographic hash. Your financial records are
          only accessible from your own account. Sign-in attempts are
          rate-limited.
        </Paragraph>
        <Paragraph>
          If a personal data breach occurs, we will notify the competent
          supervisory authority within 72 hours of becoming aware of it (Art.
          33). If the breach is likely to result in a high risk to you, we will
          also notify you without undue delay (Art. 34).
        </Paragraph>
      </Section>
      <Section title="Children">
        <Paragraph>
          This app is not intended for children under 16, and you must be at
          least 16 years old to create an account. We do not knowingly collect
          children’s data. If you believe a child has created an account,
          contact us and we will delete it.
        </Paragraph>
      </Section>
      <Section title="Changes to this policy">
        <Paragraph>
          We may update this policy from time to time. If we make material
          changes, we will update the “Last updated” date above and tell you
          with a notice in the app before the changes take effect.
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
  return <ul className="mb-3 list-disc pl-6">{children}</ul>;
}

function Item({ children }: { children: React.ReactNode }) {
  return <li className="text-foreground mb-1.5">{children}</li>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <Table className="[&_td]:text-foreground mb-3 [&_td]:align-top [&_td]:whitespace-normal">
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header} className="font-bold">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row[0]}>
            {row.map((cell, i) => (
              <TableCell key={i}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="text-primary-light font-semibold"
    >
      {children}
    </a>
  );
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
