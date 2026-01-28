import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const baseStyles = 'font-zuumebold rounded-lg transition-all active:scale-95 min-h-12'

  const variants = {
    primary: 'bg-secondary hover:bg-primary text-white border-2 border-dark',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-accent',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg w-full sm:w-auto',
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
