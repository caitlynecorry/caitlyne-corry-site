export function EventsComingSoon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex max-w-[460px] flex-col gap-5 border-t border-ink/15 pt-6 font-grotesk text-ink ${className}`}
    >
      <p className="m-0 text-pretty text-lg leading-relaxed">
        Thank you for breathing with me this year. New gatherings are on their
        way. See you then!
      </p>
      <p className="m-0 font-mono text-xs uppercase tracking-[0.14em] text-pink-muted">
        With love, Caitlyne
      </p>
    </div>
  );
}
