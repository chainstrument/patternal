type Variant = 'info' | 'warning' | 'tip' | 'danger'

interface CalloutProps {
  variant?: Variant
  title?: string
  children: React.ReactNode
}

const styles: Record<Variant, { wrapper: string; icon: string }> = {
  info:    { wrapper: 'border-blue-200 bg-blue-50 text-blue-900',   icon: 'ℹ️' },
  tip:     { wrapper: 'border-green-200 bg-green-50 text-green-900', icon: '💡' },
  warning: { wrapper: 'border-yellow-200 bg-yellow-50 text-yellow-900', icon: '⚠️' },
  danger:  { wrapper: 'border-red-200 bg-red-50 text-red-900',      icon: '🚨' },
}

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  const { wrapper, icon } = styles[variant]
  return (
    <div className={`my-6 rounded-lg border p-4 ${wrapper}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none">{icon}</span>
        <div className="flex-1">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-sm [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
