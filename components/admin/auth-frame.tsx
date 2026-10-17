import Link from "next/link";

export function AuthFrame({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-[440px] flex-col gap-10 border border-ink bg-cream p-8 md:p-11">
        <div className="flex flex-col gap-4">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">{eyebrow}</div>
          <h1 className="m-0 font-grotesk text-[34px] font-semibold leading-[1.05] tracking-[-0.02em]">{title}</h1>
          <p className="m-0 font-grotesk text-base leading-[1.6] text-[#5a5247]">{intro}</p>
        </div>
        {children}
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5247] hover:text-pink-muted">
          ← Back to the site
        </Link>
      </div>
    </main>
  );
}
