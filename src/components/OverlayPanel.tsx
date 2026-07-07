import type { ReactNode } from 'react'

interface OverlayPanelProps {
  open: boolean
  onClose: () => void
  number: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function OverlayPanel({
  open,
  onClose,
  number,
  title,
  subtitle,
  children,
}: OverlayPanelProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-stretch justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close panel"
      />
      <aside
        className="relative z-10 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-panel-cream)] shadow-2xl animate-[slideIn_0.35s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
      >
        <header className="sticky top-0 border-b border-[var(--color-border)] bg-[var(--color-panel-cream)] px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-xs tracking-[0.25em] text-[var(--color-tag-muted)]">
                {number}
              </p>
              <h2
                id="panel-title"
                className="font-serif text-3xl font-light text-[var(--color-text-primary)]"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 font-sans text-sm text-[var(--color-accent-cool)]">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-sans text-xs tracking-widest text-[var(--color-tag-muted)] transition hover:text-[var(--color-text-primary)]"
            >
              ESC
            </button>
          </div>
        </header>
        <div className="flex-1 px-8 py-6">{children}</div>
      </aside>
    </div>
  )
}

function Divider() {
  return <hr className="my-6 border-[var(--color-border)]" />
}

export function SectionBlock({
  label,
  children,
}: {
  label?: string
  children: ReactNode
}) {
  return (
    <section className="mb-4">
      {label && (
        <h3 className="mb-2 font-sans text-[10px] tracking-[0.3em] text-[var(--color-tag-muted)] uppercase">
          {label}
        </h3>
      )}
      {children}
    </section>
  )
}

export { Divider }
