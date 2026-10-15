import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useAnalytics } from '@/features/shared/queries'

const fallbackStats = [
  { label: '알림톡 발송', value: '1,284', delta: '+12.4%' },
  { label: 'SMS 대체', value: '96', delta: '-8.1%' },
  { label: '발송 성공률', value: '98.2%', delta: '+0.3%p' },
  { label: '수신거부', value: '3', delta: '+1' },
]

const fallbackDaily = [
  { date: '10-08', alimtalk: 150, sms: 10 },
  { date: '10-09', alimtalk: 172, sms: 12 },
  { date: '10-10', alimtalk: 189, sms: 14 },
  { date: '10-11', alimtalk: 160, sms: 11 },
  { date: '10-12', alimtalk: 210, sms: 18 },
  { date: '10-13', alimtalk: 195, sms: 16 },
  { date: '10-14', alimtalk: 208, sms: 15 },
]

export function Analytics() {
  // API 가 준비되면 VITE_API_BASE_URL 설정 시 서버 데이터를 사용한다.
  const analyticsQuery = useAnalytics(Boolean(import.meta.env.VITE_API_BASE_URL))
  const stats = analyticsQuery.data?.stats ?? fallbackStats
  const dailyUsage = analyticsQuery.data?.dailyUsage ?? fallbackDaily
  const max = Math.max(...dailyUsage.map((d) => d.alimtalk + d.sms))

  return (
    <>
      <Header>
        <Search />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>
      <Main>
        <div className='mb-4 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Analytics</h1>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {stat.label}
                </CardTitle>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <CardDescription>{stat.delta} 전 주 대비</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>일별 발송량</CardTitle>
            <CardDescription>최근 7일간 알림톡 / SMS 발송 추이</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex h-56 items-end gap-3'>
              {dailyUsage.map((day) => (
                <div key={day.date} className='flex flex-1 flex-col items-center gap-1'>
                  <div className='flex w-full flex-col justify-end gap-0.5'>
                    <div
                      className='w-full rounded-t bg-primary/80'
                      style={{ height: `${(day.alimtalk / max) * 160}px` }}
                    />
                    <div
                      className='w-full rounded-b bg-amber-400/80'
                      style={{ height: `${(day.sms / max) * 160}px` }}
                    />
                  </div>
                  <span className='text-xs text-muted-foreground'>{day.date}</span>
                  <span className='text-[10px] font-medium'>{day.alimtalk + day.sms}</span>
                </div>
              ))}
            </div>
            <div className='mt-4 flex items-center gap-4 text-xs text-muted-foreground'>
              <span className='flex items-center gap-1'>
                <span className='h-2 w-2 rounded-sm bg-primary/80' /> 알림톡
              </span>
              <span className='flex items-center gap-1'>
                <span className='h-2 w-2 rounded-sm bg-amber-400/80' /> SMS 대체
              </span>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
