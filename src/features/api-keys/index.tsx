import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import {
  useApiKeys,
  useCreateApiKey,
  useRevokeApiKey,
  type ApiKey,
} from '@/features/shared/queries'

const fallbackKeys: ApiKey[] = [
  {
    id: 'key-1',
    name: 'production',
    key: 'kzb_live_••••••••7f3a',
    createdAt: '2026-09-12',
    lastUsed: '2026-10-14',
    scopes: ['messages:send', 'templates:read'],
  },
  {
    id: 'key-2',
    name: 'staging',
    key: 'kzb_test_••••••••c21e',
    createdAt: '2026-10-02',
    lastUsed: null,
    scopes: ['messages:send'],
  },
]

export function ApiKeys() {
  // API 가 준비되면 VITE_API_BASE_URL 설정 시 서버 데이터를 사용한다.
  const apiEnabled = Boolean(import.meta.env.VITE_API_BASE_URL)
  const keysQuery = useApiKeys(apiEnabled)
  const createKey = useCreateApiKey()
  const revokeKey = useRevokeApiKey()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  // apiEnabled=false 로컬 데모 모드에서만 사용하는 오버라이드 상태.
  const [localKeys, setLocalKeys] = useState<ApiKey[] | null>(null)

  const serverKeys = keysQuery.data?.keys ?? fallbackKeys
  const keys = localKeys ?? serverKeys

  const handleCreate = () => {
    if (apiEnabled) {
      createKey.mutate(`key-${serverKeys.length + 1}`)
    } else {
      setLocalKeys((prev) => [
        ...(prev ?? serverKeys),
        {
          id: `key-${Date.now()}`,
          name: `key-${(prev ?? serverKeys).length + 1}`,
          key: `kzb_live_••••${Math.random().toString(16).slice(2, 6)}`,
          createdAt: new Date().toISOString().slice(0, 10),
          lastUsed: null,
          scopes: ['messages:send'],
        },
      ])
    }
  }

  const handleRevoke = (id: string) => {
    if (apiEnabled) {
      revokeKey.mutate(id)
    } else {
      setLocalKeys((prev) => (prev ?? serverKeys).filter((k) => k.id !== id))
    }
  }

  const handleCopy = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <>
      <Header>
        <Search />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>
      <Main>
        <div className='mb-4 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>API Keys</h1>
          <Button onClick={handleCreate}>+ 새 키 발급</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>발급된 키</CardTitle>
            <CardDescription>
              API 키는 발급 시 한 번만 전체 값이 노출됩니다. 유출 시 즉시
              폐기하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {keys.map((apiKey) => (
              <div
                key={apiKey.id}
                className='flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between'
              >
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>{apiKey.name}</span>
                    <Badge variant='outline'>live</Badge>
                  </div>
                  <code className='text-xs text-muted-foreground'>
                    {apiKey.key}
                  </code>
                  <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                    <span>생성: {apiKey.createdAt}</span>
                    <span>·</span>
                    <span>마지막 사용: {apiKey.lastUsed ?? '없음'}</span>
                  </div>
                  <div className='flex flex-wrap gap-1 pt-1'>
                    {apiKey.scopes.map((scope) => (
                      <Badge
                        key={scope}
                        variant='secondary'
                        className='text-[10px]'
                      >
                        {scope}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleCopy(apiKey.id)}
                  >
                    {copiedId === apiKey.id ? '복사됨' : '복사'}
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleRevoke(apiKey.id)}
                  >
                    폐기
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
