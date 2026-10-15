/**
 * KBizHub Dashboard API 클라이언트.
 *
 * 서버는 이 저장소 외부 (KBizHub Gateway). VITE_API_BASE_URL 로 주입한다.
 * 인증은 httpOnly 쿠키 세션 기반이므로 credentials: 'include' 만 사용한다.
 * 2xx 이외는 ApiException 으로 래핑해 4xx 재시도를 막는다.
 */
export class ApiException extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiException'
    this.status = status
  }
}

const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new ApiException(body || `API 오류 (HTTP ${res.status})`, res.status)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
