import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id='kbizhub-logo'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('size-6', className)}
      {...props}
    >
      <title>kbizhub</title>
      <path d='M4 4v16' />
      <path d='M9 4h5a3 3 0 0 1 0 6H9' />
      <path d='M9 10h6a3 3 0 0 1 0 6H9' />
      <path d='M9 4v12' />
    </svg>
  )
}
