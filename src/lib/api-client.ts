/**
 * KBizHub Dashboard API 클라이언트.
 *
 * 근거: 서버는 이 저장소 외부 (KBizHub Gateway). VITE_API_BASE_URL 로 주입한다.
 * - 인증: httpOnly 쿠키 세션 (Phase 2 에서 Clerk 제거 후 로컬 세션으로 대체 중).
 *   쿠키 기반이므로 별도 토큰 헤더를 붙이지 않고 credentials: 'include' 만 사용.
 * - 에러: 2xx 이외는 ApiException 으로 래핑해 status 를 보존한다.
 *   재시도 정책은 main.tsx 의 QueryClient retry 콜백이 ApiException.status 를
 *   보고 4xx 는 재시도하지 않는다 (여기서가 아니라 QueryClient 가 담당).
 * - CORS: 크로스 오리진 + credentials 조합은 Gateway 가 와일드카드 아닌 정확한
 *   Origin 에 Access-Control-Allow-Credentials: true 를 응답해야 한다.
 */

export class ApiException extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiException'
    this.status = status
  }
}

// 기본 타임아웃 15초 — Gateway 무응답 시 무한 대기를 막는다.
const DEFAULT_TIMEOUT_MS = 15_000

const baseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
    /\/+$/,
    ''
  ) ?? ''

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const timeoutMs =
    typeof init?.signal === 'undefined' ? DEFAULT_TIMEOUT_MS : undefined

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    credentials: 'include',
    // GET 등 바디 없는 요청에는 content-type 을 강제하지 않는다 (불필요한 preflight 방지).
    headers:
      init?.method && init.method !== 'GET'
        ? { 'content-type': 'application/json', ...(init?.headers ?? {}) }
        : init?.headers,
    ...(timeoutMs ? { signal: AbortSignal.timeout(timeoutMs) } : {}),
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
    request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
