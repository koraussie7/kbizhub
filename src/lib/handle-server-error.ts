import { toast } from 'sonner'

import { ApiException } from '@/lib/api-client'

export function handleServerError(error: unknown) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  let errMsg = 'Something went wrong!'
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'No content.'
  }
  if (error instanceof ApiException) {
    // api-client 가 응답 본문을 message 로 전달한다 (빈 본문이면 HTTP 상태 문구).
    if (error.message.trim().length > 0) {
      errMsg = error.message
    }
  }
  toast.error(errMsg)
}
