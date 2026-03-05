interface SectionProps {
  /** Section anchor id for navigation */
  id: string;
  /** Color token name — maps to var(--color-section-{colorToken}) */
  colorToken: string;
  children: React.ReactNode;
  className?: string;
  /** Enable full viewport height. Defaults to true. */
  fullHeight?: boolean;
  /** Enable 12-column grid on inner container for asymmetric layouts */
  grid?: boolean;
}

/**
 * Full-viewport color-block section wrapper.
 * Renders edge-to-edge background color with constrained inner content.
 */
export function Section({
  id,
  colorToken,
  children,
  className = "",
  fullHeight = true,
  grid = false,
}: SectionProps) {
  const heightClasses = fullHeight ? "min-h-[70svh] lg:min-h-svh" : "";

  const innerClasses = [
    "max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24",
    grid ? "grid grid-cols-12 gap-6 lg:gap-12" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={`w-full ${heightClasses} ${className}`}
      style={{
        backgroundColor: `var(--color-section-${colorToken})`,
        color: `var(--color-section-${colorToken}-text)`,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <div className={innerClasses}>{children}</div>
    </section>
  );
}
