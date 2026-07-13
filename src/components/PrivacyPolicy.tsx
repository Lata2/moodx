import Link from 'next/link';


const GOLD_BRIGHT = '#ffd34d';
const GOLD_GLOW = 'rgba(233, 156, 14, 0.55)';

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
    <div
      className="mt-5 rounded-2xl border p-4 sm:p-6"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
      }}
    >
      <h2
        className="font-display text-lg text-white sm:text-xl"
        style={{ textShadow: `0 0 14px ${GOLD_GLOW}` }}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/70">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen pb-24" style={{ backgroundColor: '#0a0410' }}>
      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-10 sm:pt-10">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          <ArrowIcon className="h-4 w-4" />
          Back
        </Link>

        <h1
          className="font-display text-2xl text-white sm:text-3xl"
          style={{ textShadow: `0 0 22px ${GOLD_GLOW}` }}
        >
          Privacy <span style={{ color: GOLD_BRIGHT }}>Policy</span>
        </h1>
        <p
          className="mt-2 font-mono text-[11px] uppercase tracking-wider"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <p className="mt-5 text-sm leading-relaxed text-white/70">
          moodX (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) respects your
          privacy. This Privacy Policy explains what information we collect when
          you use our streaming service, how we use it, and the choices you have.
          By using moodX, you agree to the practices described below.
        </p>

        <Section title="1. Information We Collect">
          <p>
            We collect information you give us directly, such as your name, email
            address, and account preferences when you sign up. We also collect
            information automatically as you use the app, including device type,
            IP address, browser, viewing history, watchlist activity, and general
            usage patterns.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>
            We use the information we collect to operate and improve moodX,
            personalise recommendations based on your mood and viewing habits,
            maintain your watchlist, communicate service updates, and keep the
            platform secure.
          </p>
        </Section>

        <Section title="3. Cookies & Similar Technologies">
          <p>
            We use cookies and similar technologies to remember your preferences,
            keep you signed in, and understand how the app is used so we can make
            it better. You can control cookies through your browser settings,
            though some features may not work correctly if cookies are disabled.
          </p>
        </Section>

        <Section title="4. Sharing of Information">
          <p>
            We do not sell your personal information. We may share limited data
            with service providers who help us run moodX (such as hosting and
            analytics providers), and only to the extent needed for them to
            perform those services. We may also disclose information if required
            by law.
          </p>
        </Section>

        <Section title="5. Data Security">
          <p>
            We take reasonable technical and organisational measures to protect
            your information from unauthorised access, loss, or misuse. No method
            of transmission or storage is completely secure, so we cannot
            guarantee absolute security.
          </p>
        </Section>

        <Section title="6. Your Choices">
          <p>
            You can access, update, or delete your account information at any
            time from your profile settings. You may also contact us to request a
            copy of the data we hold about you, or to ask us to delete it, subject
            to applicable law.
          </p>
        </Section>

     
        <Section title="7. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated &ldquo;Last updated&rdquo; date. We
            encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="8. Contact Us">
          <p>
            If you have any questions about this Privacy Policy or how we handle
            your information, please reach out to us at{' '}
            <span style={{ color: GOLD_BRIGHT }}>support@dharvix.com</span>.
          </p>
        </Section>
      </div>
    </section>
  );
}