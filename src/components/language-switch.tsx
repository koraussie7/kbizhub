import { Globe } from 'lucide-react'
import { LANGUAGES } from '@/lib/i18n'
import { useI18n } from '@/context/i18n-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSwitch() {
  const { language, setLanguage } = useI18n()
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='size-9 text-muted-foreground hover:text-foreground'
          title='Select Language'
        >
          <span className='sr-only'>Change language</span>
          <div className='flex items-center gap-1 font-mono text-xs font-semibold'>
            <Globe className='size-4' />
            <span className='hidden uppercase sm:inline'>{current.code}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        {LANGUAGES.map((item) => (
          <DropdownMenuItem
            key={item.code}
            onClick={() => setLanguage(item.code)}
            className='flex cursor-pointer items-center justify-between'
          >
            <span className='flex items-center gap-2'>
              <span>{item.flag}</span>
              <span className='text-sm'>{item.nativeName}</span>
            </span>
            {language === item.code && (
              <span className='size-1.5 rounded-full bg-primary' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
