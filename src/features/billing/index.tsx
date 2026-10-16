import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useBilling } from '@/features/shared/queries'

const fallbackPlans = [
  {
    name: 'Starter',
    price: '₩29,000',
    period: '일회성',
    description: '웹사이트 + AI Agent 1개 구성. 노드 소유 방식.',
    features: [
      '반응형 웹사이트',
      'AI Agent 1개',
      'MCP 엔드포인트 세팅 가이드',
      '커뮤니티 지원',
    ],
    current: true,
  },
  {
    name: 'Business',
    price: '₩14,900',
    period: '월',
    description: '운영 화면 + 예약 안내 자동화. 소규모 사업자용.',
    features: [
      'Reservation Agent',
      '메시지 센터(알림톡/SMS)',
      '템플릿 스튜디오',
      '이메일 지원',
    ],
    current: false,
  },
  {
    name: 'Enterprise',
    price: '별도 협의',
    period: '계약별',
    description: '멀티 테넌트 + 감사 로그 + 전문가 에스크로.',
    features: [
      '모든 Agent SKU',
      '자격증명 금고(Vault)',
      '감사 로그(Audit)',
      '전담 지원',
    ],
    current: false,
  },
]

const fallbackInvoices = [
  {
    id: 'INV-2026-003',
    date: '2026-10-01',
    amount: '₩29,000',
    status: '결제완료',
  },
  {
    id: 'INV-2026-002',
    date: '2026-09-01',
    amount: '₩14,900',
    status: '결제완료',
  },
  {
    id: 'INV-2026-001',
    date: '2026-08-01',
    amount: '₩14,900',
    status: '결제완료',
  },
]

export function Billing() {
  // API 가 준비되면 VITE_API_BASE_URL 설정 시 서버 데이터를 사용한다.
  const billingQuery = useBilling(Boolean(import.meta.env.VITE_API_BASE_URL))
  const plans = billingQuery.data?.plans ?? fallbackPlans
  const invoices = billingQuery.data?.invoices ?? fallbackInvoices

  return (
    <>
      <Header>
        <Search />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>
      <Main>
        <div className='mb-4 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Billing</h1>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.current ? 'border-primary' : ''}
            >
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg'>{plan.name}</CardTitle>
                  {plan.current && <Badge>현재 플랜</Badge>}
                </div>
                <div className='mt-2'>
                  <span className='text-2xl font-bold'>{plan.price}</span>
                  <span className='text-sm text-muted-foreground'>
                    {' '}
                    / {plan.period}
                  </span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className='flex items-center gap-2 text-sm'
                  >
                    <span className='text-primary'>✓</span>
                    {feature}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.current ? 'outline' : 'default'}
                  className='w-full'
                  disabled={plan.current}
                >
                  {plan.current ? '사용 중' : '변경하기'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>결제 내역</CardTitle>
            <CardDescription>최근 인보이스 목록입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='rounded-md border'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b bg-muted/50 text-left'>
                    <th className='p-3 font-medium'>인보이스</th>
                    <th className='p-3 font-medium'>날짜</th>
                    <th className='p-3 font-medium'>금액</th>
                    <th className='p-3 font-medium'>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className='border-b last:border-b-0'>
                      <td className='p-3 font-mono'>{invoice.id}</td>
                      <td className='p-3'>{invoice.date}</td>
                      <td className='p-3'>{invoice.amount}</td>
                      <td className='p-3'>
                        <Badge variant='outline'>{invoice.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
