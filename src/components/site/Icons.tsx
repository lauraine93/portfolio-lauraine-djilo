import React from 'react'

type IconProps = { size?: number; className?: string }

const stroke = (size: number, className: string | undefined, children: React.ReactNode, width = 1.8) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
)

export const ArrowRight = ({ size = 20, className }: IconProps) => stroke(size, className, <path d="M5 12h14M13 6l6 6-6 6" />, 2.4)
export const ArrowDown = ({ size = 20, className }: IconProps) => stroke(size, className, <path d="M12 4v12M6 10l6 6 6-6M5 20h14" />, 2.4)

export function Cursor({ size = 22, className }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M3 2l7 19 2.5-8L21 10z" fill="currentColor" />
    </svg>
  )
}

const serviceIcons: Record<string, React.ReactNode> = {
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  pen: <path d="M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3" />,
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5M16 4.5a3.5 3.5 0 010 7M18 15c2 .6 3.2 2.3 3.5 5" />
    </>
  ),
  components: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="3.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  cursor: <path d="M4 3l6 17 2.5-7.5L20 10z" />,
}

export function ServiceIcon({ name, size = 26 }: { name?: string | null; size?: number }) {
  return stroke(size, undefined, serviceIcons[name ?? 'layout'] ?? serviceIcons.layout)
}
