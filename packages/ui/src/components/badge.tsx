import * as React from 'react'

type Variant = 'default' | 'secondary' | 'success' | 'destructive'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-muted text-muted-foreground',
  success: 'bg-green-100 text-green-800',
  destructive: 'bg-red-100 text-red-800',
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
