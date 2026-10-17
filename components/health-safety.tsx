import { ChevronDown } from "lucide-react";

const DETAILS = [
  "Prior screening is required, particularly if you are pregnant or have a history of cardiovascular conditions, epilepsy, severe asthma, bipolar disorder, psychosis, recent surgery, or fainting. Please disclose any relevant medical or mental health conditions before your session. Medical clearance may be required.",
  "Having one of these conditions doesn't necessarily mean someone can never participate in any form of breathwork. The precautions primarily concern more intensive, activating techniques, including conscious connected breathing. Screening helps determine whether modifications, medical clearance, or a different practice are appropriate.",
];

export function HealthSafety() {
  return (
    <section
      aria-labelledby="health-safety-heading"
      className="border-b border-ink px-4 py-14 md:px-11"
    >
      <div className="flex max-w-[720px] flex-col gap-3">
        <h2
          id="health-safety-heading"
          className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted"
        >
          Health &amp; Safety
        </h2>
        <p className="m-0 text-pretty font-grotesk text-[15px] leading-relaxed text-[#5a5247]">
          Therapeutic breathwork involves active breathing techniques that may
          not be appropriate for everyone. Prior screening is required.
        </p>

        <details className="group mt-2 border-t border-ink/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-grotesk text-sm text-[#5a5247] transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
            <span>Read full health &amp; safety information</span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="flex flex-col gap-4 pb-2">
            {DETAILS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="m-0 text-pretty font-grotesk text-[15px] leading-relaxed text-[#5a5247]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
