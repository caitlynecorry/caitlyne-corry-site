export const EVENT_DATES = [
  {
    day: "Saturday",
    date: "October 24",
    dateTime: "2026-10-24T19:00",
    registerUrl:
      "https://app.acuityscheduling.com/schedule.php?owner=39688174&appointmentType=98726792",
  },
  {
    day: "Saturday",
    date: "November 21",
    dateTime: "2026-11-21T19:00",
    registerUrl:
      "https://app.acuityscheduling.com/schedule.php?owner=39688174&appointmentType=98726853",
  },
];

export function EventDates({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`max-w-[460px] border-t border-ink/15 font-grotesk text-ink ${className}`}
    >
      {EVENT_DATES.map((e) => (
        <li
          key={e.dateTime}
          className="flex items-center justify-between gap-4 border-b border-ink/15 py-3"
        >
          <time dateTime={e.dateTime} className="text-lg font-semibold">
            {e.date}
            <span className="sr-only">, {e.day}</span>
          </time>
          <div className="flex items-center gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-pink-muted">
              7–9 PM
            </span>
            <a
              href={e.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center"
            >
              <span className="border-b-2 border-pink-deep pb-[3px] text-sm font-semibold transition-colors hover:text-pink-deep">
                Register →
              </span>
              <span className="sr-only">
                {" "}for {e.date} (opens in a new tab)
              </span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
