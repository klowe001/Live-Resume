import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  intro?: ReactNode;
  /** Use "ink" inside the dark bands. */
  tone?: 'paper' | 'ink';
}

export function SectionHeading({ children, intro, tone = 'paper' }: SectionHeadingProps) {
  const rule = tone === 'ink' ? 'border-paper/20' : 'border-line';
  const introColor = tone === 'ink' ? 'text-paper/80' : 'text-ink-soft';

  return (
    <div className={`grid items-end gap-5 border-t pt-6 md:grid-cols-12 md:gap-8 md:pt-8 ${rule}`}>
      <h2 className="type-section md:col-span-7">{children}</h2>
      {intro && (
        <p className={`text-lg leading-relaxed md:col-span-5 md:pb-2 max-w-[34rem] ${introColor}`}>{intro}</p>
      )}
    </div>
  );
}
