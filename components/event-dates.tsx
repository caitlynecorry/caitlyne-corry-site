export const EVENT_DATES = [
  { day: "Saturday", date: "October 24", dateTime: "2026-10-24T19:00" },
  { day: "Saturday", date: "November 21", dateTime: "2026-11-21T19:00" },
];

export function EventDates({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`max-w-[460px] border-t border-ink/15 font-grotesk text-ink ${className}`}
    >
      {EVENT_DATES.map((e) => (
        <li
          key={e.dateTime}
          className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3"
        >
          <time dateTime={e.dateTime} className="text-lg font-semibold">
            {e.date}
            <span className="sr-only">, {e.day}</span>
          </time>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-pink-muted">
            7–9 PM
          </span>
        </li>
      ))}
    </ul>
  );
}
