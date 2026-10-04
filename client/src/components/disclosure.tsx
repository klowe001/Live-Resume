import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface DisclosureProps {
  label: string;
  children: ReactNode;
}

/**
 * Show-more toggle. Opens by transitioning grid-template-rows instead of
 * height, and marks the closed panel inert so keyboard focus skips it.
 */
export function Disclosure({ label, children }: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="-my-1 inline-flex items-center gap-1.5 py-1 text-[0.9375rem] font-semibold text-accent transition-colors hover:text-ink"
      >
        {open ? 'Show less' : label}
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out-quart"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden" inert={!open}>
          {children}
        </div>
      </div>
    </div>
  );
}
