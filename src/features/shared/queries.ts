/**
 * KBizHub Dashboard API 쿼리 훅 — KBizHub Gateway 엔드포인트.
 * 백엔드 미배포 시 enabled 플래그로 비활성화되어 페이지는 fallback 목업을 렌더한다.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api-client'

export interface Plan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  current: boolean
}

export interface Invoice {
  id: string
  date: string
  amount: string
  status: string
}

export interface BillingResponse {
  plans: Plan[]
  invoices: Invoice[]
}

export interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
  scopes: string[]
}

export interface UsageStats {
  label: string
  value: string
  delta: string
}

export interface DailyUsage {
  date: string
  alimtalk: number
  sms: number
}

export interface AnalyticsResponse {
  stats: UsageStats[]
  dailyUsage: DailyUsage[]
}

// ── Billing ───────────────────────────────────────────────────────────────
export function useBilling(enabled: boolean) {
  return useQuery({
    queryKey: ['billing'],
    queryFn: () => api.get<BillingResponse>('/api/billing'),
    enabled,
    staleTime: 5 * 60 * 1000,
  })
}

export function useChangePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (planName: string) => api.post('/api/billing/change-plan', { plan: planName }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['billing'] }),
  })
}

// ── API Keys ──────────────────────────────────────────────────────────────
export function useApiKeys(enabled: boolean) {
  return useQuery({
    queryKey: ['api-keys'],
    queryFn: () => api.get<{ keys: ApiKey[] }>('/api/keys'),
    enabled,
    staleTime: 60 * 1000,
  })
}

export function useCreateApiKey() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name: string) => api.post<{ key: ApiKey }>('/api/keys', { name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['api-keys'] }),
  })
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/api/keys/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['api-keys'] }),
  })
}

// ── Analytics ─────────────────────────────────────────────────────────────
export function useAnalytics(enabled: boolean) {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get<AnalyticsResponse>('/api/analytics/usage'),
    enabled,
    staleTime: 2 * 60 * 1000,
  })
}
